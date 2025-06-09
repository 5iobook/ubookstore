package com.bookstore.chat.application.service;

import com.bookstore.chat.application.dto.response.ChatResponse;
import com.bookstore.chat.domain.chat.entity.ChatRoom;
import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import com.bookstore.chat.domain.chat.vo.ChatMessage;
import com.bookstore.chat.infrastructure.persistence.chat.ChatJpaRepository;
import com.bookstore.chat.infrastructure.persistence.chat.ChatRoomEnterJpaRepository;
import com.bookstore.chat.infrastructure.persistence.chat.ChatRoomJpaRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomEnterJpaRepository chatRoomEnterJpaRepository;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
    private final ChatJpaRepository chatJpaRepository;

    public void saveEnterTime(ChatResponse message) {
        chatRoomEnterJpaRepository.save(ChatRoomEnter.builder()
            .userId(message.getSender())
            .roomId(message.getRoomId())
            .type(message.getType())
            .enterTime(LocalDateTime.now())
            .build()
        );
    }

    public void roomSave(ChatMessage message){
       chatRoomJpaRepository.save(ChatRoom.builder()
            .roomId(message.getRoomId())
            .owner(message.getSender())
            .createdAt(LocalDateTime.now())
            .build());
    }

    public boolean existsEnterRecord(String sender, String roomId) {
        return chatRoomEnterJpaRepository.existsByUserIdAndRoomId(sender, roomId);
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
