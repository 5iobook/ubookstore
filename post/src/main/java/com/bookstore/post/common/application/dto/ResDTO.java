package com.bookstore.post.common.application.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResDTO<T> {
    private String code;
    private String message;
    private T data;
}
