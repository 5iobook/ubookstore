import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import PageHeader from '../PageHeader';
import styles from './AppLayout.module.css';

export interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

interface AppLayoutProps {
  children?: React.ReactNode;
  title?: string;
  navItems?: NavItem[];
  pageTitle?: string;
  pageDescription?: string;
  showPageHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title, 
  navItems, 
  pageTitle,
  pageDescription,
  showPageHeader = true
}) => {
  // Mock authentication state - replace with actual auth context
  const [isAuthenticated] = useState(false);
  const [user] = useState<{ name: string; email?: string; avatar?: string } | undefined>(
    undefined
  );

  return (
    <div className={styles.appLayout}>
      <Navigation 
        isAuthenticated={isAuthenticated} 
        user={user}
        title={title}
<<<<<<< HEAD
=======
        customNavItems={navItems}
>>>>>>> dev
      />
      
      {showPageHeader && (
        <PageHeader 
          title={pageTitle || title || '서비스'}
          description={pageDescription}
          navItems={navItems}
        />
      )}
      
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
