package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import java.util.Optional;

public interface ChatRoomEnterRepository {

    Optional<ChatRoomEnter> findByUserIdAndRoomId(String userId, String roomId);

    boolean existsByUserIdAndRoomId(String userId, String roomId);

    void deleteByUserIdAndRoomId(String userId, String roomId);

    long countByRoomId(String roomId);
}
