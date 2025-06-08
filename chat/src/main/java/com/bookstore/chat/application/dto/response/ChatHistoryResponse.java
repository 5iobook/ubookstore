package com.bookstore.chat.application.dto.response;

import com.bookstore.chat.domain.chat.vo.ChatMessage;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistoryResponse {

    private Long roomId;
    private List<ChatMessage> messages;
}