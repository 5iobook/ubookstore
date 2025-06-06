package com.bookstore.post.post.domain.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum PostStatus {
    AVAILABLE("판매중"),
    RESERVED("예약중"),
    SOLD_OUT("거래완료"),
    HIDDEN("비공개"),
    DELETED("삭제");

    private final String status;
}
