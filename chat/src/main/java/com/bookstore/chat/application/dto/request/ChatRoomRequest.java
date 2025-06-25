package com.bookstore.chat.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomRequest {
    private String owner;
    private String roomId;
}
