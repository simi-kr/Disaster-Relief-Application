package com.college.disasterrelief.dto.allocation;

public record AllocationResult(
        boolean success,
        String message,
        Long resourceId,
        String resourceName,
        Integer quantityAllocated
) {
    public static AllocationResult failure(String message) {
        return new AllocationResult(false, message, null, null, null);
    }

    public static AllocationResult success(String message, Long resourceId, String resourceName, Integer quantity) {
        return new AllocationResult(true, message, resourceId, resourceName, quantity);
    }
}
