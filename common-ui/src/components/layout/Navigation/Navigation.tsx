import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

interface NavigationProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
  title?: string;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
  authRequired?: boolean;
  external?: boolean;
}

// 전역 네비게이션 (모든 서비스 링크)
const globalNavItems: NavItem[] = [
  { path: 'http://localhost:5173', label: '사용자', icon: '👤', external: true },
  { path: 'http://localhost:5175', label: '게시글', icon: '📝', external: true },
  { path: 'http://localhost:5176', label: '도서', icon: '📚', external: true },
  { path: 'http://localhost:5177', label: '채팅', icon: '💬', external: true },
  { path: 'http://localhost:5174', label: '알림', icon: '🔔', external: true },
  { path: 'http://localhost:5178', label: '거래', icon: '💰', external: true },
  { path: 'http://localhost:5179', label: '위시', icon: '⭐', external: true },
  { path: 'http://localhost:5180', label: '설정', icon: '⚙️', external: true },
];

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated = false,
  title = '책거래'
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    // 외부 링크의 경우 현재 포트와 비교
    if (path.startsWith('http://localhost:')) {
      const currentPort = window.location.port;
      const linkPort = new URL(path).port;
      return currentPort === linkPort;
    }
    
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getVisibleNavItems = () => {
    if (isAuthenticated) {
      return globalNavItems;
    }
    return globalNavItems.filter(item => !item.authRequired);
  };

  const visibleItems = getVisibleNavItems();

  const renderNavLink = (item: NavItem) => {
    if (item.external) {
      return (
        <a
          key={item.path}
          href={item.path}
          className={styles.navItem}
          target="_self"
        >
          <span className={styles.navIcon} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.navLabel}>{item.label}</span>
        </a>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
        aria-current={isActive(item.path) ? 'page' : undefined}
      >
        <span className={styles.navIcon} aria-hidden="true">
          {item.icon}
        </span>
        <span className={styles.navLabel}>{item.label}</span>
      </Link>
    );
  };

  const renderDesktopNavLink = (item: NavItem) => {
    if (item.external) {
      return (
        <a
          key={item.path}
          href={item.path}
          className={styles.desktopNavItem}
          target="_self"
        >
          <span className={styles.navIcon} aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </a>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${styles.desktopNavItem} ${isActive(item.path) ? styles.active : ''}`}
        aria-current={isActive(item.path) ? 'page' : undefined}
      >
        <span className={styles.navIcon} aria-hidden="true">
          {item.icon}
        </span>
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Navigation - Bottom Tab Bar */}
      <nav className={`${styles.navigation} ${styles.mobile}`} aria-label="Mobile navigation">
        <div className={styles.navContainer}>
          {visibleItems.map((item) => renderNavLink(item))}
        </div>
      </nav>

      {/* Desktop Navigation - Top Header */}
      <nav className={`${styles.navigation} ${styles.desktop}`} aria-label="Main navigation">
        <div className={styles.desktopContainer}>
          <div className={styles.desktopLeft}>
            <a href="http://localhost:5173" className={styles.logo}>
              <span className={styles.logoIcon}>📚</span>
              <span className={styles.logoText}>{title}</span>
            </a>
            <div className={styles.desktopNav}>
              {visibleItems.map((item) => renderDesktopNavLink(item))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
