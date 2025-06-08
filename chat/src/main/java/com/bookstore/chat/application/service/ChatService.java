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


    /**
     * 전달된 채팅 메시지를 새로운 채팅방 엔티티와 함께 저장합니다.
     *
     * @param chatMessage 저장할 채팅 메시지 값 객체
     */
    public void save(ChatMessage chatMessage) {

        Chat chat = ChatMessage.toEntity(chatMessage, ChatRoom.builder()
            .owner(chatMessage.getSender())
            .createdAt(LocalDateTime.now())
            .build());
        chatRepository.save(chat);
    }

    /**
     * 사용자가 채팅방에 마지막으로 입장한 이후에 생성된 모든 채팅 메시지 목록을 반환합니다.
     *
     * @param sender 메시지를 조회할 사용자의 ID
     * @param roomId 채팅방의 ID
     * @return 사용자의 마지막 입장 시간 이후에 생성된 채팅 메시지 리스트
     * @throws IllegalStateException 사용자의 입장 기록이 존재하지 않을 경우 발생합니다.
     */
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
