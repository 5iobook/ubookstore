package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import java.util.Optional;

public interface ChatRoomEnterRepository {

    Optional<ChatRoomEnter> findByUserIdAndRoomId(String userId, Long roomId);

    boolean existsByUserIdAndRoomId(String userId, Long roomId);

    void deleteByUserIdAndRoomId(String userId, Long roomId);
}
