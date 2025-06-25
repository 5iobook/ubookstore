package com.bookstore.chat.application.service;

import com.bookstore.chat.domain.chat.entity.ChatRoom;
import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import com.bookstore.chat.infrastructure.persistence.chat.ChatJpaRepository;
import com.bookstore.chat.domain.chat.vo.ChatMessage;
import com.bookstore.chat.domain.chat.entity.Chat;

import com.bookstore.chat.infrastructure.persistence.chat.ChatRoomEnterJpaRepository;
import com.bookstore.chat.presentation.advice.AlertClient;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final AlertClient alertClient;
    private final ChatJpaRepository chatRepository;
    private final ChatRoomEnterJpaRepository chatRoomEnterJpaRepository;
    private final ChatRoomService chatRoomService;

    public void save(ChatMessage chatMessage) {
        ChatRoom chatRoom = chatRoomService.findChatRoomById(chatMessage.getRoomId());
        Chat chat = ChatMessage.toEntity(chatMessage,chatRoom);
        chatRepository.save(chat);
    }

    @Transactional
    public List<ChatMessage> getMessagesAfter(String sender, String roomId) {
        // 사용자의 마지막 입장 기록 찾기
        ChatRoomEnter enterRecord = chatRoomEnterJpaRepository.findByUserIdAndRoomId(sender, roomId)
            .orElseThrow(() -> new IllegalStateException("입장 기록이 없습니다"));

        // 입장 시간 이후 메시지 반환
        List<Chat> chatList =  chatRepository.findByChatRoom_RoomIdAndCreatedAtAfterOrderByCreatedAt(roomId, enterRecord.getEnterTime());
        return ChatMessage.fromEntityList(chatList);
    }


    public void sendAlert() {
        String message = "채팅방에 다른 사람이 입장했습니다.";
        try {
            alertClient.sendAlert(message);
        } catch (Exception e) {
            log.warn("Slack 알림 전송 실패: {}", e.getMessage());
        }
    }
}
