import React from 'react';
import { Card } from '../../common/Card';
import './UserCard.css';

export interface UserCardProps {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  stats?: {
    booksListed?: number;
    booksSold?: number;
    rating?: number;
  };
  onCardClick?: () => void;
  variant?: 'compact' | 'detailed';
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  avatar,
  bio,
  stats,
  onCardClick,
  variant = 'detailed',
}) => {
  const renderAvatar = () => {
    if (avatar) {
      return <img src={avatar} alt="" className="user-card__avatar-image" />;
    }
    
    const initial = name.charAt(0).toUpperCase();
    return (
      <div className="user-card__avatar-placeholder" aria-hidden="true">
        <span className="user-card__avatar-initial">{initial}</span>
      </div>
    );
  };

  const renderStats = () => {
    if (!stats || variant === 'compact') return null;

    return (
      <div className="user-card__stats" role="group" aria-label="사용자 통계">
        {stats.booksListed !== undefined && (
          <div className="user-card__stat">
            <span className="user-card__stat-value" aria-label={`등록한 책 ${stats.booksListed}권`}>
              {stats.booksListed}
            </span>
            <span className="user-card__stat-label" aria-hidden="true">등록한 책</span>
          </div>
        )}
        {stats.booksSold !== undefined && (
          <div className="user-card__stat">
            <span className="user-card__stat-value" aria-label={`판매한 책 ${stats.booksSold}권`}>
              {stats.booksSold}
            </span>
            <span className="user-card__stat-label" aria-hidden="true">판매한 책</span>
          </div>
        )}
        {stats.rating !== undefined && (
          <div className="user-card__stat">
            <span className="user-card__stat-value" aria-label={`평점 ${stats.rating.toFixed(1)}점`}>
              {stats.rating.toFixed(1)} <span aria-hidden="true">★</span>
            </span>
            <span className="user-card__stat-label" aria-hidden="true">평점</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card
      variant="elevated"
      padding={variant === 'compact' ? 'sm' : 'md'}
      hoverable
      clickable={!!onCardClick}
      onClick={onCardClick}
      className={`user-card user-card--${variant}`}
      as="article"
      data-user-id={id}
      aria-label={`${name}의 프로필 카드`}
    >
      <div className="user-card__header">
        <div className="user-card__avatar" role="img" aria-label={`${name}의 프로필 사진`}>
          {renderAvatar()}
        </div>
        
        <div className="user-card__info">
          <h3 className="user-card__name">{name}</h3>
          {email && variant === 'detailed' && (
            <p className="user-card__email">{email}</p>
          )}
        </div>
      </div>

      {bio && variant === 'detailed' && (
        <p className="user-card__bio">{bio}</p>
      )}

      {renderStats()}
    </Card>
  );
};

export default UserCard;
