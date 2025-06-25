package com.bookstore.chat.domain.chat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoomEnter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String roomId;

    private LocalDateTime enterTime;

    public void setEnterTime(LocalDateTime enterTime) {
        this.enterTime = enterTime;
    }

    @Builder
    public ChatRoomEnter(String userId, String roomId, LocalDateTime enterTime) {
        this.userId = userId;
        this.roomId = roomId;
        this.enterTime = enterTime;
    }
}
