package com.bookstore.chat.infrastructure.persistence.chat;

import com.bookstore.chat.domain.chat.entity.Chat;
import com.bookstore.chat.domain.chat.repository.ChatRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatJpaRepository extends JpaRepository<Chat,Long>, ChatRepository {


}
