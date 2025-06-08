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

    /**
     * 사용자가 채팅방에 입장한 시간을 기록합니다.
     *
     * @param message 입장 정보를 포함한 채팅 메시지 객체
     */
    public void saveEnterTime(ChatResponse message) {
        chatRoomEnterJpaRepository.save(ChatRoomEnter.builder()
            .userId(message.getSender())
            .roomId(message.getRoomId())
            .type(message.getType())
            .enterTime(LocalDateTime.now())
            .build()
        );
    }

    /**
     * 새로운 채팅방을 생성하여 저장합니다.
     *
     * @param message 채팅방 소유자 정보를 포함한 메시지 객체
     */
    public void roomSave(ChatResponse message){
        chatRoomJpaRepository.save(ChatRoom.builder()
            .owner(message.getSender())
            .createdAt(LocalDateTime.now())
            .build());

    }

    /**
     * 지정한 사용자가 특정 채팅방에 입장 기록이 있는지 확인합니다.
     *
     * @param sender 사용자 ID
     * @param roomId 채팅방 ID
     * @return 입장 기록이 존재하면 true, 그렇지 않으면 false
     */
    public boolean existsEnterRecord(String sender, Long roomId) {
        return chatRoomEnterJpaRepository.existsByUserIdAndRoomId(sender, roomId);
    }

    /**
     * 사용자가 채팅방을 나갈 때 해당 사용자의 입장 기록, 채팅 메시지, 채팅방 자체를 삭제합니다.
     *
     * @param userId 채팅방을 나가는 사용자의 ID
     * @param roomId 삭제할 채팅방의 ID
     */
    @Transactional
    public void leaveUserRoom(String userId, Long roomId) {
        chatRoomEnterJpaRepository.deleteByUserIdAndRoomId(userId, roomId);
        chatJpaRepository.deleteBySenderAndChatRoom_Id(userId, roomId);
        chatRoomJpaRepository.deleteById(roomId);

    }
}
