package com.bookstore.chat.infrastructure.util;

import com.bookstore.chat.application.service.ChatRoomService;
import com.bookstore.chat.domain.chat.repository.ChatRepository;
import com.bookstore.chat.domain.chat.vo.SessionRoomManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    private final SessionRoomManager sessionRoomManager;
    private final ChatRoomService  chatRoomService;

    // 연결 성공 시 호출
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("새 WebSocket 연결: {}", event.getMessage().getHeaders().get("simpSessionId"));
    }

    // 연결 종료 시 호출
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        String userId = sessionRoomManager.getUserId(sessionId);
        Long roomId = sessionRoomManager.getRoomId(sessionId);

        logger.info("WebSocket 연결 종료: {}", sessionId);

        //ChatRoom, Chat, ChatRoomEnter 삭제
        if (userId != null && roomId != null) {
            // DB에서 해당 유저가 해당 방에서 나간 기록 등 삭제 or 상태 업데이트
            chatRoomService.leaveUserRoom(userId, roomId);
        }

        sessionRoomManager.unregisterSession(sessionId);

    }

}
