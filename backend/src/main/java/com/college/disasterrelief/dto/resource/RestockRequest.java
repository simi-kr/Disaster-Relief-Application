package com.college.disasterrelief.dto.resource;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RestockRequest(@NotNull @Min(1) Integer quantity) {
}
