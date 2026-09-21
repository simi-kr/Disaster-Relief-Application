package com.college.disasterrelief.dto.disaster;

import com.college.disasterrelief.model.Disaster;
import com.college.disasterrelief.model.enums.DisasterStatus;
import com.college.disasterrelief.model.enums.DisasterType;
import com.college.disasterrelief.model.enums.Severity;

import java.time.LocalDateTime;

public record DisasterResponse(
        Long id,
        DisasterType type,
        String description,
        Severity severity,
        DisasterStatus status,
        Double latitude,
        Double longitude,
        LocalDateTime createdAt
) {
    public static DisasterResponse from(Disaster d) {
        return new DisasterResponse(d.getId(), d.getType(), d.getDescription(), d.getSeverity(),
                d.getStatus(), d.getLatitude(), d.getLongitude(), d.getCreatedAt());
    }
}
