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

    /**
     * 지정된 소유자와 생성일시로 새로운 채팅방 엔티티를 생성합니다.
     *
     * @param owner 채팅방 소유자
     * @param createdAt 채팅방 생성 시각
     */
    @Builder
    public ChatRoom(String owner, LocalDateTime createdAt) {
        this.owner = owner;
        this.createdAt = createdAt;
    }

}
