package com.bookstore.post.post.application.service.v2;

import com.bookstore.post.post.entity.v2.PostV2;
import com.bookstore.post.post.infrastructure.elasticsearch.v2.PostSearchV2Repository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.profiles.active=dev"
})
public class PostSearchV2ServiceTest {

    @Autowired(required = false)
    private PostSearchV2Service postSearchV2Service;

    @Autowired(required = false)
    private PostSearchV2Repository postSearchV2Repository;

    @Test
    void 엘라스틱서치_저장_및_검색_테스트() {
        // Elasticsearch가 비활성화된 경우 테스트 스킵
        if (postSearchV2Service == null || postSearchV2Repository == null) {
            System.out.println("Elasticsearch가 비활성화되어 테스트를 스킵합니다.");
            return;
        }

        // given
        PostV2 post = new PostV2(null, "테스트 제목", "테스트 내용", LocalDateTime.now());
        PostV2 saved = postSearchV2Repository.save(post);

        // when
        List<PostV2> result = postSearchV2Service.searchByTitle("테스트");

        // then
        assertThat(result).isNotEmpty();
        assertThat(result.get(0).getTitle()).contains("테스트");
    }
}