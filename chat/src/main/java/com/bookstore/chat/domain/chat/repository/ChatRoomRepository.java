package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.ChatRoom;
import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository {

    void deleteByRoomId(String roomId);

    ChatRoom findByRoomId(String roomId);

    Optional<ChatRoom> findByOwnerAndRoomId(String owner, String roomId);
}
