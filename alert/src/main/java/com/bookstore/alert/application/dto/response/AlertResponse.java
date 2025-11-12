package com.bookstore.alert.application.dto.response;

import com.bookstore.alert.domain.alert.entity.Alert;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AlertResponse {
    private Long id;
    private String userId;
    private String message;
    private String type;
    private boolean isRead;
    private LocalDateTime createdAt;

    public static AlertResponse from(Alert alert) {
        return AlertResponse.builder()
                .id(alert.getId())
                .userId(alert.getUserId())
                .message(alert.getMessage())
                .type(alert.getType())
                .isRead(alert.isRead())
                .createdAt(alert.getCreatedAt())
                .build();
    }
}
