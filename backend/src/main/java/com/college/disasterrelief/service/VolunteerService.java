package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.volunteer.VolunteerRegisterRequest;
import com.college.disasterrelief.dto.volunteer.VolunteerResponse;
import com.college.disasterrelief.exception.DuplicateRequestException;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.model.VolunteerProfile;
import com.college.disasterrelief.repository.VolunteerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VolunteerService {

    private final VolunteerProfileRepository volunteerProfileRepository;

    public VolunteerResponse register(User user, VolunteerRegisterRequest request) {
        if (volunteerProfileRepository.existsByUserId(user.getId())) {
            throw new DuplicateRequestException("You are already registered as a volunteer");
        }

        VolunteerProfile profile = new VolunteerProfile();
        profile.setUser(user);
        profile.setSkills(request.skills());
        profile.setLocation(request.location());
        return VolunteerResponse.from(volunteerProfileRepository.save(profile));
    }

    public List<VolunteerResponse> getAll() {
        return volunteerProfileRepository.findAll().stream().map(VolunteerResponse::from).toList();
    }
}
