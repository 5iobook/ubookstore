import React from 'react';
import { Card } from '../../common/Card';
import { LazyImage } from '../../common/LazyImage';
import './BookCard.css';

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: 'excellent' | 'good' | 'fair';
  image?: string;
  seller: {
    name: string;
    rating: number;
  };
  onCardClick?: () => void;
  onWishlistToggle?: () => void;
  isWishlisted?: boolean;
}

const conditionLabels = {
  excellent: '새것같음',
  good: '좋음',
  fair: '보통',
};

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  price,
  condition,
  image,
  seller,
  onCardClick,
  onWishlistToggle,
  isWishlisted = false,
}) => {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle?.();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`book-card__star ${i < rating ? 'book-card__star--filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      hoverable
      clickable
      onClick={onCardClick}
      className="book-card"
      as="article"
      data-book-id={id}
    >
      <div className="book-card__image-container">
        {image ? (
          <LazyImage 
            src={image} 
            alt={title} 
            className="book-card__image"
            threshold={0.1}
            rootMargin="100px"
          />
        ) : (
          <div className="book-card__image-placeholder">
            <span className="book-card__image-icon">📚</span>
          </div>
        )}
        <button
          className={`book-card__wishlist ${isWishlisted ? 'book-card__wishlist--active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? '위시리스트에서 제거' : '위시리스트에 추가'}
        >
          <span className="book-card__wishlist-icon">
            {isWishlisted ? '❤️' : '🤍'}
          </span>
        </button>
        <span className={`book-card__condition book-card__condition--${condition}`}>
          {conditionLabels[condition]}
        </span>
      </div>
      
      <div className="book-card__content">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">{author}</p>
        
        <div className="book-card__price">
          {price.toLocaleString('ko-KR')}원
        </div>
        
        <div className="book-card__seller">
          <span className="book-card__seller-name">{seller.name}</span>
          <div className="book-card__rating">
            {renderStars(seller.rating)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
