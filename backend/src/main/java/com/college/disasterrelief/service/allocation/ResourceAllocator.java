package com.college.disasterrelief.service.allocation;

import com.college.disasterrelief.dto.allocation.AllocationResult;
import com.college.disasterrelief.model.ReliefRequest;

/**
 * Abstraction for the "Smart Resource Allocation" module: given a relief
 * request, decide which resource (if any) satisfies it and allocate it.
 * Concrete strategies plug in behind this interface without callers caring
 * how the matching is done.
 */
public interface ResourceAllocator {
    AllocationResult allocate(ReliefRequest request);
}
