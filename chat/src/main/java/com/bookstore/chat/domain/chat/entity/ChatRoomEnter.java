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

    /**
     * 사용자의 채팅방 입장 시간을 설정합니다.
     *
     * @param enterTime 사용자가 채팅방에 입장한 시간
     */
    public void setEnterTime(LocalDateTime enterTime) {
        this.enterTime = enterTime;
    }

    /**
     * ChatRoomEnter 엔티티의 모든 필드를 초기화하는 빌더 생성자입니다.
     *
     * @param userId   사용자의 식별자
     * @param type     입장 유형 또는 사용자 유형
     * @param roomId   채팅방의 식별자
     * @param enterTime 사용자의 채팅방 입장 시각
     */
    @Builder
    public ChatRoomEnter(String userId,String type, Long roomId, LocalDateTime enterTime) {
        this.userId = userId;
        this.type = type;
        this.roomId = roomId;
        this.enterTime = enterTime;
    }
}
