package com.college.disasterrelief.dto.notification;

import com.college.disasterrelief.model.Notification;
import com.college.disasterrelief.model.enums.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponse(
        Long id,
        String message,
        NotificationType type,
        boolean isRead,
        LocalDateTime createdAt
) {
    public static NotificationResponse from(Notification n) {
        return new NotificationResponse(n.getId(), n.getMessage(), n.getType(), n.getIsRead(), n.getCreatedAt());
    }
}
