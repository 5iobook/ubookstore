package com.bookstore.trade.domain.trade.entity;

import com.bookstore.trade.domain.trade.vo.TradeMethod;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "p_trade")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TradeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	@Column(name= "buyer_id", nullable = false)
	private UUID buyerId;
	@Column(name= "seller_id", nullable = false)
	private UUID sellerId;
	@Column(name= "post_id", nullable = false)
	private UUID postId;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TradeStatus status; // REQUESTED, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELED, nullable = false
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TradeMethod method; // DIRECT, DELIVERY, nullable = false
	@Column(name= "meet_up_location", columnDefinition = "TEXT")
	private String meetUpLocation; // 거래 장소 nullable = false
	@Column(name= "cancel_reason", columnDefinition = "TEXT")
	private String cancelReason;
	@Column(name= "completed_at")
	private LocalDateTime completedAt; // 거래 완료 시간

	public void updateStatus(TradeStatus status) {
		this.status = status;
	}
}
