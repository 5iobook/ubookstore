import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/userApi';
import { Container, Card, Input, Button } from '@bookstore/common-ui';
import './SignupForm.css';

type PasswordStrength = 'weak' | 'medium' | 'strong';

function SignupForm() {
    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Field-specific errors
    const [userNameError, setUserNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    
    // Password strength
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);
    
    const navigate = useNavigate();

    const validateUserName = (value: string) => {
        if (!value) {
            setUserNameError('사용자명을 입력해주세요');
            return false;
        }
        if (value.length < 2) {
            setUserNameError('사용자명은 최소 2자 이상이어야 합니다');
            return false;
        }
        if (value.length > 20) {
            setUserNameError('사용자명은 최대 20자까지 가능합니다');
            return false;
        }
        setUserNameError('');
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

    const calculatePasswordStrength = (value: string): PasswordStrength => {
        let strength = 0;
        
        if (value.length >= 8) strength++;
        if (value.length >= 12) strength++;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;
        
        if (strength <= 2) return 'weak';
        if (strength <= 3) return 'medium';
        return 'strong';
    };

    const validatePassword = (value: string) => {
        if (!value) {
            setPasswordError('비밀번호를 입력해주세요');
            setPasswordStrength(null);
            return false;
        }
        if (value.length < 6) {
            setPasswordError('비밀번호는 최소 6자 이상이어야 합니다');
            setPasswordStrength(null);
            return false;
        }
        
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
        
        if (strength === 'weak') {
            setPasswordError('비밀번호 강도가 약합니다. 대소문자, 숫자, 특수문자를 조합해주세요');
            return true; // Still valid, just weak
        }
        
        setPasswordError('');
        return true;
    };

    const handleUserNameChange = (value: string) => {
        setUserName(value);
        if (userNameError) {
            validateUserName(value);
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (emailError) {
            validateEmail(value);
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        validatePassword(value);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        // Validate all required fields
        const isUserNameValid = validateUserName(userName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isUserNameValid || !isEmailValid || !isPasswordValid) {
            return;
        }

        setLoading(true);

        try {
            await signup({
                userName,
                nickName: nickName || userName,
                password,
                email,
                profile
            });
            navigate('/signin');
        } catch (err: any) {
            console.error('회원가입 실패:', err);
            setError(err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    }

    const getPasswordStrengthColor = () => {
        if (!passwordStrength) return '';
        switch (passwordStrength) {
            case 'weak': return 'var(--color-error)';
            case 'medium': return 'var(--color-warning)';
            case 'strong': return 'var(--color-success)';
        }
    };

    const getPasswordStrengthText = () => {
        if (!passwordStrength) return '';
        switch (passwordStrength) {
            case 'weak': return '약함';
            case 'medium': return '보통';
            case 'strong': return '강함';
        }
    };

    return (
        <Container maxWidth="sm" className="signup-form">
            <Card variant="elevated" padding="lg" className="signup-form__card">
                <div className="signup-form__header">
                    <h2 className="signup-form__title">회원가입</h2>
                    <p className="signup-form__subtitle">
                        새로운 계정을 만들어 중고책 거래를 시작하세요
                    </p>
                </div>

                {error && (
                    <div className="signup-form__error" role="alert">
                        <svg className="signup-form__error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="signup-form__form">
                    <div className="signup-form__field">
                        <Input
                            type="text"
                            label="사용자명"
                            value={userName}
                            onChange={handleUserNameChange}
                            onBlur={() => validateUserName(userName)}
                            error={userNameError}
                            success={userName.length >= 2 && !userNameError}
                            helperText="2-20자 사이로 입력해주세요"
                            required
                            maxLength={20}
                            autoComplete="username"
                        />
                    </div>

                    <div className="signup-form__field">
                        <Input
                            type="text"
                            label="닉네임"
                            value={nickName}
                            onChange={setNickName}
                            helperText="입력하지 않으면 사용자명이 사용됩니다"
                            maxLength={20}
                        />
                    </div>

                    <div className="signup-form__field">
                        <Input
                            type="email"
                            label="이메일"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => validateEmail(email)}
                            error={emailError}
                            success={email.length > 0 && !emailError}
                            helperText="로그인에 사용할 이메일을 입력하세요"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="signup-form__field">
                        <Input
                            type="password"
                            label="비밀번호"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            helperText="최소 6자 이상, 대소문자와 숫자를 포함하면 더 안전합니다"
                            required
                            autoComplete="new-password"
                        />
                        {passwordStrength && (
                            <div className="signup-form__password-strength">
                                <div className="signup-form__password-strength-bar">
                                    <div 
                                        className="signup-form__password-strength-fill"
                                        style={{
                                            width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
                                            backgroundColor: getPasswordStrengthColor()
                                        }}
                                    />
                                </div>
                                <span 
                                    className="signup-form__password-strength-text"
                                    style={{ color: getPasswordStrengthColor() }}
                                >
                                    비밀번호 강도: {getPasswordStrengthText()}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="signup-form__field">
                        <Input
                            type="text"
                            label="프로필"
                            value={profile}
                            onChange={setProfile}
                            helperText="자신을 소개하는 간단한 문구를 입력하세요 (선택사항)"
                            maxLength={200}
                        />
                    </div>

                    <div className="signup-form__actions">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading}
                        >
                            회원가입
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            fullWidth
                            onClick={() => navigate('/signin')}
                            disabled={loading}
                        >
                            이미 계정이 있으신가요? 로그인
                        </Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}

export default SignupForm;
