package com.bookstore.post.post.application.service.v1;

import com.bookstore.post.post.application.dto.v1.request.ReqPostPostDTOApiV1;
import com.bookstore.post.post.application.dto.v1.request.ReqPostPutDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostGetByIdDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostGetDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostPostDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostPutDTOApiV1;
import com.querydsl.core.types.Predicate;
import java.util.UUID;
import org.springframework.data.domain.Pageable;

public interface PostServiceApiV1 {
    ResPostPostDTOApiV1 postBy(ReqPostPostDTOApiV1 dto, Long userId);

    ResPostGetByIdDTOApiV1 getBy(UUID id);

    ResPostGetDTOApiV1 getBy(Predicate predicate, Pageable pageable);

    ResPostPutDTOApiV1 putBy(UUID id, ReqPostPutDTOApiV1 dto, Long userId);

    void deleteBy(UUID id, Long userId);

    void existsBy(UUID id);

    void increaseWishCount(UUID id);

    void decreaseWishCount(UUID id);
}
