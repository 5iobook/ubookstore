package com.bookstore.chat.domain.chat.entity;

import jakarta.persistence.Column;
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
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String owner;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder
    public ChatRoom(String owner, LocalDateTime createdAt) {
        this.owner = owner;
        this.createdAt = createdAt;
    }

}
