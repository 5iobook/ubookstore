import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/userApi';

function SignupForm() {
    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signup({
                user: {
                    userName,
                    nickName: nickName || undefined,
                    password,
                    email,
                    profile: profile || undefined,
                }
            });
            alert('회원가입이 완료되었습니다.');
            navigate('/');
        } catch (err: any) {
            console.error('회원가입 실패:', err);
            setError(err.response?.data?.message || '회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>회원가입</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-label">사용자명 *:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="사용자명을 입력하세요"
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="form-label">닉네임:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        placeholder="닉네임을 입력하세요"
                    />
                </div>
                <div className="form-row">
                    <label className="form-label">비밀번호 *:</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="form-label">이메일 *:</label>
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
                    <label className="form-label">프로필:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        placeholder="프로필 정보를 입력하세요"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '가입 중...' : '회원가입'}
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

export default SignupForm;
