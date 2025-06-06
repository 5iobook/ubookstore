package com.bookstore.post.post.domain.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ProductCondition {
    NEW("새상품"),
    LIKE_NEW("거의 새상품"),
    GOOD("양호"),
    FAIR("사용감 있음"),
    POOR("저품질")
    ;

    private final String condition;
}
