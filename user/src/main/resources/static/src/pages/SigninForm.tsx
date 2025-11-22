import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api/userApi';

function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const tokenData = await signin({
                username: email,
                password,
            });
            
            // 액세스 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', tokenData.accessToken);
            
            alert('로그인되었습니다.');
            navigate('/mypage');
            window.location.reload(); // 네비게이션 상태 업데이트를 위해 새로고침
        } catch (err: any) {
            console.error('로그인 실패:', err);
            setError(err.response?.data?.message || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>로그인</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <div className="form-row">
                    <label className="form-label">비밀번호:</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    style={{ marginLeft: 10 }}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default SigninForm;
