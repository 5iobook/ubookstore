# Domain-Specific Components

도메인 특화 컴포넌트는 MSA 백엔드의 각 서비스에 맞춘 특화된 UI 컴포넌트입니다.

## Components

### BookCard

책 정보를 표시하는 카드 컴포넌트입니다.

**Features:**
- 4:5 비율의 책 이미지
- 가격 및 상태 배지 표시
- 위시리스트 토글 기능
- 판매자 정보 및 별점 표시

**Usage:**
```tsx
import { BookCard } from '@/components/domain';

<BookCard
  id="book-1"
  title="클린 코드"
  author="로버트 C. 마틴"
  price={15000}
  condition="excellent"
  image="/images/book.jpg"
  seller={{
    name: "홍길동",
    rating: 5
  }}
  isWishlisted={false}
  onCardClick={() => console.log('Book clicked')}
  onWishlistToggle={() => console.log('Wishlist toggled')}
/>
```

### UserCard

사용자 프로필 정보를 표시하는 카드 컴포넌트입니다.

**Features:**
- 원형 프로필 아바타
- 사용자 정보 표시
- 통계 정보 (등록한 책, 판매한 책, 평점)
- Compact/Detailed 변형 지원

**Usage:**
```tsx
import { UserCard } from '@/components/domain';

<UserCard
  id="user-1"
  name="홍길동"
  email="hong@example.com"
  avatar="/images/avatar.jpg"
  bio="책을 사랑하는 독서가입니다."
  stats={{
    booksListed: 12,
    booksSold: 8,
    rating: 4.8
  }}
  variant="detailed"
  onCardClick={() => console.log('User clicked')}
/>
```

### PostCard

게시글을 표시하는 피드 형태의 카드 컴포넌트입니다.

**Features:**
- 작성자 정보 및 아바타
- 이미지 갤러리 (여러 이미지 지원)
- 좋아요/댓글 인터랙션
- 상대 시간 표시

**Usage:**
```tsx
import { PostCard } from '@/components/domain';

<PostCard
  id="post-1"
  author={{
    name: "홍길동",
    avatar: "/images/avatar.jpg"
  }}
  content="오늘 읽은 책이 정말 좋았어요!"
  images={["/images/post1.jpg", "/images/post2.jpg"]}
  timestamp={new Date()}
  likes={42}
  comments={5}
  isLiked={false}
  onLike={() => console.log('Liked')}
  onComment={() => console.log('Comment')}
  onCardClick={() => console.log('Post clicked')}
/>
```

### ChatBubble

채팅 메시지를 표시하는 말풍선 컴포넌트입니다.

**Features:**
- 메신저 스타일 말풍선
- 내/상대 메시지 구분
- 읽음 표시 (보냄/읽음)
- 시간 표시

**Usage:**
```tsx
import { ChatBubble } from '@/components/domain';

<ChatBubble
  message="안녕하세요! 책 상태가 어떤가요?"
  timestamp={new Date()}
  isMine={false}
  sender={{
    name: "홍길동",
    avatar: "/images/avatar.jpg"
  }}
  status="read"
/>
```

## Design Principles

1. **Service-Specific**: 각 MSA 서비스(User, Book, Post, Chat)에 최적화된 UI
2. **Consistent**: 공통 컴포넌트(Card, Button 등)를 기반으로 일관성 유지
3. **Responsive**: 모바일과 데스크톱 모두에서 최적화된 레이아웃
4. **Interactive**: 사용자 인터랙션에 즉각적인 피드백 제공

## Requirements Mapping

- **BookCard**: Requirements 7.2, 2.1
- **UserCard**: Requirements 7.1, 2.1
- **PostCard**: Requirements 7.3, 2.1
- **ChatBubble**: Requirements 7.4, 2.1
