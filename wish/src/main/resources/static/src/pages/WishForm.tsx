import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWish } from '../api/wishApi';

function WishForm() {
    const [postId, setPostId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createWish(postId);
            alert('위시리스트에 추가되었습니다.');
            navigate('/');
        } catch (err) {
            console.error('위시리스트 추가 실패:', err);
            setError('위시리스트 추가에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>위시리스트 추가</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-label">게시글 ID (UUID):</label>
                    <input
                        className="form-input"
                        type="text"
                        value={postId}
                        onChange={(e) => setPostId(e.target.value)}
                        placeholder="예: 550e8400-e29b-41d4-a716-446655440000"
                        required
                    />
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-4)' }}>
                    <button type="submit" disabled={loading}>
                        {loading ? '추가 중...' : '위시리스트 추가'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WishForm;
