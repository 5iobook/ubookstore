package com.bookstore.user.user.application.service.v1;

import com.bookstore.common.application.exception.CustomException;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPatchNicknameDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSigninDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResMyuserInfoDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResTokenDtoApiV1;
import com.bookstore.user.user.domain.entity.RefreshTokenEntity;
import com.bookstore.user.user.domain.entity.UserEntity;
import com.bookstore.user.user.domain.exception.UserExceptionCode;
import com.bookstore.user.user.domain.repository.RefreshTokenRepository;
import com.bookstore.user.user.domain.repository.UserRepository;
import com.bookstore.user.user.infrastructure.config.JwtUtil;
import jakarta.persistence.OptimisticLockException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;
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
    private final RefreshTokenRepository refreshTokenRepository;
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

        log.info("로그인_서비스: 비밀번호 일치 완");
        //3. jwt 토큰 확인하고 로그인 성공 후 반환
        //todo. 추후 확장성 고려 (String 타입-> Token 타입)
        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getUserRole());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getUserRole());

        Date expirationDate = jwtUtil.parseToken(refreshToken).getExpiration();

        LocalDateTime expiresAt = expirationDate.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        RefreshTokenEntity tokenEntity = refreshTokenRepository.findByUser_Email(user.getEmail())
                .map(existing -> existing.updateToken(refreshToken))
                .orElse(RefreshTokenEntity.of(user, refreshToken, expiresAt));

        refreshTokenRepository.save(tokenEntity);

        return ResTokenDtoApiV1.from(accessToken, refreshToken);

    }

    @Override
    public ResMyuserInfoDtoApiV1 getUserInfo(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new CustomException(UserExceptionCode.NOT_FOUND_USER));
        ResMyuserInfoDtoApiV1 resDto = ResMyuserInfoDtoApiV1.builder()
                .user(ResMyuserInfoDtoApiV1.User.builder()
                        .id(user.getId())
                        .userName(user.getUserName())
                        .email(user.getEmail())
                        .profile(user.getProfile())
                        .nickName(user.getNickName())
                        .build())
                .build();
        return resDto;
    }
<<<<<<< HEAD

    @Override
    public ResTokenDtoApiV1 reIssueToken(String refreshToken) {

        RefreshTokenEntity saveRefreshtoken = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new CustomException(UserExceptionCode.TOKEN_EXPIRED));

        //db에 있는 토큰과 일치하는지 확인
        if(!Objects.equals(refreshToken, saveRefreshtoken.getToken())){
            throw new CustomException(UserExceptionCode.TOKEN_EXPIRED);
        }
        //리프레시토큰 검증
        if(saveRefreshtoken.isExpired()){
            throw new CustomException(UserExceptionCode.TOKEN_EXPIRED);
        }
        //새 엑세스토큰 발급해서 반환
        UserEntity user = saveRefreshtoken.getUser();
        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getUserRole());
        return ResTokenDtoApiV1.from(accessToken, null);
    }

    @Override
    public ResMyuserInfoDtoApiV1 updateNickname(Long userId, ReqUserPatchNicknameDtoApiV1 reqDto) {

        //예외처리
        try {
            UserEntity user = userRepository.findById(userId).orElseThrow(() -> new CustomException(UserExceptionCode.NOT_FOUND_USER));
            user.updateNickName(reqDto.getUser().getNickname());
            userRepository.save(user); //저장 강제실행
            userRepository.flush();    //db에 즉시 반영
            ResMyuserInfoDtoApiV1 resDto = ResMyuserInfoDtoApiV1.builder()
                    .user(ResMyuserInfoDtoApiV1.User.builder()
                            .userName(user.getUserName())
                            .email(user.getEmail())
                            .profile(user.getProfile())
                            .nickName(user.getNickName())
                            .build())
                    .build();
            return resDto;
        }catch (OptimisticLockException e){
            log.info("낙관적 락 충돌 발생");
            throw new CustomException(UserExceptionCode.LOCK_CONFLICT);
        }
=======
    
    @Override
    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<ResMyuserInfoDtoApiV1> getUserList(org.springframework.data.domain.Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> ResMyuserInfoDtoApiV1.builder()
                        .user(ResMyuserInfoDtoApiV1.User.builder()
                                .id(user.getId())
                                .userName(user.getUserName())
                                .email(user.getEmail())
                                .profile(user.getProfile())
                                .nickName(user.getNickName())
                                .build())
                        .build());
>>>>>>> origin/dev
    }
}
