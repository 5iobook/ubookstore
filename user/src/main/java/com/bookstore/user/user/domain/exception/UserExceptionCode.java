package com.bookstore.user.user.domain.exception;

import com.bookstore.common.application.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum UserExceptionCode implements ExceptionCode {
    DUPLICATE_EMAIL("U101", "이미 존재하는 이메일입니다.", HttpStatus.CONFLICT),
    NOT_FOUND_EMAIL("U102", "유저(이메일)를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    INVALID_PASSWORD("U103", "비밀번호가 일치하지 않습니다", HttpStatus.BAD_REQUEST),
    NOT_FOUND_USER("U104", "유저를 찾을 수 없습니다", HttpStatus.NOT_FOUND),

    TOKEN_EXPIRED("U105", "토큰이 만료되었습니다", HttpStatus.UNAUTHORIZED),
    LOCK_CONFLICT("U106", "충돌이 발생하여 실패했습니다. 다시 시도해 주세요", HttpStatus.CONFLICT),
    ;

    private final String code;
    private final String message;
    private final HttpStatus status;

}
