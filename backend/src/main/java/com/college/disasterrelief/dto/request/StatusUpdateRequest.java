package com.college.disasterrelief.dto.request;

import com.college.disasterrelief.model.enums.RequestStatus;
import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(@NotNull RequestStatus status) {
}
