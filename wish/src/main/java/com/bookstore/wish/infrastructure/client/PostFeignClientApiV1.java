package com.bookstore.wish.infrastructure.client;

import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "postClient", url = "http://localhost:8081")
public interface PostFeignClientApiV1 {

    @GetMapping("/v1/posts/{id}/exists")
    ResponseEntity<Void> existsBy(@PathVariable UUID id);

}
