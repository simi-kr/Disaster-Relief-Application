package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.notification.NotificationResponse;
import com.college.disasterrelief.exception.ResourceNotFoundException;
import com.college.disasterrelief.model.Notification;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.model.enums.NotificationType;
import com.college.disasterrelief.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void notify(User user, String message, NotificationType type) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setType(type);
        notificationRepository.save(notification);
    }

    public List<NotificationResponse> getForUser(User user) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(NotificationResponse::from).toList();
    }

    public void markAsRead(User user, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> ResourceNotFoundException.of("Notification", notificationId));
        if (!notification.getUser().getId().equals(user.getId())) {
            throw ResourceNotFoundException.of("Notification", notificationId);
        }
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }
}
