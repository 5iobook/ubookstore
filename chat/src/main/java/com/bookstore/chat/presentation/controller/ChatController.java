package com.bookstore.chat.presentation.controller;


import com.bookstore.chat.application.dto.response.ChatHistoryResponse;
import com.bookstore.chat.application.dto.response.ChatResponse;
import com.bookstore.chat.application.service.ChatRoomService;
import com.bookstore.chat.domain.chat.vo.ChatMessage;
import com.bookstore.chat.application.service.ChatService;
import com.bookstore.chat.domain.chat.vo.SessionRoomManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final SessionRoomManager sessionRoomManager;



    /**
     * 클라이언트가 채팅 메시지를 전송할 때 호출되어 메시지를 저장하고 해당 채팅방 구독자들에게 실시간으로 메시지를 전달합니다.
     *
     * @param message 전송할 채팅 메시지 객체
     */
    @MessageMapping("/chat/send")
    public void sendMessage(ChatMessage message) {
        chatService.save(message); // DB 저장
        messagingTemplate.convertAndSend("/topic/chatroom/"+ message.getRoomId(), message);
    }


    /**
     * 사용자가 채팅방에 입장할 때 입장 처리 및 관련 메시지 또는 채팅 기록을 전송합니다.
     *
     * 사용자가 채팅방에 처음 입장하면 입장 시간을 기록하고, 입장 알림 메시지를 해당 채팅방에 브로드캐스트합니다.
     * 방장이 입장할 경우 채팅방 정보를 저장합니다.
     * 재입장하는 경우, 마지막 입장 이후의 채팅 기록을 해당 사용자에게만 전송합니다.
     */
    @MessageMapping("/chat/enter")
    public void enter(ChatResponse message, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        String userId = message.getSender();
        Long roomId = message.getRoomId();

        sessionRoomManager.registerSession(sessionId, userId, roomId);

        if (!chatRoomService.existsEnterRecord(message.getSender(), message.getRoomId())) {
            //첫 입장
            chatRoomService.saveEnterTime(message);
            message.setMessage(message.getSender() + " joined the chat");

            if (message.getType().equals("OWNER")) {
                chatRoomService.roomSave(message);
            } else {
                //owner에게 메시지 보내기
                //###alert 서비스
            }

            messagingTemplate.convertAndSend("/topic/chatroom/" + message.getRoomId(), message);

        } else {
            // 이전 입장 시간 이후 채팅 기록 가져오기
            List<ChatMessage> history = chatService.getMessagesAfter(message.getSender(),
                message.getRoomId());

            // 클라이언트 전송용 응답
            ChatHistoryResponse response = new ChatHistoryResponse(message.getRoomId(), history);
            messagingTemplate.convertAndSendToUser(message.getSender(), "/queue/history", response);
        }

    }


}
