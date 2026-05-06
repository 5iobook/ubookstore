import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Loading } from '@bookstore/common-ui';
import { fetchPostDetail, type Post } from '../api/postApi';

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  async function loadPost(postId: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPostDetail(postId);
      setPost(data);
    } catch (err) {
      console.error('게시글 상세 조회 실패:', err);
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Loading size="lg" text="게시글을 불러오는 중..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: 'var(--spacing-4)' }}>
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-lg)' }}>{error}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            목록으로
          </Button>
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: 'var(--spacing-4)' }}>
          <p>게시글을 찾을 수 없습니다.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            목록으로
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          }
        >
          목록으로
        </Button>
      </div>

      <Card>
        <header style={{ marginBottom: 'var(--spacing-6)' }}>
          <h1 style={{ margin: 0, fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
            게시글 상세
          </h1>
        </header>

        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>제목:</strong>
            <div style={{ marginTop: 'var(--spacing-1)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
              {post.title}
            </div>
          </div>

          <div>
            <strong style={{ color: 'var(--text-primary)' }}>내용:</strong>
            <div style={{ 
              marginTop: 'var(--spacing-2)', 
              padding: 'var(--spacing-4)', 
              backgroundColor: 'var(--background-secondary)', 
              borderRadius: 'var(--radius-base)',
              whiteSpace: 'pre-wrap',
              lineHeight: 'var(--line-height-relaxed)'
            }}>
              {post.content}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-3)' }}>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>가격:</strong>
              <div style={{ marginTop: 'var(--spacing-1)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-600)' }}>
                {post.price.amount.toLocaleString()} {post.price.currency}
              </div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)' }}>상품 상태:</strong>
              <div style={{ marginTop: 'var(--spacing-1)' }}>{post.condition}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)' }}>게시글 상태:</strong>
              <div style={{ marginTop: 'var(--spacing-1)' }}>{post.status}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)' }}>조회수:</strong>
              <div style={{ marginTop: 'var(--spacing-1)' }}>{post.viewCount}</div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)' }}>찜 수:</strong>
              <div style={{ marginTop: 'var(--spacing-1)' }}>{post.wishCount}</div>
            </div>
          </div>

          <div>
            <strong style={{ color: 'var(--text-primary)' }}>해시태그:</strong>
            <div style={{ marginTop: 'var(--spacing-2)', display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
              {post.hashtagList.map((tag, i) => (
                <span key={i} style={{ 
                  backgroundColor: 'var(--color-primary-50)', 
                  color: 'var(--color-primary-700)',
                  padding: 'var(--spacing-1) var(--spacing-3)', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default PostDetail;
