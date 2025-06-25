package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.ChatRoom;

public interface ChatRoomRepository {

    void deleteByRoomId(String roomId);

    ChatRoom findByRoomId(String roomId);
}
