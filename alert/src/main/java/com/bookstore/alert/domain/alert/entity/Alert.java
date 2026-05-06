package com.bookstore.alert.domain.alert.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String message;

    private String type;

    private boolean isRead = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder
    public Alert(String userId, String message, String type, boolean isRead, LocalDateTime createdAt) {
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public void markAsRead() {
        this.isRead = true;
    }
}
