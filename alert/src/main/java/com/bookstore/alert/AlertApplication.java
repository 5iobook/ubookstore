package com.bookstore.alert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
public class AlertApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlertApplication.class, args);
	}

}
