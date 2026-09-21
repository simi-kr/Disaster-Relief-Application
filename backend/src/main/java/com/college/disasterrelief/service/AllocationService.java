package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.allocation.AllocationResult;
import com.college.disasterrelief.exception.ResourceNotFoundException;
import com.college.disasterrelief.model.ReliefRequest;
import com.college.disasterrelief.model.enums.RequestStatus;
import com.college.disasterrelief.repository.ReliefRequestRepository;
import com.college.disasterrelief.service.allocation.ResourceAllocator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AllocationService {

    private final ReliefRequestRepository reliefRequestRepository;
    private final ResourceAllocator resourceAllocator;

    public AllocationResult allocateForRequest(Long requestId) {
        ReliefRequest request = reliefRequestRepository.findById(requestId)
                .orElseThrow(() -> ResourceNotFoundException.of("ReliefRequest", requestId));
        return resourceAllocator.allocate(request);
    }

    /** Processes every VERIFIED request, Critical/High first (priority score, highest wins). */
    public List<AllocationResult> runForAllPending() {
        List<ReliefRequest> pending = reliefRequestRepository.findByStatus(RequestStatus.VERIFIED).stream()
                .sorted(Comparator.comparingInt((ReliefRequest r) -> r.getPriority().getScore()).reversed())
                .toList();

        return pending.stream().map(resourceAllocator::allocate).toList();
    }
}
