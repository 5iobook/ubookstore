package com.bookstore.chat.application.service;

import com.bookstore.chat.domain.chat.entity.ChatRoom;
import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import com.bookstore.chat.infrastructure.persistence.chat.ChatJpaRepository;
import com.bookstore.chat.domain.chat.vo.ChatMessage;
import com.bookstore.chat.domain.chat.entity.Chat;

import com.bookstore.chat.infrastructure.persistence.chat.ChatRoomEnterJpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatJpaRepository chatRepository;
    private final ChatRoomEnterJpaRepository chatRoomEnterJpaRepository;


    public void save(ChatMessage chatMessage) {

        Chat chat = ChatMessage.toEntity(chatMessage, ChatRoom.builder()
            .owner(chatMessage.getSender())
            .createdAt(LocalDateTime.now())
            .build());
        chatRepository.save(chat);
    }

    @Transactional
    public List<ChatMessage> getMessagesAfter(String sender, Long roomId) {
        // 사용자의 마지막 입장 기록 찾기
        ChatRoomEnter enterRecord = chatRoomEnterJpaRepository.findByUserIdAndRoomId(sender, roomId)
            .orElseThrow(() -> new IllegalStateException("입장 기록이 없습니다"));

        // 입장 시간 이후 메시지 반환
        List<Chat> chatList =  chatRepository.findByChatRoom_IdAndCreatedAtAfterOrderByCreatedAt(roomId, enterRecord.getEnterTime());
        return ChatMessage.fromEntityList(chatList);
    }


}
