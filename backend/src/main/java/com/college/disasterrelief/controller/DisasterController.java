package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.disaster.DisasterRequest;
import com.college.disasterrelief.dto.disaster.DisasterResponse;
import com.college.disasterrelief.service.DisasterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disasters")
@RequiredArgsConstructor
public class DisasterController {

    private final DisasterService disasterService;

    @GetMapping
    public List<DisasterResponse> getAll() {
        return disasterService.getAll();
    }

    @GetMapping("/active")
    public List<DisasterResponse> getActive() {
        return disasterService.getActive();
    }

    @GetMapping("/{id}")
    public DisasterResponse getById(@PathVariable Long id) {
        return disasterService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DisasterResponse> create(@Valid @RequestBody DisasterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(disasterService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public DisasterResponse update(@PathVariable Long id, @Valid @RequestBody DisasterRequest request) {
        return disasterService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        disasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
