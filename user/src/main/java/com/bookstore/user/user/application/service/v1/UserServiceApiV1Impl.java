package com.bookstore.user.user.application.service.v1;

import com.bookstore.common.application.exception.CustomException;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSigninDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResTokenDtoApiV1;
import com.bookstore.user.user.domain.entity.UserEntity;
import com.bookstore.user.user.domain.exception.UserExceptionCode;
import com.bookstore.user.user.domain.repository.UserRepository;
import com.bookstore.user.user.infrastructure.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceApiV1Impl implements UserServiceApiV1 {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public void signUp(ReqUserPostSignupDtoApiV1 dto) {

        //1. 비밀번호 암호화
        String encrypted = passwordEncoder.encode(dto.getUser().getPassword());

        //2. dto -> entity
        UserEntity user = dto.createUser(); //정적 팩토리 메서드로 객체 생성
        user.encodePassword(encrypted);

        // 3. 저장 / 저장 시 중복 예외 발생 가능성에 대비 (동시성 대응)
        try {
            userRepository.save(user); //저장
        } catch (DataIntegrityViolationException e) {
            // DB의 unique 제약조건에 의한 예외 → 동시성 충돌
            log.warn("중복된 이메일로 인해 회원가입 실패: {}", user.getEmail());
            throw new CustomException(UserExceptionCode.DUPLICATE_EMAIL);
        }
    }

    @Override
    public ResTokenDtoApiV1 signIn(ReqUserPostSigninDtoApiV1 dto) {
        //1. 이메일로 사용자 조회
        UserEntity user = userRepository.findByEmail(dto.getUser().getEmail())
                .orElseThrow(() -> new CustomException(UserExceptionCode.NOT_FOUND_EMAIL));

        //2. 비밀번호 일치 확인
        if(!passwordEncoder.matches(dto.getUser().getPassword(), user.getPassword())){
            throw new CustomException(UserExceptionCode.INVALID_PASSWORD);
        }

        //3. jwt 토큰 확인하고 로그인 성공 후 반환
        //todo. 추후 확장성 고려 (String 타입-> Token 타입)
        String token = jwtUtil.generateToken(user.getEmail(), user.getUserRole());

        return ResTokenDtoApiV1.from(token);

    }
}
