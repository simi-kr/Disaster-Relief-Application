package com.college.disasterrelief.dto.volunteer;

import com.college.disasterrelief.model.VolunteerProfile;
import com.college.disasterrelief.model.enums.Availability;

public record VolunteerResponse(
        Long id,
        Long userId,
        String userName,
        String skills,
        String location,
        Availability availability
) {
    public static VolunteerResponse from(VolunteerProfile v) {
        return new VolunteerResponse(v.getId(), v.getUser().getId(), v.getUser().getName(),
                v.getSkills(), v.getLocation(), v.getAvailability());
    }
}
