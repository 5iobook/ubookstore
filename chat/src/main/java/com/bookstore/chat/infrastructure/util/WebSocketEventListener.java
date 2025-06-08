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

    /**
     * 새로운 WebSocket 연결이 생성될 때 호출됩니다.
     *
     * @param event WebSocket 연결 이벤트 정보
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("새 WebSocket 연결: {}", event.getMessage().getHeaders().get("simpSessionId"));
    }

    /**
     * WebSocket 연결이 종료될 때 세션 및 사용자 정보를 정리합니다.
     *
     * 세션 ID를 기반으로 사용자와 채팅방 정보를 조회하여, 해당 사용자가 채팅방에서 나간 것으로 처리하고 관련 세션 정보를 메모리에서 제거합니다.
     */
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
