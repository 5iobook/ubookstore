package com.bookstore.wish.infrastructure.client;

import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "postClient", url = "http://localhost:8081")
public interface PostFeignClientApiV1 {

    @GetMapping("/v1/internal/posts/{id}/exists")
    void existsBy(@PathVariable UUID id);

    @PostMapping("/v1/internal/posts/{id}/wish-count/increase")
    void increaseWishCount(@PathVariable UUID id);

    @PostMapping("/v1/internal/posts/{id}/wish-count/decrease")
    void decreaseWishCount(@PathVariable UUID id);

}
