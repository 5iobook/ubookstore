package com.bookstore.chat.application.service;

import com.bookstore.chat.application.dto.request.ChatRoomRequest;
import com.bookstore.chat.application.dto.response.ChatResponse;
import com.bookstore.chat.application.dto.response.ChatRoomResponse;
import com.bookstore.chat.domain.chat.entity.ChatRoom;
import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import com.bookstore.chat.infrastructure.persistence.chat.ChatJpaRepository;
import com.bookstore.chat.infrastructure.persistence.chat.ChatRoomEnterJpaRepository;
import com.bookstore.chat.infrastructure.persistence.chat.ChatRoomJpaRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomEnterJpaRepository chatRoomEnterJpaRepository;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
    private final ChatJpaRepository chatJpaRepository;

    public void saveEnterTime(String roomId, String userId) {
        chatRoomEnterJpaRepository.save(ChatRoomEnter.builder()
            .userId(userId)
            .roomId(roomId)
            .enterTime(LocalDateTime.now())
            .build()
        );
    }

    @Transactional
    public ChatRoomResponse roomSave(ChatRoomRequest request) {
        ChatRoom chatRoom = ChatRoom.builder()
            .roomId(UUID.randomUUID().toString()) // PK로 사용할 UUID
            .owner(request.getOwner())
            .createdAt(LocalDateTime.now())
            .build();

        ChatRoom saved = chatRoomJpaRepository.save(chatRoom);
        saveEnterTime(saved.getRoomId(), saved.getOwner());

        return new ChatRoomResponse(saved);
    }

    public boolean existsEnterRecord(String sender, String roomId) {
        return chatRoomEnterJpaRepository.existsByUserIdAndRoomId(sender, roomId);
    }

    public ChatRoom findChatRoomById(String roomId) {
        return chatRoomJpaRepository.findByRoomId(roomId);
    }

    @Transactional
    public void leaveUserRoom(String userId, String roomId) {
        chatRoomEnterJpaRepository.deleteByUserIdAndRoomId(userId, roomId);
        chatJpaRepository.deleteBySenderAndChatRoom_RoomId(userId, roomId);
        //유저가 남아있지 않을시 삭제
        long remaining = chatRoomEnterJpaRepository.countByRoomId(roomId);
            if (remaining == 0) {
                   chatRoomJpaRepository.deleteByRoomId(roomId);
               }

    }
}
