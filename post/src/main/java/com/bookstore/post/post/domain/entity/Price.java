package com.bookstore.post.post.domain.entity;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Price {
    private int amount;

    public Price(int amount) {
        if (amount < 0) throw new IllegalArgumentException("가격은 음수일 수 없습니다.");
        this.amount = amount;
    }

}
