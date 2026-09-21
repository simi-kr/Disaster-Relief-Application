package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.user.DashboardSummaryResponse;
import com.college.disasterrelief.dto.user.UpdateProfileRequest;
import com.college.disasterrelief.dto.user.UserResponse;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal User user) {
        return UserResponse.from(user);
    }

    @PutMapping("/me")
    public UserResponse updateMe(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateProfileRequest request) {
        return userService.updateProfile(user, request);
    }

    @GetMapping("/me/dashboard")
    public DashboardSummaryResponse dashboard(@AuthenticationPrincipal User user) {
        return userService.getDashboard(user);
    }
}
