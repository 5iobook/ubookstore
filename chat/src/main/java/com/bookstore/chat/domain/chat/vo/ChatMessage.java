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
    private String roomId;
    private LocalDateTime createdAt;

    @Builder
    public ChatMessage(String message, String sender, String roomId, LocalDateTime createdAt) {
        this.message = message;
        this.sender = sender;
        this.roomId = roomId;
        this.createdAt = createdAt;
    }

    public static Chat toEntity(ChatMessage dto, ChatRoom chatRoom) {
        return Chat.builder()
            .chatRoom(chatRoom)
            .sender(dto.getSender())
            .message(dto.getMessage())
            .createdAt(dto.getCreatedAt())
            .build();
    }

    public static ChatMessage fromEntity(Chat chat) {
        return ChatMessage.builder()
            .roomId(chat.getChatRoom().getRoomId())
            .sender(chat.getSender())
            .message(chat.getMessage())
            .createdAt(chat.getCreatedAt())
            .build();
    }

    public static List<ChatMessage> fromEntityList(List<Chat> chatList) {
        return chatList.stream()
            .map(ChatMessage::fromEntity)
            .collect(Collectors.toList());
    }

}
