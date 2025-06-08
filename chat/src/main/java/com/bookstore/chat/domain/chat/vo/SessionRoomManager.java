package com.bookstore.chat.domain.chat.vo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class SessionRoomManager {

    // sessionId -> userId
    private final Map<String, String> sessionUserMap = new ConcurrentHashMap<>();

    // sessionId -> roomId
    private final Map<String, Long> sessionRoomMap = new ConcurrentHashMap<>();

    public void registerSession(String sessionId, String userId, Long roomId) {
        sessionUserMap.put(sessionId, userId);
        sessionRoomMap.put(sessionId, roomId);
    }

    public String getUserId(String sessionId) {
        return sessionUserMap.get(sessionId);
    }

    public Long getRoomId(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    public void unregisterSession(String sessionId) {
        sessionUserMap.remove(sessionId);
        sessionRoomMap.remove(sessionId);
    }
}
