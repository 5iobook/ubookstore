package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.Chat;
import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository {

    void deleteBySenderAndChatRoom_RoomId(String userId, String roomId);

    List<Chat> findByChatRoom_RoomIdAndCreatedAtAfterOrderByCreatedAt(String roomId, LocalDateTime enterTime);
}
