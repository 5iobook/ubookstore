import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, fetchHashtagList, createHashtag, type HashtagItem } from '../api/postApi';

function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('NEW');
  const [hashtags, setHashtags] = useState<HashtagItem[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newHashtagName, setNewHashtagName] = useState('');
  const [showHashtagInput, setShowHashtagInput] = useState(false);

  useEffect(() => {
    loadHashtags();
  }, []);

  async function loadHashtags() {
    try {
      const data = await fetchHashtagList(0, 100);
      setHashtags(data.hashtagPage.content);
    } catch (err) {
      console.error('해시태그 목록 조회 실패:', err);
    }
  }

  function toggleHashtag(hashtagId: string) {
    setSelectedHashtags(prev => 
      prev.includes(hashtagId) 
        ? prev.filter(id => id !== hashtagId)
        : [...prev, hashtagId]
    );
  }

  async function handleCreateHashtag() {
    if (!newHashtagName.trim()) {
      alert('해시태그 이름을 입력하세요.');
      return;
    }

    try {
      const newHashtag = await createHashtag(newHashtagName.trim());
      await loadHashtags(); // 목록 새로고침
      setNewHashtagName('');
      setShowHashtagInput(false);
      alert(`해시태그 #${newHashtag.name}이(가) 생성되었습니다.`);
    } catch (err) {
      console.error('해시태그 생성 실패:', err);
      alert('해시태그 생성에 실패했습니다.');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !price || selectedHashtags.length === 0) {
      setError('모든 필드를 입력하고 최소 1개의 해시태그를 선택해주세요.');
      return;
    }

    const priceNum = parseInt(price);
    if (isNaN(priceNum) || priceNum < 1) {
      setError('가격은 1 이상의 숫자여야 합니다.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await createPost({
        post: {
          title,
          content,
          price: priceNum,
          condition,
          hashtagList: selectedHashtags.map(id => ({ hashtagId: id }))
        }
      });
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
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
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
            가격
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력하세요"
            min="1"
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            상품 상태
          </label>
          <select 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px',
              border: '1px solid #cfd8dc',
              borderRadius: 6,
              background: '#f9fafb'
            }}
          >
            <option value="NEW">새 상품</option>
            <option value="LIKE_NEW">거의 새 것</option>
            <option value="GOOD">좋음</option>
            <option value="FAIR">보통</option>
            <option value="POOR">나쁨</option>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontWeight: 500 }}>
              해시태그 선택 (최소 1개)
            </label>
            <button
              type="button"
              onClick={() => setShowHashtagInput(!showHashtagInput)}
              style={{
                background: '#4caf50',
                padding: '4px 12px',
                fontSize: '0.85rem',
                marginTop: 0
              }}
            >
              {showHashtagInput ? '취소' : '+ 새 해시태그'}
            </button>
          </div>

          {showHashtagInput && (
            <div style={{ 
              marginBottom: 12, 
              padding: 12, 
              background: '#e8f5e9', 
              borderRadius: 6,
              display: 'flex',
              gap: 8
            }}>
              <input
                type="text"
                value={newHashtagName}
                onChange={(e) => setNewHashtagName(e.target.value)}
                placeholder="새 해시태그 이름 (예: 소설, 과학)"
                style={{ flex: 1, marginBottom: 0 }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateHashtag();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleCreateHashtag}
                style={{
                  background: '#4caf50',
                  padding: '8px 16px',
                  marginTop: 0
                }}
              >
                생성
              </button>
            </div>
          )}

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 8,
            padding: 12,
            background: '#f9fafb',
            borderRadius: 6,
            border: '1px solid #cfd8dc',
            minHeight: 60
          }}>
            {hashtags.length === 0 ? (
              <div style={{ color: '#999', fontSize: '0.9rem', padding: 8 }}>
                해시태그가 없습니다. 새 해시태그를 생성해주세요.
              </div>
            ) : (
              hashtags.map(tag => (
                <label 
                  key={tag.id}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    background: selectedHashtags.includes(tag.id) ? '#e3f2fd' : '#fff',
                    border: selectedHashtags.includes(tag.id) ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedHashtags.includes(tag.id)}
                    onChange={() => toggleHashtag(tag.id)}
                    style={{ marginRight: 6 }}
                  />
                  #{tag.name}
                </label>
              ))
            )}
          </div>
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
