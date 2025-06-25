package com.bookstore.chat.presentation.controller;


import com.bookstore.chat.application.dto.request.ChatEnterMessage;
import com.bookstore.chat.application.dto.response.ChatHistoryResponse;
import com.bookstore.chat.application.dto.response.ChatResponse;
import com.bookstore.chat.application.service.ChatRoomService;
import com.bookstore.chat.domain.chat.vo.ChatMessage;
import com.bookstore.chat.application.service.ChatService;
import com.bookstore.chat.domain.chat.vo.SessionRoomManager;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final SessionRoomManager sessionRoomManager;



    //클라이언트가 /api/chat/send/로 메시지를 보낼때
    @MessageMapping("/chat/send")
    public void sendMessage(ChatMessage message) {
        chatService.save(message); // DB 저장
        messagingTemplate.convertAndSend("/topic/chatroom/"+ message.getRoomId(), message);
    }


    //채팅방 입장시 처리
    @MessageMapping("/chat/enter")
    public void enter(ChatEnterMessage message, SimpMessageHeaderAccessor headerAccessor) {
        
        try {
            String sessionId = headerAccessor.getSessionId();
            String userId = message.getSender();
            String roomId = message.getRoomId();
            Boolean isOwner = message.getIsOwner();

            sessionRoomManager.registerSession(sessionId, userId, roomId);

            if (!chatRoomService.existsEnterRecord(userId, roomId) && !isOwner) {
                handleFirstTimeEntry(message);
            } else {
                handleReEntry(userId, roomId);
            }
        }catch(Exception e) {
            log.error("채팅방 입장 처리 중 오류 발생: ", e);

        }

    }

    private void handleFirstTimeEntry(ChatEnterMessage  message) {

        ChatMessage chatMessage = ChatMessage.builder()
            .message(message.getSender() + " joined the chat")
            .sender(message.getSender())
            .roomId(message.getRoomId())
            .createdAt(LocalDateTime.now())
            .build();


            // TODO: owner에게 알림 메시지 보내기 - alert 서비스 구현 필요
            chatService.sendAlert();


        messagingTemplate.convertAndSend("/topic/chatroom/" + message.getRoomId(), chatMessage);

    }

    private void  handleReEntry(String userId, String roomId) {
        // 이전 입장 시간 이후 채팅 기록 가져오기
        List<ChatMessage> history = chatService.getMessagesAfter(userId, roomId);

        // 클라이언트 전송용 응답
        ChatHistoryResponse response = new ChatHistoryResponse(roomId, history);
        messagingTemplate.convertAndSendToUser(userId, "/queue/history", response);
    }


    }

