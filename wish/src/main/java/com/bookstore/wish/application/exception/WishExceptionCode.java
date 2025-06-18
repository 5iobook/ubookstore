package com.bookstore.wish.application.exception;

import com.bookstore.common.application.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum WishExceptionCode implements ExceptionCode {
    ALREADY_WISHED("W101", "이미 찜한 게시물입니다.", HttpStatus.CONFLICT),
    ;

    private final String code;
    private final String message;
    private final HttpStatus status;
}
