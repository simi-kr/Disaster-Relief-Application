package com.college.disasterrelief.dto.user;

import com.college.disasterrelief.model.User;
import com.college.disasterrelief.model.enums.Role;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String name,
        String email,
        String phone,
        String location,
        Role role,
        LocalDateTime createdAt
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(), user.getName(), user.getEmail(), user.getPhone(),
                user.getLocation(), user.getRole(), user.getCreatedAt());
    }
}
