package com.college.disasterrelief.dto.resource;

import com.college.disasterrelief.model.ResourceTransaction;
import com.college.disasterrelief.model.enums.TransactionType;

import java.time.LocalDateTime;

public record ResourceTransactionResponse(
        Long id,
        Long resourceId,
        Integer quantity,
        TransactionType type,
        Long requestId,
        LocalDateTime createdAt
) {
    public static ResourceTransactionResponse from(ResourceTransaction t) {
        return new ResourceTransactionResponse(
                t.getId(),
                t.getResource().getId(),
                t.getQuantity(),
                t.getType(),
                t.getRequest() != null ? t.getRequest().getId() : null,
                t.getCreatedAt());
    }
}
