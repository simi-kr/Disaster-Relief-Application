package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.center.ReliefCenterRequest;
import com.college.disasterrelief.dto.center.ReliefCenterResponse;
import com.college.disasterrelief.service.ReliefCenterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relief-centers")
@RequiredArgsConstructor
public class ReliefCenterController {

    private final ReliefCenterService reliefCenterService;

    @GetMapping
    public List<ReliefCenterResponse> getAll() {
        return reliefCenterService.getAll();
    }

    @GetMapping("/{id}")
    public ReliefCenterResponse getById(@PathVariable Long id) {
        return reliefCenterService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReliefCenterResponse> create(@Valid @RequestBody ReliefCenterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reliefCenterService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ReliefCenterResponse update(@PathVariable Long id, @Valid @RequestBody ReliefCenterRequest request) {
        return reliefCenterService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reliefCenterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
