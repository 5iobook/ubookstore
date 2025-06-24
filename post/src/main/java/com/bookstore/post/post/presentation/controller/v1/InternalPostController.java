package com.bookstore.post.post.presentation.controller.v1;

import com.bookstore.post.post.application.service.v1.PostServiceApiV1;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/internal/posts")
public class InternalPostController {

    private final PostServiceApiV1 postService;

    @GetMapping("/{id}/exists")
    public void existsBy(
        @PathVariable UUID id
    ) {
        postService.existsBy(id);
    }

    @PostMapping("/{id}/wish-count/increase")
    public void increaseWishCount(
        @PathVariable UUID id
    ) {
        postService.increaseWishCount(id);
    }

    @PostMapping("/{id}/wish-count/decrease")
    public void decreaseWishCount(
        @PathVariable UUID id
    ) {
        postService.decreaseWishCount(id);
    }
}
