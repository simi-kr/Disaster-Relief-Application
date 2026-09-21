package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.resource.ResourceRequest;
import com.college.disasterrelief.dto.resource.ResourceResponse;
import com.college.disasterrelief.dto.resource.ResourceTransactionResponse;
import com.college.disasterrelief.dto.resource.RestockRequest;
import com.college.disasterrelief.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping
    public List<ResourceResponse> getAll() {
        return resourceService.getAll();
    }

    @GetMapping("/low-stock")
    public List<ResourceResponse> getLowStock() {
        return resourceService.getLowStock();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResourceResponse> create(@Valid @RequestBody ResourceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResourceResponse update(@PathVariable Long id, @Valid @RequestBody ResourceRequest request) {
        return resourceService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        resourceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResourceTransactionResponse restock(@PathVariable Long id, @Valid @RequestBody RestockRequest request) {
        return resourceService.restock(id, request);
    }
}
