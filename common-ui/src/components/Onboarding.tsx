import React, { useState } from 'react';
import { Button, Card } from '../index';

interface OnboardingSlide {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
}

interface OnboardingProps {
    onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides: OnboardingSlide[] = [
        {
            id: 1,
            title: "📚 도서 관리 시스템에 오신 것을 환영합니다!",
            description: "다양한 도서 관련 서비스를 한 곳에서 이용하세요",
            icon: "🎉",
            features: [
                "도서 검색 및 관리",
                "위시리스트 작성",
                "중고 도서 거래",
                "커뮤니티 참여"
            ]
        },
        {
            id: 2,
            title: "🔍 도서 검색 & 관리",
            description: "네이버 API를 통한 실시간 도서 검색과 개인 도서 관리",
            icon: "📖",
            features: [
                "실시간 도서 검색",
                "내 도서 컬렉션 관리",
                "도서 정보 상세 보기",
                "간편한 체크박스 추가/삭제"
            ]
        },
        {
            id: 3,
            title: "💝 위시리스트 & 거래",
            description: "관심 도서를 저장하고 다른 사용자와 거래하세요",
            icon: "🤝",
            features: [
                "관심 도서 위시리스트 작성",
                "중고 도서 판매/구매",
                "실시간 채팅으로 소통",
                "커뮤니티 게시글 작성"
            ]
        }
    ];

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onComplete();
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const skipOnboarding = () => {
        onComplete();
    };

    const slide = slides[currentSlide];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: 'var(--spacing-4)'
        }}>
            <Card style={{
                maxWidth: '500px',
                width: '100%',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative'
            }}>
                {/* Skip 버튼 */}
                <button
                    onClick={skipOnboarding}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-tertiary)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    건너뛰기
                </button>

                {/* 슬라이드 인디케이터 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: '2rem'
                }}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: index === currentSlide
                                    ? 'var(--color-primary-500)'
                                    : 'var(--color-neutral-300)',
                                transition: 'background-color var(--transition-fast)'
                            }}
                        />
                    ))}
                </div>

                {/* 아이콘 */}
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem'
                }}>
                    {slide.icon}
                </div>

                {/* 제목 */}
                <h2 style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    lineHeight: 'var(--line-height-tight)'
                }}>
                    {slide.title}
                </h2>

                {/* 설명 */}
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    lineHeight: 'var(--line-height-normal)'
                }}>
                    {slide.description}
                </p>

                {/* 기능 목록 */}
                <div style={{
                    marginBottom: '2rem'
                }}>
                    {slide.features.map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: 'var(--spacing-3)',
                                padding: 'var(--spacing-2) 0',
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            <span style={{
                                color: 'var(--color-primary-500)',
                                fontWeight: 'var(--font-weight-bold)'
                            }}>
                                ✓
                            </span>
                            {feature}
                        </div>
                    ))}
                </div>

                {/* 네비게이션 버튼 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--spacing-3)'
                }}>
                    <Button
                        variant="outline"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        style={{
                            opacity: currentSlide === 0 ? 0.5 : 1
                        }}
                    >
                        이전
                    </Button>

                    <span style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--text-tertiary)'
                    }}>
                        {currentSlide + 1} / {slides.length}
                    </span>

                    <Button
                        variant="primary"
                        onClick={nextSlide}
                    >
                        {currentSlide === slides.length - 1 ? '시작하기' : '다음'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Onboarding;