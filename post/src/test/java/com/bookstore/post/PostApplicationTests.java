package com.bookstore.post;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.profiles.active=dev"
})
class PostApplicationTests {

	@Test
	void contextLoads() {
	}

}
