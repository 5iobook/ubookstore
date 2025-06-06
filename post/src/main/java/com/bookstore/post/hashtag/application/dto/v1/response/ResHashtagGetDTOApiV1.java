package com.bookstore.post.hashtag.application.dto.v1.response;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PagedModel;

@Getter
@Builder
public class ResHashtagGetDTOApiV1 {
    private HashtagPage hashtagPage;

    public static ResHashtagGetDTOApiV1 of(
        Page<HashtagEntity> hashtagEntityPage
    ) {
        return ResHashtagGetDTOApiV1.builder()
            .hashtagPage(new HashtagPage(hashtagEntityPage))
            .build();
    }

    @Getter
    public static class HashtagPage extends PagedModel<HashtagPage.Hashtag> {
        public HashtagPage(Page<HashtagEntity> hashtagEntityPage) {
            super(
                new PageImpl<>(
                    Hashtag.from(hashtagEntityPage.getContent()),
                    hashtagEntityPage.getPageable(),
                    hashtagEntityPage.getTotalElements()
                )
            );
        }

        @Getter
        @Builder
        public static class Hashtag {
            private String name;

            public static List<Hashtag> from(List<HashtagEntity> hashtagEntityList) {
                return hashtagEntityList.stream()
                    .map(Hashtag::from)
                    .toList();
            }

            public static Hashtag from(HashtagEntity hashtagEntity) {
                return Hashtag.builder()
                    .name(hashtagEntity.getName())
                    .build();
            }
        }
    }
}
