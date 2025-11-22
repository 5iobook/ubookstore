package com.bookstore.chat.presentation.controller;


import com.bookstore.chat.application.dto.request.ChatRoomRequest;
import com.bookstore.chat.application.dto.response.ChatRoomResponse;
import com.bookstore.chat.application.service.ChatRoomService;
import com.bookstore.chat.domain.chat.entity.ChatRoom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createChatRoom(@RequestBody ChatRoomRequest chatRoomRequest) {
        ChatRoomResponse chatRoom = chatRoomService.roomSave(chatRoomRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("code", "0");
        response.put("message", "채팅방 생성 성공");
        response.put("data", chatRoom);
        return ResponseEntity.ok(response);
    }

    // 내 채팅방 목록 조회
    @GetMapping("/my")
    public ResponseEntity<Map<String, Object>> getMyChatRooms(@RequestParam String userId) {
        List<ChatRoomResponse> chatRooms = chatRoomService.getMyChatRooms(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("code", "0");
        response.put("message", "채팅방 목록 조회 성공");
        response.put("data", chatRooms);
        return ResponseEntity.ok(response);
    }

    // 채팅방 상세 조회
    @GetMapping("/{roomId}")
    public ResponseEntity<Map<String, Object>> getChatRoom(@PathVariable String roomId) {
        ChatRoom chatRoom = chatRoomService.findChatRoomById(roomId);
        if (chatRoom == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> response = new HashMap<>();
        response.put("code", "0");
        response.put("message", "채팅방 조회 성공");
        response.put("data", new ChatRoomResponse(chatRoom));
        return ResponseEntity.ok(response);
    }

    // 1:1 채팅방 생성 또는 기존 방 반환
    @PostMapping("/direct")
    public ResponseEntity<Map<String, Object>> getOrCreateDirectChat(
        @RequestParam String currentUser,
        @RequestParam String targetUser
    ) {
        ChatRoomResponse chatRoom = chatRoomService.getOrCreateChatRoom(currentUser, targetUser);
        Map<String, Object> response = new HashMap<>();
        response.put("code", "0");
        response.put("message", "채팅방 조회/생성 성공");
        response.put("data", chatRoom);
        return ResponseEntity.ok(response);
    }
}
