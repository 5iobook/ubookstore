package com.bookstore.book.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/books")
@RequiredArgsConstructor
@Slf4j
public class BookControllerApiV1 {

    @GetMapping
    public ResponseEntity<ResDTO<Object>> getBookList(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        java.util.Map<String, Object> pageInfo = new java.util.HashMap<>();
        pageInfo.put("totalPages", 0);
        pageInfo.put("totalElements", 0);
        pageInfo.put("number", page);
        pageInfo.put("size", size);
        
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("content", new java.util.ArrayList<>());
        data.put("page", pageInfo);
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("도서 목록 조회 성공")
                        .data(data)
                        .build()
        );
    }
}
