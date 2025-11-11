import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/userApi';

function UserForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createUser({ username, email });
            alert('사용자가 등록되었습니다.');
            navigate('/');
        } catch (err) {
            console.error('사용자 등록 실패:', err);
            setError('사용자 등록에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>사용자 등록</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-label">사용자명:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="사용자명을 입력하세요"
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="form-label">이메일:</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '등록 중...' : '등록'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    style={{ marginLeft: 10 }}
                >
                    취소
                </button>
            </form>
        </div>
    );
}

export default UserForm;
