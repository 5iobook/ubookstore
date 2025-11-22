package com.bookstore.alert.application.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AlertRequest {
    private String userId;
    private String message;
    private String type;
}
