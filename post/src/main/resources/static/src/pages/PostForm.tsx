import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Loading } from '@bookstore/common-ui';
import { createPost, fetchHashtagList, createHashtag, type HashtagItem } from '../api/postApi';
import './PostForm.css';

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
      setError('해시태그 이름을 입력하세요.');
      return;
    }

    try {
      await createHashtag(newHashtagName.trim());
      await loadHashtags(); // 목록 새로고침
      setNewHashtagName('');
      setShowHashtagInput(false);
      setError(null);
    } catch (err) {
      console.error('해시태그 생성 실패:', err);
      setError('해시태그 생성에 실패했습니다.');
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
      navigate('/');
    } catch (err) {
      console.error('게시글 작성 실패:', err);
      setError('게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" className="post-form">
      <header className="post-form__header">
        <h1 className="post-form__title">게시글 작성</h1>
        <p className="post-form__subtitle">새로운 게시글을 작성해보세요</p>
      </header>

      {error && (
        <div className="post-form__error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="post-form__form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            id="title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="게시글 제목을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 내용을 입력하세요"
            rows={10}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">가격</label>
          <input
            id="price"
            type="number"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력하세요"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition" className="form-label">상품 상태</label>
          <select 
            id="condition"
            className="form-select"
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="NEW">새 상품</option>
            <option value="LIKE_NEW">거의 새 것</option>
            <option value="GOOD">좋음</option>
            <option value="FAIR">보통</option>
            <option value="POOR">나쁨</option>
          </select>
        </div>

        <div className="form-group">
          <div className="hashtag-header">
            <label className="form-label">해시태그 선택 (최소 1개)</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowHashtagInput(!showHashtagInput)}
            >
              {showHashtagInput ? '취소' : '+ 새 해시태그'}
            </Button>
          </div>

          {showHashtagInput && (
            <div className="hashtag-create">
              <input
                type="text"
                className="form-input"
                value={newHashtagName}
                onChange={(e) => setNewHashtagName(e.target.value)}
                placeholder="새 해시태그 이름 (예: 소설, 과학)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateHashtag();
                  }
                }}
              />
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleCreateHashtag}
              >
                생성
              </Button>
            </div>
          )}

          <div className="hashtag-list">
            {hashtags.length === 0 ? (
              <div className="hashtag-empty">
                해시태그가 없습니다. 새 해시태그를 생성해주세요.
              </div>
            ) : (
              hashtags.map(tag => (
                <label 
                  key={tag.id}
                  className={`hashtag-item ${selectedHashtags.includes(tag.id) ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedHashtags.includes(tag.id)}
                    onChange={() => toggleHashtag(tag.id)}
                  />
                  #{tag.name}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? <Loading size="sm" text="작성 중..." /> : '작성하기'}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/')}
          >
            취소
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default PostForm;
