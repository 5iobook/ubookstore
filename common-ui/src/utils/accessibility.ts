/**
 * Accessibility Utilities
 * 접근성 관련 유틸리티 함수 및 헬퍼
 */

/**
 * 포커스 가능한 요소 선택자
 */
export const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * 요소 내의 모든 포커스 가능한 요소를 가져옵니다
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));
}

/**
 * 포커스 트랩 - 모달이나 다이얼로그 내에서 포커스를 가둡니다
 */
export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}

/**
 * 스크린 리더 전용 텍스트를 위한 클래스 이름
 */
export const SR_ONLY_CLASS = 'sr-only';

/**
 * 키보드 이벤트가 액션 키인지 확인 (Enter 또는 Space)
 */
export function isActionKey(event: React.KeyboardEvent): boolean {
  return event.key === 'Enter' || event.key === ' ';
}

/**
 * 색상 대비율 계산 (WCAG 2.1 기준)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // RGB 값 추출 (간단한 hex 색상만 지원)
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // 상대 휘도 계산
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG AA 기준 충족 여부 확인
 */
export function meetsWCAGAA(contrastRatio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
}

/**
 * WCAG AAA 기준 충족 여부 확인
 */
export function meetsWCAGAAA(contrastRatio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
}

/**
 * 고유한 ID 생성 (접근성 레이블용)
 */
let idCounter = 0;
export function generateA11yId(prefix: string = 'a11y'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * 라이브 리전 알림 (스크린 리더용)
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = SR_ONLY_CLASS;
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // 메시지를 읽은 후 제거
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * 키보드 네비게이션 헬퍼 - 화살표 키로 목록 탐색
 */
export function handleArrowKeyNavigation(
  event: React.KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (newIndex: number) => void
): void {
  let newIndex = currentIndex;

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault();
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = items.length - 1;
      break;
    default:
      return;
  }

  onIndexChange(newIndex);
  items[newIndex]?.focus();
}

/**
 * 스킵 링크 생성 헬퍼
 */
export function createSkipLink(targetId: string, label: string): HTMLAnchorElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.className = 'skip-link';
  skipLink.textContent = label;
  return skipLink;
}

/**
 * 포커스 표시 스타일 적용 여부 확인
 */
export function shouldShowFocusRing(event: FocusEvent): boolean {
  // 마우스 클릭으로 인한 포커스는 링 표시 안 함
  return !(event.target as HTMLElement).matches(':focus:not(:focus-visible)');
}
