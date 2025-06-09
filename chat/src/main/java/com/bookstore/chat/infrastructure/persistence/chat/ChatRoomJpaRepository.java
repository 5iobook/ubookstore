package com.bookstore.chat.infrastructure.persistence.chat;

import com.bookstore.chat.domain.chat.entity.ChatRoom;
import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import com.bookstore.chat.domain.chat.repository.ChatRoomEnterRepository;
import com.bookstore.chat.domain.chat.repository.ChatRoomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomJpaRepository extends JpaRepository<ChatRoom, Long>,
    ChatRoomRepository {


}
