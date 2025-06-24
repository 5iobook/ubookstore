package com.bookstore.wish.application.exception;

import com.bookstore.common.application.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum WishExceptionCode implements ExceptionCode {
    ALREADY_WISHED("W101", "이미 찜한 게시물입니다.", HttpStatus.CONFLICT),
    WISH_NOT_FOUND("W102", "찜 목록에 존재하지 않습니다.", HttpStatus.NOT_FOUND),
    NOT_OWN_WISH("W103", "본인의 찜이 아닙니다.", HttpStatus.FORBIDDEN),
    ;

    private final String code;
    private final String message;
    private final HttpStatus status;
}
