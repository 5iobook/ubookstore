package com.bookstore.post;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
	"com.bookstore.post",
	"com.bookstore.user.user.infrastructure.config" // JwtUtil, JwtAuthenticationFilter만 스캔
})
public class PostApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostApplication.class, args);
	}

}
