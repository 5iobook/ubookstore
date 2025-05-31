package com.bookstore.chat.controller;


import com.bookstore.chat.model.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    //클라이언트가 /app/chat.send/로 메시지를 보낼때
    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessage message) {
        messagingTemplate.convertAndSend("/topic/chatroom/"+ message.getRoomId(), message);
    }

    //채팅방 입장시 처리
    @MessageMapping("/chat.enter")
    public void enter(ChatMessage message) {
        message.setMessage(message.getSender() + " joined the chat");
        messagingTemplate.convertAndSend("/topic/chatroom/" + message.getRoomId(), message);
    }


}
