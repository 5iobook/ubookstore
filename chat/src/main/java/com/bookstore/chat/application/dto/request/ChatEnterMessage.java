package com.bookstore.chat.application.dto.request;

import lombok.Getter;

@Getter
public class ChatEnterMessage {
    private String roomId;
    private String sender;
    private Boolean isOwner;
}
