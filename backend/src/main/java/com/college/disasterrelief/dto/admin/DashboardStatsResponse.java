package com.college.disasterrelief.dto.admin;

public record DashboardStatsResponse(
        long activeDisasterCount,
        long pendingRequestCount,
        long resolvedRequestCount,
        long availableResourceCount,
        long lowStockResourceCount,
        int totalShelterCapacity,
        int totalShelterOccupied,
        long activeVolunteerCount
) {
}
