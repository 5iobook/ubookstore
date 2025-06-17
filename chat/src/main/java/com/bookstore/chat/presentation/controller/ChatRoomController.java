package com.bookstore.chat.presentation.controller;


import com.bookstore.chat.application.dto.request.ChatRoomRequest;
import com.bookstore.chat.application.dto.response.ChatRoomResponse;
import com.bookstore.chat.application.service.ChatRoomService;
import com.bookstore.chat.domain.chat.entity.ChatRoom;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public ResponseEntity<ChatRoomResponse> createChatRoom(@RequestBody ChatRoomRequest chatRoomRequest) {
        ChatRoomResponse chatRoom = chatRoomService.roomSave(chatRoomRequest);

        return ResponseEntity.ok(chatRoom);
    }
}
