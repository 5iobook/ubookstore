package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.Chat;
import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository {

    void deleteBySenderAndChatRoom_Id(String userId, Long roomId);

    List<Chat> findByChatRoom_IdAndCreatedAtAfterOrderByCreatedAt(Long roomId, LocalDateTime enterTime);
}
