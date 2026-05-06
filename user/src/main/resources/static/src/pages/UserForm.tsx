import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/userApi';
import { Container, Card, Input, Button } from '@bookstore/common-ui';
import './UserForm.css';

function UserForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const navigate = useNavigate();

    const validateUsername = (value: string) => {
        if (!value) {
            setUsernameError('사용자명을 입력해주세요');
            return false;
        }
        if (value.length < 2) {
            setUsernameError('사용자명은 최소 2자 이상이어야 합니다');
            return false;
        }
        setUsernameError('');
        return true;
    };

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

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        if (usernameError) {
            validateUsername(value);
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (emailError) {
            validateEmail(value);
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const isUsernameValid = validateUsername(username);
        const isEmailValid = validateEmail(email);

        if (!isUsernameValid || !isEmailValid) {
            return;
        }

        setLoading(true);

        try {
            await createUser({ username, email });
            navigate('/');
        } catch (err: any) {
            console.error('사용자 등록 실패:', err);
            setError(err.response?.data?.message || '사용자 등록에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm" className="user-form">
            <Card variant="elevated" padding="lg" className="user-form__card">
                <div className="user-form__header">
                    <h2 className="user-form__title">사용자 등록</h2>
                    <p className="user-form__subtitle">
                        새로운 사용자 정보를 입력하세요
                    </p>
                </div>

                {error && (
                    <div className="user-form__error" role="alert">
                        <svg className="user-form__error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="user-form__form">
                    <div className="user-form__field">
                        <Input
                            type="text"
                            label="사용자명"
                            value={username}
                            onChange={handleUsernameChange}
                            onBlur={() => validateUsername(username)}
                            error={usernameError}
                            success={username.length >= 2 && !usernameError}
                            helperText="최소 2자 이상 입력해주세요"
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="user-form__field">
                        <Input
                            type="email"
                            label="이메일"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => validateEmail(email)}
                            error={emailError}
                            success={email.length > 0 && !emailError}
                            helperText="사용자의 이메일 주소를 입력하세요"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="user-form__actions">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading}
                        >
                            등록
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            fullWidth
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            취소
                        </Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}

export default UserForm;
