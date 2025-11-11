import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  if (loading) return <div style={{ padding: 20 }}>로딩 중...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
  if (!post) return <div style={{ padding: 20 }}>게시글을 찾을 수 없습니다.</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>게시글 상세</h2>
      
      <div style={{ 
        background: '#fff', 
        padding: 24, 
        borderRadius: 8, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: 20
      }}>
        <div style={{ marginBottom: 16 }}>
          <strong>제목:</strong> {post.title}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>내용:</strong>
          <div style={{ 
            marginTop: 8, 
            padding: 16, 
            background: '#f9fafb', 
            borderRadius: 4,
            whiteSpace: 'pre-wrap'
          }}>
            {post.content}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>가격:</strong> {post.price.amount.toLocaleString()} {post.price.currency}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>상품 상태:</strong> {post.condition}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>게시글 상태:</strong> {post.status}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>조회수:</strong> {post.viewCount}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>찜 수:</strong> {post.wishCount}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>해시태그:</strong>
          <div style={{ marginTop: 8 }}>
            {post.hashtagList.map((tag, i) => (
              <span key={i} style={{ 
                background: '#e3f2fd', 
                padding: '4px 12px', 
                borderRadius: 4, 
                marginRight: 8,
                display: 'inline-block',
                marginBottom: 4
              }}>
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/')}>
        목록으로 돌아가기
      </button>
    </div>
  );
}

export default PostDetail;
