import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api/userApi';
import { Container, Card, Input, Button } from '@bookstore/common-ui';
import './SigninForm.css';

function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const navigate = useNavigate();

    const validateEmail = (value: string) => {
        if (!value) {
            setEmailError('이메일을 입력해주세요');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('올바른 이메일 형식이 아닙니다');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (value: string) => {
        if (!value) {
            setPasswordError('비밀번호를 입력해주세요');
            return false;
        }
        if (value.length < 6) {
            setPasswordError('비밀번호는 최소 6자 이상이어야 합니다');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (emailError) {
            validateEmail(value);
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (passwordError) {
            validatePassword(value);
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        // Validate all fields
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setLoading(true);

        try {
            const tokenData = await signin({
                email,
                password,
            });
            
            // 액세스 토큰을 로컬 스토리지에 저장
            if (tokenData?.accessToken) {
                localStorage.setItem('accessToken', tokenData.accessToken);
            }
            
            navigate('/');
        } catch (err: any) {
            console.error('로그인 실패:', err);
            setError(err.response?.data?.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm" className="signin-form">
            <Card variant="elevated" padding="lg" className="signin-form__card">
                <div className="signin-form__header">
                    <h2 className="signin-form__title">로그인</h2>
                    <p className="signin-form__subtitle">
                        중고책거래 플랫폼에 오신 것을 환영합니다
                    </p>
                </div>

                {error && (
                    <div className="signin-form__error" role="alert">
                        <svg className="signin-form__error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="signin-form__form">
                    <div className="signin-form__field">
                        <Input
                            type="email"
                            label="이메일"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => validateEmail(email)}
                            error={emailError}
                            helperText="로그인에 사용할 이메일을 입력하세요"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="signin-form__field">
                        <Input
                            type="password"
                            label="비밀번호"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => validatePassword(password)}
                            error={passwordError}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="signin-form__actions">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading}
                        >
                            로그인
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            fullWidth
                            onClick={() => navigate('/signup')}
                            disabled={loading}
                        >
                            회원가입
                        </Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}

export default SigninForm;
