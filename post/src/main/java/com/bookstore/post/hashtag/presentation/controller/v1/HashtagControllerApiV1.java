package com.bookstore.post.hashtag.presentation.controller.v1;

import com.bookstore.post.common.application.dto.ResDTO;
import com.bookstore.post.hashtag.application.dto.v1.request.ReqHashtagPostDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.request.ReqHashtagPutDTOApiV1;
import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
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
@RequestMapping("/v1/hashtags")
public class HashtagControllerApiV1 {

    @PostMapping
    public ResponseEntity<ResDTO<Object>> postBy(
        @RequestBody ReqHashtagPostDTOApiV1 dto
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("해시태그가 생성되었습니다.")
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
                .message("해시태그 단건 조회에 성공했습니다.")
                .build(),
            HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<ResDTO<Object>> getBy(
        @QuerydslPredicate(root = HashtagEntity.class) Predicate predicate,
        @PageableDefault(page = 0, size = 10) Pageable pageable
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("해시태그 리스트 조회에 성공했습니다.")
                .build(),
            HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> putBy(
        @PathVariable UUID id,
        @RequestBody ReqHashtagPutDTOApiV1 dto
    ) {
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("해시태그 수정에 성공했습니다.")
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
                .message("해시태그 삭제에 성공했습니다.")
                .build(),
            HttpStatus.NO_CONTENT
        );
    }
}
