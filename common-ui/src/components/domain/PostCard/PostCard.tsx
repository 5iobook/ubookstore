import React, { useState } from 'react';
import { Card } from '../../common/Card';
import './PostCard.css';

export interface PostCardProps {
  id?: string;
  title?: string;
  price?: string;
  condition?: string;
  viewCount?: number;
  wishCount?: number;
  hashtags?: string[];
  author?: {
    name: string;
    avatar?: string;
  };
  content?: string;
  images?: string[];
  timestamp?: Date;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onCardClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  price,
  condition,
  viewCount,
  wishCount,
  hashtags = [],
  author,
  content,
  images = [],
  timestamp,
  likes,
  comments,
  isLiked = false,
  onLike,
  onComment,
  onCardClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const renderAuthorAvatar = () => {
    if (!author) return null;

    if (author.avatar) {
      return <img src={author.avatar} alt={author.name} className="post-card__avatar-image" />;
    }

    const initial = author.name.charAt(0).toUpperCase();
    return (
      <div className="post-card__avatar-placeholder">
        <span className="post-card__avatar-initial">{initial}</span>
      </div>
    );
  };

  // 게시글 판매 카드 렌더링 (title, price가 있는 경우)
  if (title) {
    return (
      <Card
        variant="elevated"
        padding="md"
        hoverable
        clickable={!!onCardClick}
        onClick={onCardClick}
        className="post-card"
      >
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
        {price && <p style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>{price}</p>}
        {condition && <p style={{ margin: '0 0 0.5rem', color: 'var(--color-text-secondary)' }}>상태: {condition}</p>}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          {viewCount !== undefined && <span>👁️ {viewCount}</span>}
          {wishCount !== undefined && <span>❤️ {wishCount}</span>}
        </div>

        {hashtags.length > 0 && (
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {hashtags.map((tag, i) => (
              <span key={i} style={{
                background: 'var(--color-background-secondary)',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.85rem',
                color: 'var(--color-primary)'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    );
  }

  // 일반 포스트 카드 렌더링
  return (
    <Card
      variant="elevated"
      padding="none"
      hoverable
      clickable={!!onCardClick}
      onClick={onCardClick}
      className="post-card"
      as="article"
      data-post-id={id}
    >
      {/* Header */}
      {author && (
        <div className="post-card__header">
          <div className="post-card__avatar">
            {renderAuthorAvatar()}
          </div>
          <div className="post-card__author-info">
            <h3 className="post-card__author-name">{author.name}</h3>
            {timestamp && (
              <time className="post-card__timestamp" dateTime={timestamp.toISOString()}>
                {formatTimestamp(timestamp)}
              </time>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {content && (
        <div className="post-card__content">
          <p className="post-card__text">{content}</p>
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="post-card__gallery">
          <img
            src={images[currentImageIndex]}
            alt={`Post image ${currentImageIndex + 1}`}
            className="post-card__gallery-image"
          />

          {images.length > 1 && (
            <>
              <button
                className="post-card__gallery-nav post-card__gallery-nav--prev"
                onClick={handlePrevImage}
                aria-label="이전 이미지"
              >
                ‹
              </button>
              <button
                className="post-card__gallery-nav post-card__gallery-nav--next"
                onClick={handleNextImage}
                aria-label="다음 이미지"
              >
                ›
              </button>
              <div className="post-card__gallery-indicator">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Actions */}
      {(likes !== undefined || comments !== undefined) && (
        <div className="post-card__actions">
          {likes !== undefined && (
            <button
              className={`post-card__action ${isLiked ? 'post-card__action--active' : ''}`}
              onClick={handleLike}
              aria-label={isLiked ? '좋아요 취소' : '좋아요'}
            >
              <span className="post-card__action-icon">
                {isLiked ? '❤️' : '🤍'}
              </span>
              <span className="post-card__action-text">{likes}</span>
            </button>
          )}

          {comments !== undefined && (
            <button
              className="post-card__action"
              onClick={handleComment}
              aria-label="댓글"
            >
              <span className="post-card__action-icon">💬</span>
              <span className="post-card__action-text">{comments}</span>
            </button>
          )}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
