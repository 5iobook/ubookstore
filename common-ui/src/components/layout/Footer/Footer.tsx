import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.section}>
            <div className={styles.brand}>
              <span className={styles.brandIcon} aria-hidden="true">📚</span>
              <span className={styles.brandText}>책거래</span>
            </div>
            <p className={styles.description}>
              온라인 중고 책거래 플랫폼
            </p>
            <p className={styles.copyright}>
              © {currentYear} 책거래. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>서비스</h3>
            <nav className={styles.linkList}>
              <Link to="/books" className={styles.link}>도서 목록</Link>
              <Link to="/posts" className={styles.link}>게시글</Link>
              <Link to="/chat" className={styles.link}>채팅</Link>
              <Link to="/about" className={styles.link}>소개</Link>
            </nav>
          </div>

          {/* Support Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>고객지원</h3>
            <nav className={styles.linkList}>
              <Link to="/help" className={styles.link}>도움말</Link>
              <Link to="/faq" className={styles.link}>자주 묻는 질문</Link>
              <Link to="/contact" className={styles.link}>문의하기</Link>
              <Link to="/terms" className={styles.link}>이용약관</Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>정보</h3>
            <nav className={styles.linkList}>
              <Link to="/privacy" className={styles.link}>개인정보처리방침</Link>
              <Link to="/terms-of-service" className={styles.link}>서비스 이용약관</Link>
              <Link to="/notice" className={styles.link}>공지사항</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <span aria-hidden="true">💻</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <span aria-hidden="true">🐦</span>
            </a>
            <a
              href="mailto:contact@example.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <span aria-hidden="true">📧</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
