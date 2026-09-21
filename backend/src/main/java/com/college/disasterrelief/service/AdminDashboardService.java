package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.admin.DashboardStatsResponse;
import com.college.disasterrelief.model.enums.Availability;
import com.college.disasterrelief.model.enums.DisasterStatus;
import com.college.disasterrelief.model.enums.RequestStatus;
import com.college.disasterrelief.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final DisasterRepository disasterRepository;
    private final ReliefRequestRepository reliefRequestRepository;
    private final ResourceRepository resourceRepository;
    private final ReliefCenterRepository reliefCenterRepository;
    private final VolunteerProfileRepository volunteerProfileRepository;

    public DashboardStatsResponse getStats() {
        long pending = reliefRequestRepository.countByStatus(RequestStatus.SUBMITTED)
                + reliefRequestRepository.countByStatus(RequestStatus.VERIFIED)
                + reliefRequestRepository.countByStatus(RequestStatus.ASSIGNED)
                + reliefRequestRepository.countByStatus(RequestStatus.IN_PROGRESS);

        long availableResources = resourceRepository.findAll().stream()
                .filter(r -> r.getQuantity() > 0)
                .count();

        int[] shelterTotals = reliefCenterRepository.findAll().stream()
                .reduce(new int[]{0, 0}, (acc, center) -> {
                    acc[0] += center.getCapacity();
                    acc[1] += center.getOccupied();
                    return acc;
                }, (a, b) -> new int[]{a[0] + b[0], a[1] + b[1]});

        return new DashboardStatsResponse(
                disasterRepository.findByStatus(DisasterStatus.ACTIVE).size(),
                pending,
                reliefRequestRepository.countByStatus(RequestStatus.RESOLVED),
                availableResources,
                resourceRepository.findLowStock().size(),
                shelterTotals[0],
                shelterTotals[1],
                volunteerProfileRepository.findByAvailability(Availability.AVAILABLE).size()
        );
    }
}
