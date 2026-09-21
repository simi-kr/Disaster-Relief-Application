package com.college.disasterrelief.dto.team;

import com.college.disasterrelief.model.enums.Availability;
import jakarta.validation.constraints.NotBlank;

public record RescueTeamRequest(
        @NotBlank String name,
        String contact,
        String location,
        Availability availability
) {
}
