import { useState, useEffect } from 'react';
import { Container, Grid, PostCard, Loading, Button } from '@bookstore/common-ui';
import { fetchPostListPage, type Post } from '../api/postApi';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, [page]);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPostListPage(page, 10);
      setPosts(data.postPage.content);
      setTotalPages(data.postPage.page.totalPages);
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="post-list__loading"><Loading /></div>;
  if (error) return <Container><div className="post-list__error-message">{error}</div></Container>;

  return (
    <Container>
      <div className="post-list">
        <div className="post-list__header">
          <h2 className="post-list__title">게시글 목록</h2>
          <p className="post-list__subtitle">커뮤니티 게시글을 확인하세요</p>
        </div>
        
        <div className="post-list__grid">
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="1.5rem">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                title={post.title}
                price={`${post.price.amount.toLocaleString()} ${post.price.currency}`}
                condition={post.condition}
                viewCount={post.viewCount}
                wishCount={post.wishCount}
                hashtags={post.hashtagList.map(tag => tag.name)}
              />
            ))}
          </Grid>
        </div>

        <div className="post-list__pagination">
          <Button onClick={() => setPage(0)} disabled={page === 0} variant="secondary" size="small">
            처음
          </Button>
          <Button onClick={() => setPage(page - 1)} disabled={page === 0} variant="secondary" size="small">
            이전
          </Button>
          <div className="post-list__pagination-info">
            {page + 1} / {totalPages || 1}
          </div>
          <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} variant="secondary" size="small">
            다음
          </Button>
          <Button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} variant="secondary" size="small">
            마지막
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default PostList;
