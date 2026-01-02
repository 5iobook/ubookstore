import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './PageHeader.module.css';

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  navItems?: NavItem[];
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  navItems,
  actions
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.pageHeader}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>



          {actions && (
            <div className={styles.actions}>
              {actions}
            </div>
          )}
        </div>

        {/* 로컬 ?�비게이??- 모바?�에?�도 보이?�록 */}
        {navItems && navItems.length > 0 && (
          <nav className={styles.localNav} aria-label="?�이지 ?�비게이??>
            <div className={styles.navList}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default PageHeader;