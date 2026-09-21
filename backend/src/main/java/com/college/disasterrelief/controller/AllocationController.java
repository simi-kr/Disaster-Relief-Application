package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.allocation.AllocationResult;
import com.college.disasterrelief.service.AllocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocation")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AllocationController {

    private final AllocationService allocationService;

    @PostMapping("/requests/{id}")
    public AllocationResult allocateForRequest(@PathVariable Long id) {
        return allocationService.allocateForRequest(id);
    }

    @PostMapping("/run")
    public List<AllocationResult> runForAllPending() {
        return allocationService.runForAllPending();
    }
}
