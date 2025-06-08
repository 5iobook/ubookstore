package com.bookstore.chat.domain.chat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chat")
@Getter
@NoArgsConstructor
public class Chat{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private String sender;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    /**
     * 지정된 메시지, 발신자, 채팅방, 생성 시각으로 Chat 엔티티 인스턴스를 생성합니다.
     *
     * @param message 저장할 채팅 메시지 내용
     * @param sender 메시지 발신자
     * @param chatRoom 메시지가 속한 채팅방 엔티티
     * @param createdAt 메시지 생성 시각
     */
    @Builder
    private Chat( String message, String sender, ChatRoom chatRoom, LocalDateTime createdAt) {
        this.message = message;
        this.sender = sender;
        this.chatRoom = chatRoom;
        this.createdAt = createdAt;
    }

}
