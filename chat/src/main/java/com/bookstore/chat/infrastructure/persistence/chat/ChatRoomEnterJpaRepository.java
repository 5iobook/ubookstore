package com.bookstore.chat.infrastructure.persistence.chat;

import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import com.bookstore.chat.domain.chat.repository.ChatRoomEnterRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomEnterJpaRepository extends JpaRepository<ChatRoomEnter, Long>,
    ChatRoomEnterRepository {


}
