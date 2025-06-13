package com.bookstore.user.user.application.service.v1;

import com.bookstore.common.application.exception.CustomException;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.domain.entity.UserEntity;
import com.bookstore.user.user.domain.exception.UserExceptionCode;
import com.bookstore.user.user.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSeriviceApiV1Impl implements UserServiceApiV1 {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(ReqUserPostSignupDtoApiV1 dto) {
        //1. 이메일 중복 확인
        if(userRepository.existsByEmail(dto.getUser().getEmail())){
            throw new CustomException(UserExceptionCode.DUPLICATE_EMAIL);
        }
        //2. 비밀번호 암호화
        String encrypted = passwordEncoder.encode(dto.getUser().getPassword());

        //3. dto -> entity
        UserEntity user = dto.createUser(); //정적 팩토리 메서드로 객체 생성
        user.encodePassword(encrypted);

        //4. 저장
        userRepository.save(user);
    }
}
