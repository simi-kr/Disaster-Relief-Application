package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.user.DashboardSummaryResponse;
import com.college.disasterrelief.dto.user.UpdateProfileRequest;
import com.college.disasterrelief.dto.user.UserResponse;
import com.college.disasterrelief.exception.ResourceNotFoundException;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getById(Long id) {
        return UserResponse.from(findUser(id));
    }

    public List<UserResponse> getAll() {
        return userRepository.findAll().stream().map(UserResponse::from).toList();
    }

    public UserResponse updateProfile(User currentUser, UpdateProfileRequest request) {
        currentUser.setName(request.name());
        currentUser.setPhone(request.phone());
        currentUser.setLocation(request.location());
        return UserResponse.from(userRepository.save(currentUser));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw ResourceNotFoundException.of("User", id);
        }
        userRepository.deleteById(id);
    }

    /** Polymorphism demo: getDashboardSummary() resolves differently per concrete User subclass. */
    public DashboardSummaryResponse getDashboard(User currentUser) {
        return new DashboardSummaryResponse(currentUser.getRole(), currentUser.getDashboardSummary());
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("User", id));
    }
}
