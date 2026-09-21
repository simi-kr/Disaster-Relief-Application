package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.team.RescueTeamRequest;
import com.college.disasterrelief.dto.team.RescueTeamResponse;
import com.college.disasterrelief.exception.ResourceNotFoundException;
import com.college.disasterrelief.model.RescueTeam;
import com.college.disasterrelief.model.enums.Availability;
import com.college.disasterrelief.repository.RescueTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RescueTeamService {

    private final RescueTeamRepository rescueTeamRepository;

    public RescueTeamResponse create(RescueTeamRequest request) {
        RescueTeam team = new RescueTeam();
        applyRequest(team, request);
        return RescueTeamResponse.from(rescueTeamRepository.save(team));
    }

    public RescueTeamResponse update(Long id, RescueTeamRequest request) {
        RescueTeam team = findTeam(id);
        applyRequest(team, request);
        return RescueTeamResponse.from(rescueTeamRepository.save(team));
    }

    public void delete(Long id) {
        if (!rescueTeamRepository.existsById(id)) {
            throw ResourceNotFoundException.of("RescueTeam", id);
        }
        rescueTeamRepository.deleteById(id);
    }

    public List<RescueTeamResponse> getAll() {
        return rescueTeamRepository.findAll().stream().map(RescueTeamResponse::from).toList();
    }

    private void applyRequest(RescueTeam team, RescueTeamRequest request) {
        team.setName(request.name());
        team.setContact(request.contact());
        team.setLocation(request.location());
        team.setAvailability(request.availability() != null ? request.availability() : Availability.AVAILABLE);
    }

    private RescueTeam findTeam(Long id) {
        return rescueTeamRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("RescueTeam", id));
    }
}
