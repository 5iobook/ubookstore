package com.bookstore.book.presentation.controller.v1;

import com.bookstore.book.application.service.NaverBookSearchService;
import com.bookstore.common.application.dto.ResDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
@Slf4j
public class BookControllerApiV1 {

    private final NaverBookSearchService naverBookSearchService;
    
    // 내 도서 저장소 (실제로는 데이터베이스 사용)
    private static final List<Map<String, Object>> myBooks = new ArrayList<>();

    @GetMapping("/books")
    public ResponseEntity<ResDTO<Object>> getBookList(
            @RequestParam(required = false, defaultValue = "spring") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        // Naver API는 1부터 시작하는 start 파라미터 사용
        int start = page * size + 1;
        
        Map<String, Object> result = naverBookSearchService.searchBooks(query, start, size);
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("도서 목록 조회 성공")
                        .data(result)
                        .build()
        );
    }

    @GetMapping("/my-books")
    public ResponseEntity<ResDTO<Object>> getMyBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        // 페이징 처리
        int totalElements = myBooks.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, totalElements);
        
        List<Map<String, Object>> pagedBooks = 
            startIndex < totalElements ? myBooks.subList(startIndex, endIndex) : new ArrayList<>();
        
        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("totalPages", totalPages);
        pageInfo.put("totalElements", totalElements);
        pageInfo.put("number", page);
        pageInfo.put("size", size);
        
        Map<String, Object> bookPage = new HashMap<>();
        bookPage.put("content", pagedBooks);
        bookPage.put("page", pageInfo);
        
        Map<String, Object> result = new HashMap<>();
        result.put("bookPage", bookPage);
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("내 도서 목록 조회 성공")
                        .data(result)
                        .build()
        );
    }

    @PostMapping("/my-books")
    public ResponseEntity<ResDTO<Object>> addMyBook(@RequestBody Map<String, Object> book) {
        
        // 중복 체크 (ISBN 기준)
        String isbn = (String) book.get("isbn");
        boolean exists = myBooks.stream()
                .anyMatch(b -> isbn.equals(b.get("isbn")));
        
        if (exists) {
            return ResponseEntity.badRequest().body(
                    ResDTO.builder()
                            .code("400")
                            .message("이미 추가된 도서입니다.")
                            .build()
            );
        }
        
        // 추가 날짜 설정
        book.put("id", UUID.randomUUID().toString());
        book.put("addedAt", new Date().toString());
        
        myBooks.add(book);
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("도서가 내 도서에 추가되었습니다.")
                        .data(book)
                        .build()
        );
    }

    @PostMapping("/add-book")
    public ResponseEntity<ResDTO<Object>> addBookToMyBooks(@RequestBody Map<String, Object> book) {
        
        // 중복 체크 (ISBN 기준)
        String isbn = (String) book.get("isbn");
        boolean exists = myBooks.stream()
                .anyMatch(b -> isbn.equals(b.get("isbn")));
        
        if (exists) {
            return ResponseEntity.badRequest().body(
                    ResDTO.builder()
                            .code("400")
                            .message("이미 추가된 도서입니다.")
                            .build()
            );
        }
        
        // 추가 날짜 설정
        book.put("id", UUID.randomUUID().toString());
        book.put("addedAt", new Date().toString());
        
        myBooks.add(book);
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("도서가 내 도서에 추가되었습니다.")
                        .data(book)
                        .build()
        );
    }

    @DeleteMapping("/my-books/{isbn}")
    public ResponseEntity<ResDTO<Object>> deleteMyBook(@PathVariable String isbn) {
        
        boolean removed = myBooks.removeIf(book -> isbn.equals(book.get("isbn")));
        
        if (removed) {
            return ResponseEntity.ok(
                    ResDTO.builder()
                            .code("0")
                            .message("도서가 삭제되었습니다.")
                            .build()
            );
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
