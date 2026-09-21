package com.college.disasterrelief.service.allocation;

import com.college.disasterrelief.dto.allocation.AllocationResult;
import com.college.disasterrelief.model.ReliefRequest;
import com.college.disasterrelief.model.Resource;
import com.college.disasterrelief.model.ResourceTransaction;
import com.college.disasterrelief.model.enums.NotificationType;
import com.college.disasterrelief.model.enums.RequestType;
import com.college.disasterrelief.model.enums.TransactionType;
import com.college.disasterrelief.repository.ResourceRepository;
import com.college.disasterrelief.repository.ResourceTransactionRepository;
import com.college.disasterrelief.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * Simple rule-based implementation of {@link ResourceAllocator} (no ML):
 * matches a request's category to available resources with enough quantity,
 * preferring a resource located near the citizen, then allocates one unit
 * of stock and logs a transaction.
 */
@Component
@RequiredArgsConstructor
public class RuleBasedResourceAllocator implements ResourceAllocator {

    private static final int DEFAULT_ALLOCATION_QUANTITY = 1;

    /** Collections demo: request type -> acceptable resource categories. */
    private static final Map<RequestType, List<String>> CATEGORY_MAP = Map.of(
            RequestType.FOOD, List.of("food"),
            RequestType.WATER, List.of("water"),
            RequestType.MEDICINE, List.of("medicine"),
            RequestType.MEDICAL_HELP, List.of("medicine"),
            RequestType.SHELTER, List.of("blankets", "clothing"),
            RequestType.RESCUE, List.of("emergency kits")
    );

    private final ResourceRepository resourceRepository;
    private final ResourceTransactionRepository resourceTransactionRepository;
    private final NotificationService notificationService;

    @Override
    public AllocationResult allocate(ReliefRequest request) {
        List<String> categories = CATEGORY_MAP.getOrDefault(request.getRequestType(), List.of());
        if (categories.isEmpty()) {
            return AllocationResult.failure("No resource category mapped for request type " + request.getRequestType());
        }

        List<Resource> candidates = categories.stream()
                .flatMap(category -> resourceRepository.findByCategoryIgnoreCase(category).stream())
                .filter(r -> r.getQuantity() >= DEFAULT_ALLOCATION_QUANTITY)
                .sorted(preferNearestLocation(request))
                .toList();

        if (candidates.isEmpty()) {
            return AllocationResult.failure(
                    "No available resource with sufficient stock for " + request.getRequestType() + " request");
        }

        Resource chosen = candidates.get(0);
        chosen.setQuantity(chosen.getQuantity() - DEFAULT_ALLOCATION_QUANTITY);
        resourceRepository.save(chosen);

        ResourceTransaction transaction = new ResourceTransaction();
        transaction.setResource(chosen);
        transaction.setQuantity(DEFAULT_ALLOCATION_QUANTITY);
        transaction.setType(TransactionType.ALLOCATION);
        transaction.setRequest(request);
        resourceTransactionRepository.save(transaction);

        notificationService.notify(request.getCitizen(),
                chosen.getName() + " has been allocated to your " + request.getRequestType() + " request",
                NotificationType.REQUEST_STATUS_CHANGE);

        return AllocationResult.success(
                "Allocated " + DEFAULT_ALLOCATION_QUANTITY + " unit(s) of " + chosen.getName(),
                chosen.getId(), chosen.getName(), DEFAULT_ALLOCATION_QUANTITY);
    }

    /** Resources whose location string matches the citizen's location sort first. */
    private Comparator<Resource> preferNearestLocation(ReliefRequest request) {
        String citizenLocation = request.getCitizen().getLocation();
        return Comparator.comparing((Resource r) -> {
            if (citizenLocation == null || r.getLocation() == null) {
                return 1;
            }
            return r.getLocation().equalsIgnoreCase(citizenLocation) ? 0 : 1;
        }).thenComparing(Resource::getQuantity, Comparator.reverseOrder());
    }
}
