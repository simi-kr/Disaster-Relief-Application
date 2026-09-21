package com.college.disasterrelief.dto.auth;

import com.college.disasterrelief.model.enums.Role;

public record AuthResponse(
        String token,
        Long id,
        String name,
        String email,
        Role role
) {
}
