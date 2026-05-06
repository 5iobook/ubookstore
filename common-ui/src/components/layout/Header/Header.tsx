import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <Link to="/" className={styles.brand} aria-label="책거래 홈으로 이동">
          <span className={styles.brandIcon} aria-hidden="true">📚</span>
          <span className={styles.brandText}>책거래</span>
        </Link>

        <div className={styles.actions}>
          {isAuthenticated && user ? (
            <div className={styles.userSection} ref={dropdownRef}>
              <button
                className={styles.userButton}
                onClick={toggleDropdown}
                onKeyDown={handleDropdownKeyDown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                aria-label={`사용자 메뉴: ${user.name}`}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className={styles.avatar} />
                ) : (
                  <div className={styles.avatarPlaceholder} aria-hidden="true">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.dropdownIcon} aria-hidden="true">
                  {isDropdownOpen ? '▲' : '▼'}
                </span>
              </button>

              {isDropdownOpen && (
                <nav className={styles.dropdown} role="menu" aria-label="사용자 메뉴">
                  <div className={styles.dropdownHeader} role="presentation">
                    <div className={styles.dropdownUserInfo}>
                      <div className={styles.dropdownUserName}>{user.name}</div>
                      {user.email && (
                        <div className={styles.dropdownUserEmail}>{user.email}</div>
                      )}
                    </div>
                  </div>
                  <div className={styles.dropdownDivider} role="separator" />
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                  >
                    <span aria-hidden="true">👤</span>
                    <span>프로필</span>
                  </Link>
                  <Link
                    to="/settings"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                  >
                    <span aria-hidden="true">⚙️</span>
                    <span>설정</span>
                  </Link>
                  <div className={styles.dropdownDivider} role="separator" />
                  <button
                    className={`${styles.dropdownItem} ${styles.logoutButton}`}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout?.();
                    }}
                    role="menuitem"
                  >
                    <span aria-hidden="true">🚪</span>
                    <span>로그아웃</span>
                  </button>
                </nav>
              )}
            </div>
          ) : (
            <div className={styles.authButtons} role="navigation" aria-label="인증 메뉴">
              <Link to="/signin" className={styles.signinButton}>
                로그인
              </Link>
              <Link to="/signup" className={styles.signupButton}>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
