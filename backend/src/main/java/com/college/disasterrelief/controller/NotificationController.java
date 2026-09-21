package com.college.disasterrelief.controller;

import com.college.disasterrelief.dto.notification.NotificationResponse;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationResponse> getMine(@AuthenticationPrincipal User user) {
        return notificationService.getForUser(user);
    }

    @PutMapping("/{id}/read")
    public void markRead(@AuthenticationPrincipal User user, @PathVariable Long id) {
        notificationService.markAsRead(user, id);
    }
}
