package com.bookstore.wish.infrastructure.client.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResPostGetByIdDTOApiV1 {
    private Post post;

    @Getter
    @Builder
    public static class Post {
        private String content;
        private String title;
        private Price price;
        private String status;
        private String condition;
        private int viewCount;
        private int wishCount;
        private List<Hashtag> hashtagList;

        @Getter
        @Builder
        public static class Hashtag {
            private String name;
        }

        @Getter
        @Builder
        public static class Price {
            private int amount;
        }
    }
}
