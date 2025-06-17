package com.bookstore.chat.application.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatResponse {
    private String message;
    private String sender;
    private String roomId;
    private Boolean isOwner; //OWNER
}
