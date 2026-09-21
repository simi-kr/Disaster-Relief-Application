package com.college.disasterrelief.dto.user;

import jakarta.validation.constraints.NotBlank;

public record UpdateProfileRequest(
        @NotBlank String name,
        String phone,
        String location
) {
}
