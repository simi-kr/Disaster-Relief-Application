package com.college.disasterrelief.dto.user;

import com.college.disasterrelief.model.enums.Role;

public record DashboardSummaryResponse(Role role, String summary) {
}
