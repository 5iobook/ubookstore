package com.bookstore.chat.application.dto.response;

import com.bookstore.chat.domain.chat.entity.ChatRoom;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomResponse {

    private String roomId;
    private String owner;
    private LocalDateTime createdAt;

    // 생성자
    public ChatRoomResponse(ChatRoom chatRoom) {
        this.roomId = chatRoom.getRoomId();
        this.owner = chatRoom.getOwner();
        this.createdAt = chatRoom.getCreatedAt();
    }
}
