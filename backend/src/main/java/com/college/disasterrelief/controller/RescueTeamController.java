package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.team.RescueTeamRequest;
import com.college.disasterrelief.dto.team.RescueTeamResponse;
import com.college.disasterrelief.service.RescueTeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rescue-teams")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class RescueTeamController {

    private final RescueTeamService rescueTeamService;

    @GetMapping
    public List<RescueTeamResponse> getAll() {
        return rescueTeamService.getAll();
    }

    @PostMapping
    public ResponseEntity<RescueTeamResponse> create(@Valid @RequestBody RescueTeamRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rescueTeamService.create(request));
    }

    @PutMapping("/{id}")
    public RescueTeamResponse update(@PathVariable Long id, @Valid @RequestBody RescueTeamRequest request) {
        return rescueTeamService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        rescueTeamService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
