package com.bookstore.wish.application.service.v1;

import com.bookstore.common.application.exception.CustomException;
import com.bookstore.wish.application.dto.v1.response.ResWishPostDTOApiV1;
import com.bookstore.wish.application.exception.WishExceptionCode;
import com.bookstore.wish.domain.entity.WishEntity;
import com.bookstore.wish.domain.repository.WishRepository;
import com.bookstore.wish.infrastructure.client.PostFeignClientApiV1;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishServiceImplApiV1 implements WishServiceApiV1 {

    private final WishRepository wishRepository;
    private final PostFeignClientApiV1 postFeignClientApiV1;

    @Override
    @Transactional
    public ResWishPostDTOApiV1 postBy(UUID postId) {
        postFeignClientApiV1.existsBy(postId);

        if (wishRepository.existsByUserIdAndPostId(1L, postId)) {
            throw new CustomException(WishExceptionCode.ALREADY_WISHED);
        }
        WishEntity wishEntity = wishRepository.save(WishEntity.create(1L, postId));
        return ResWishPostDTOApiV1.of(wishEntity);
    }
}
