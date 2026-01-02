/**
 * Design Token System
 * 디자인 시스템의 핵심 토큰 정의
 */

export const theme = {
    colors: {
        // Primary - 따뜻한 세피아 브라운
        primary: {
            50: '#FFF8F0',
            100: '#FFEFD9',
            200: '#FFE0B8',
            300: '#FFCF94',
            400: '#FFB86C',
            500: '#FF9F43',  // Main
            600: '#E88A2E',
            700: '#C7741F',
            800: '#A05E14',
            900: '#7A480C',
        },
        // Secondary - 차분한 블루
        secondary: {
            50: '#F0F7FF',
            100: '#E0EFFF',
            200: '#B8DCFF',
            300: '#8AC5FF',
            400: '#5AADFF',
            500: '#3B95FF',  // Main
            600: '#2A7DE0',
            700: '#1D65C2',
            800: '#134FA3',
            900: '#0C3B85',
        },
        // Neutral - 그레이 스케일
        neutral: {
            0: '#FFFFFF',
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            1000: '#000000',
        },
        // Semantic Colors
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
    },

    typography: {
        fontFamily: {
            primary: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            mono: "'Fira Code', 'Courier New', monospace",
        },
        fontSize: {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem',// 30px
            '4xl': '2.25rem', // 36px
            '5xl': '3rem',    // 48px
        },
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
        },
    },

    spacing: {
        0: '0',
        1: '0.25rem',   // 4px
        2: '0.5rem',    // 8px
        3: '0.75rem',   // 12px
        4: '1rem',      // 16px
        5: '1.25rem',   // 20px
        6: '1.5rem',    // 24px
        8: '2rem',      // 32px
        10: '2.5rem',   // 40px
        12: '3rem',     // 48px
        16: '4rem',     // 64px
        20: '5rem',     // 80px
    },

    borderRadius: {
        none: '0',
        sm: '0.25rem',   // 4px
        base: '0.5rem',  // 8px
        md: '0.75rem',   // 12px
        lg: '1rem',      // 16px
        xl: '1.5rem',    // 24px
        full: '9999px',
    },

    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },

    breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    transitions: {
        fast: '150ms ease-in-out',
        base: '200ms ease-in-out',
        slow: '300ms ease-in-out',
    },
} as const;

// Dark mode color overrides
export const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        neutral: {
            0: '#000000',
            50: '#0A0A0A',
            100: '#1A1A1A',
            200: '#2A2A2A',
            300: '#3A3A3A',
            400: '#4A4A4A',
            500: '#6A6A6A',
            600: '#8A8A8A',
            700: '#AAAAAA',
            800: '#CACACA',
            900: '#EAEAEA',
            1000: '#FFFFFF',
        },
    },
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
