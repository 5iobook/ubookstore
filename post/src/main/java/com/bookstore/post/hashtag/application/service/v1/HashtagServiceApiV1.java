package com.bookstore.post.hashtag.application.service.v1;

import com.bookstore.post.hashtag.application.dto.v1.request.ReqHashtagPostDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.request.ReqHashtagPutDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagGetByIdDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagGetDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagPostDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagPutDTOApiV1;
import com.querydsl.core.types.Predicate;
import java.util.UUID;
import org.springframework.data.domain.Pageable;

public interface HashtagServiceApiV1 {
    ResHashtagPostDTOApiV1 postBy(ReqHashtagPostDTOApiV1 dto);

    ResHashtagGetByIdDTOApiV1 getBy(UUID id);

    ResHashtagGetDTOApiV1 getBy(Predicate predicate, Pageable pageable);

    ResHashtagPutDTOApiV1 putBy(UUID id, ReqHashtagPutDTOApiV1 dto);
}
