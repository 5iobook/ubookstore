package com.bookstore.post.post.presentation.controller.v1;

import com.bookstore.post.common.application.dto.ResDTO;
import com.bookstore.post.post.application.dto.v1.request.ReqPostPostDTOApiV1;
import com.bookstore.post.post.domain.entity.PostEntity;
import java.util.UUID;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/posts")
public class PostControllerApiV1 {

    @PostMapping
    public ResponseEntity<ResDTO<Object>> postBy(
        @RequestBody ReqPostPostDTOApiV1 dto
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("게시글이 생성되었습니다.")
                .build(),
            HttpStatus.CREATED
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> getBy(
        @PathVariable UUID id
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("게시글 단건 조회에 성공했습니다.")
                .build(),
            HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<ResDTO<Object>> getBy(
        @QuerydslPredicate(root = PostEntity.class) Predicate predicate,
        @PageableDefault(page = 0, size = 10, sort = "viewCount") Pageable pageable
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("게시글 리스트 조회에 성공했습니다.")
                .build(),
            HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> putBy(
        @PathVariable UUID id,
        @RequestBody ReqPostPostDTOApiV1 dto
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("게시글 수정을 성공했습니다.")
                .build(),
            HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> deleteBy(
        @PathVariable UUID id
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("게시글 삭제에 성공했습니다.")
                .build(),
            HttpStatus.OK
        );
    }
}