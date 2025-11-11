import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postApi';

function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !authorId.trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await createPost({ title, content, authorId });
      alert('게시글이 작성되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('게시글 작성 실패:', err);
      setError('게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>게시글 작성</h2>
      
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ 
        background: '#fff', 
        padding: 24, 
        borderRadius: 8, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="게시글 제목을 입력하세요"
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 내용을 입력하세요"
            rows={10}
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            작성자 ID
          </label>
          <input
            type="text"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            placeholder="작성자 ID를 입력하세요"
            required
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" disabled={loading}>
            {loading ? '작성 중...' : '작성하기'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            style={{ background: '#757575' }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
