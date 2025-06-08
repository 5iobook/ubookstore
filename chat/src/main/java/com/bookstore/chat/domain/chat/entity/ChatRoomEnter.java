package com.bookstore.chat.domain.chat.entity;

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

    private String userId;
    private String type;
    private Long roomId;
    private LocalDateTime enterTime;

    public void setEnterTime(LocalDateTime enterTime) {
        this.enterTime = enterTime;
    }

    @Builder
    public ChatRoomEnter(String userId,String type, Long roomId, LocalDateTime enterTime) {
        this.userId = userId;
        this.type = type;
        this.roomId = roomId;
        this.enterTime = enterTime;
    }
}
