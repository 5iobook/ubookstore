import { useState, useEffect } from 'react';

import { Container, Button, Loading, Pagination } from '@bookstore/common-ui';

import { fetchPostListPage, type Post } from '../api/postApi';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const size = 10;

  useEffect(() => {
    loadPosts();
  }, [page]);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPostListPage(page, size);
      setPosts(data.postPage.content);
      setTotalPages(data.postPage.page.totalPages);
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }


  return (
    <Container maxWidth="xl" className="post-list">
      <header className="post-list__header">
        <h1 className="post-list__title">게시글 목록</h1>
        <p className="post-list__subtitle" aria-live="polite">
          총 {totalPages > 0 ? (totalPages - 1) * size + posts.length : 0}개의 게시글
        </p>
      </header>

      {loading && (
        <div className="post-list__loading" role="status" aria-live="polite">
          <Loading size="lg" text="게시글 목록을 불러오는 중.." />
        </div>
      )}

      {error && (
        <div className="post-list__error" role="alert" aria-live="assertive">
          <p className="post-list__error-message">{error}</p>
          <Button variant="primary" onClick={loadPosts}>
            다시 시도
          </Button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="post-list__empty" role="status">
          <p>등록된 게시글이 없습니다.</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <section aria-label="게시글 목록 테이블" className="post-list__table">
            <table>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>가격</th>
                  <th>상태</th>
                  <th>조회수</th>
                  <th>관심수</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td className="post-title">
                      {post.title}
                      {post.hashtagList && post.hashtagList.length > 0 && (
                        <div className="post-hashtags">
                          {post.hashtagList.map((tag, tagIndex) => (
                            <span key={tagIndex} className="hashtag">
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="post-price">
                      {post.price?.amount ?
                        `${post.price.amount.toLocaleString()}${post.price.currency || '원'}` :
                        '가격미정'
                      }
                    </td>
                    <td>
                      <span className={`status-badge status-${post.status?.toLowerCase() || 'unknown'}`}>
                        {post.status || '상태 미정'}
                      </span>
                    </td>
                    <td>{post.viewCount || 0}</td>
                    <td>{post.wishCount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <Pagination
            currentPage={page + 1}
            totalPages={totalPages}
            totalItems={totalPages > 0 ? (totalPages - 1) * size + posts.length : 0}
            itemsPerPage={size}
            onPageChange={(newPage) => setPage(newPage - 1)}
            showInfo={true}
          />
        </>
      )}

    </Container>
  );
}

export default PostList;
