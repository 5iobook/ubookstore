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

    /**
     * 주어진 세션 ID를 사용자 ID와 채팅방 ID에 매핑하여 등록합니다.
     *
     * @param sessionId 등록할 세션의 고유 식별자
     * @param userId 세션에 연결할 사용자 ID
     * @param roomId 세션에 연결할 채팅방 ID
     */
    public void registerSession(String sessionId, String userId, Long roomId) {
        sessionUserMap.put(sessionId, userId);
        sessionRoomMap.put(sessionId, roomId);
    }

    /**
     * 주어진 세션 ID에 연결된 사용자 ID를 반환합니다.
     *
     * @param sessionId 조회할 세션 ID
     * @return 해당 세션 ID에 매핑된 사용자 ID, 없으면 null
     */
    public String getUserId(String sessionId) {
        return sessionUserMap.get(sessionId);
    }

    /**
     * 주어진 세션 ID에 연결된 채팅방 ID를 반환합니다.
     *
     * @param sessionId 조회할 세션 ID
     * @return 해당 세션 ID에 매핑된 채팅방 ID, 없으면 null
     */
    public Long getRoomId(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    /**
     * 주어진 세션 ID에 대한 사용자 및 채팅방 매핑 정보를 모두 제거합니다.
     *
     * @param sessionId 매핑을 해제할 세션 ID
     */
    public void unregisterSession(String sessionId) {
        sessionUserMap.remove(sessionId);
        sessionRoomMap.remove(sessionId);
    }
}
