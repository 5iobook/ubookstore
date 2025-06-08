package com.bookstore.chat.domain.chat.vo;


import com.bookstore.chat.domain.chat.entity.Chat;
import com.bookstore.chat.domain.chat.entity.ChatRoom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatMessage {

    private String message;
    private String sender;
    private Long roomId;
    private LocalDateTime createdAt;

    /**
     * 메시지 내용을 새 값으로 변경합니다.
     *
     * @param message 새 메시지 내용
     */
    public void setMessage(String message){
        this.message = message;
    }

    /**
     * 주어진 메시지, 발신자, 채팅방 ID, 생성 시각으로 ChatMessage 객체를 생성합니다.
     *
     * @param message   메시지 내용
     * @param sender    발신자 식별자
     * @param roomId    채팅방 ID
     * @param createdAt 메시지 생성 시각
     */
    @Builder
    public ChatMessage(String message, String sender, Long roomId, LocalDateTime createdAt) {
        this.message = message;
        this.sender = sender;
        this.roomId = roomId;
        this.createdAt = createdAt;
    }

    /**
     * ChatMessage 값 객체와 ChatRoom 엔티티를 기반으로 새로운 Chat 엔티티를 생성합니다.
     *
     * @param dto 변환할 ChatMessage 값 객체
     * @param chatRoom 연관된 ChatRoom 엔티티
     * @return 생성된 Chat 엔티티
     */
    public static Chat toEntity(ChatMessage dto, ChatRoom chatRoom) {
        return Chat.builder()
            .chatRoom(chatRoom)
            .sender(dto.getSender())
            .message(dto.getMessage())
            .createdAt(dto.getCreatedAt())
            .build();
    }

    /**
     * Chat 엔티티로부터 ChatMessage 값을 생성합니다.
     *
     * @param chat 변환할 Chat 엔티티
     * @return 주어진 Chat 엔티티의 정보를 기반으로 생성된 ChatMessage 객체
     */
    public static ChatMessage fromEntity(Chat chat) {
        return ChatMessage.builder()
            .roomId(chat.getChatRoom().getId())
            .sender(chat.getSender())
            .message(chat.getMessage())
            .createdAt(chat.getCreatedAt())
            .build();
    }

    /**
     * Chat 엔티티 목록을 ChatMessage 값 객체 목록으로 변환합니다.
     *
     * @param chatList 변환할 Chat 엔티티 리스트
     * @return 변환된 ChatMessage 객체 리스트
     */
    public static List<ChatMessage> fromEntityList(List<Chat> chatList) {
        return chatList.stream()
            .map(ChatMessage::fromEntity)
            .collect(Collectors.toList());
    }

}
