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
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
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

    // 내가 참여한 채팅방 목록 조회
    public List<ChatRoomResponse> getMyChatRooms(String userId) {
        List<ChatRoomEnter> enters = chatRoomEnterJpaRepository.findByUserId(userId);
        return enters.stream()
            .map(enter -> {
                ChatRoom room = chatRoomJpaRepository.findByRoomId(enter.getRoomId());
                return new ChatRoomResponse(room);
            })
            .collect(Collectors.toList());
    }

    // 채팅방 생성 또는 기존 방 반환 (1:1 채팅용)
    @Transactional
    public ChatRoomResponse getOrCreateChatRoom(String currentUser, String targetUser) {
        // 두 사용자 간 기존 채팅방 찾기
        List<ChatRoomEnter> myRooms = chatRoomEnterJpaRepository.findByUserId(currentUser);
        
        for (ChatRoomEnter enter : myRooms) {
            ChatRoom room = chatRoomJpaRepository.findByRoomId(enter.getRoomId());
            // 상대방도 이 방에 있는지 확인
            if (chatRoomEnterJpaRepository.existsByUserIdAndRoomId(targetUser, room.getRoomId())) {
                return new ChatRoomResponse(room);
            }
        }

        // 기존 방이 없으면 새로 생성
        ChatRoom newRoom = ChatRoom.builder()
            .roomId(UUID.randomUUID().toString())
            .owner(currentUser)
            .createdAt(LocalDateTime.now())
            .build();

        ChatRoom saved = chatRoomJpaRepository.save(newRoom);
        
        // 두 사용자 모두 입장 기록
        saveEnterTime(saved.getRoomId(), currentUser);
        saveEnterTime(saved.getRoomId(), targetUser);

        return new ChatRoomResponse(saved);
    }
}
