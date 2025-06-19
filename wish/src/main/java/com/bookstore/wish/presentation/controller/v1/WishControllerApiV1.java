package com.bookstore.wish.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import com.bookstore.wish.application.dto.v1.response.ResWishGetDTOApiV1;
import com.bookstore.wish.application.dto.v1.response.ResWishPostDTOApiV1;
import com.bookstore.wish.application.service.v1.WishServiceApiV1;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/wishes")
public class WishControllerApiV1 {

    private final WishServiceApiV1 wishService;

    @PostMapping
    public ResponseEntity<ResDTO<ResWishPostDTOApiV1>> postBy(
        @RequestParam UUID postId
    ) {
        ResWishPostDTOApiV1 response = wishService.postBy(postId);
        return new ResponseEntity<>(
            ResDTO.<ResWishPostDTOApiV1>builder()
                .code("0")
                .message("위시에 추가되었습니다.")
                .data(response)
                .build(),
            HttpStatus.CREATED
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ResDTO<ResWishGetDTOApiV1>> getBy(
        @PageableDefault(page = 0, size = 10) Pageable pageable
    ) {
        ResWishGetDTOApiV1 response = wishService.getBy(1L, pageable);
        return new ResponseEntity<>(
            ResDTO.<ResWishGetDTOApiV1>builder()
                .code("0")
                .message("사용자 위시 리스트 조회에 성공했습니다.")
                .data(response)
                .build(),
            HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> deleteBy(
        @PathVariable UUID id
    ) {
        wishService.deleteBy(1L, id);
        return new ResponseEntity<>(
            ResDTO.builder()
                .code("0")
                .message("위시를 취소했습니다.")
                .build(),
            HttpStatus.OK
        );
    }
}
