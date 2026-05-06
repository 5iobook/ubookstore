package com.bookstore.post.post.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import com.bookstore.post.post.application.dto.v1.request.ReqPostPostDTOApiV1;
import com.bookstore.post.post.application.dto.v1.request.ReqPostPutDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostGetByIdDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostGetDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostPostDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostPutDTOApiV1;
import com.bookstore.post.post.application.service.v1.PostServiceApiV1;
import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.user.user.infrastructure.config.CustomUserDetails;
import java.util.UUID;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/posts")
public class PostControllerApiV1 {

    private final PostServiceApiV1 postService;

    @PostMapping
    public ResponseEntity<ResDTO<ResPostPostDTOApiV1>> postBy(
        @RequestBody ReqPostPostDTOApiV1 dto,
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        ResPostPostDTOApiV1 response = postService.postBy(dto, userId);
        return new ResponseEntity<>(
            ResDTO.<ResPostPostDTOApiV1>builder()
                .code("0")
                .message("게시글이 생성되었습니다.")
                .data(response)
                .build(),
            HttpStatus.CREATED
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResDTO<ResPostGetByIdDTOApiV1>> getBy(
        @PathVariable UUID id
    ) {
        ResPostGetByIdDTOApiV1 response = postService.getBy(id);
        return new ResponseEntity<>(
            ResDTO.<ResPostGetByIdDTOApiV1>builder()
                .code("0")
                .message("게시글 단건 조회에 성공했습니다.")
                .data(response)
                .build(),
            HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<ResDTO<ResPostGetDTOApiV1>> getBy(
        @QuerydslPredicate(root = PostEntity.class) Predicate predicate,
        @PageableDefault(page = 0, size = 10, sort = "viewCount") Pageable pageable
    ) {
        ResPostGetDTOApiV1 response = postService.getBy(predicate, pageable);
        return new ResponseEntity<>(
            ResDTO.<ResPostGetDTOApiV1>builder()
                .code("0")
                .message("게시글 리스트 조회에 성공했습니다.")
                .data(response)
                .build(),
            HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResDTO<ResPostPutDTOApiV1>> putBy(
        @PathVariable UUID id,
        @RequestBody ReqPostPutDTOApiV1 dto,
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        ResPostPutDTOApiV1 response = postService.putBy(id, dto, userId);
        return new ResponseEntity<>(
            ResDTO.<ResPostPutDTOApiV1>builder()
                .code("0")
                .message("게시글 수정을 성공했습니다.")
                .data(response)
                .build(),
            HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> deleteBy(
        @PathVariable UUID id,
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        postService.deleteBy(id, userId);
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("게시글 삭제에 성공했습니다.")
                .build(),
            HttpStatus.NO_CONTENT
        );
    }
}