package com.bookstore.chat.domain.chat.vo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class SessionRoomManager {

    // sessionId -> userId
    private final Map<String, String> sessionUserMap = new ConcurrentHashMap<>();

    // sessionId -> roomId
    private final Map<String, String> sessionRoomMap = new ConcurrentHashMap<>();

    public void registerSession(String sessionId, String userId, String roomId) {
        sessionUserMap.put(sessionId, userId);
        sessionRoomMap.put(sessionId, roomId);
    }

    public String getUserId(String sessionId) {
        return sessionUserMap.get(sessionId);
    }

    public String getRoomId(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    public void unregisterSession(String sessionId) {
        sessionUserMap.remove(sessionId);
        sessionRoomMap.remove(sessionId);
    }
}
