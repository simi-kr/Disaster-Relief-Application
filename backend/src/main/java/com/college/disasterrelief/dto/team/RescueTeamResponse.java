package com.college.disasterrelief.dto.team;

import com.college.disasterrelief.model.RescueTeam;
import com.college.disasterrelief.model.enums.Availability;

public record RescueTeamResponse(
        Long id,
        String name,
        String contact,
        String location,
        Availability availability
) {
    public static RescueTeamResponse from(RescueTeam t) {
        return new RescueTeamResponse(t.getId(), t.getName(), t.getContact(), t.getLocation(), t.getAvailability());
    }
}
