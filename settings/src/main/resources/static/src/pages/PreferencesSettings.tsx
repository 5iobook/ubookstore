import React, { useState } from 'react';

import { Container, Card, Button, Checkbox } from '@bookstore/common-ui';


const PreferencesSettings: React.FC = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'ko',
    timezone: 'Asia/Seoul',
    itemsPerPage: '10',
    autoSave: true,
    showTutorials: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ?¸ì¶œë¡??˜ê²½?¤ì • ?…ë°?´íŠ¸
    alert('?˜ê²½?¤ì •???€?¥ë˜?ˆìŠµ?ˆë‹¤.');
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const resetToDefaults = () => {
    setPreferences({
      theme: 'light',
      language: 'ko',
      timezone: 'Asia/Seoul',
      itemsPerPage: '10',
      autoSave: true,
      showTutorials: true
    });
  };

  return (
    <Container maxWidth="xl">
      <header style={{ 
        marginBottom: 'var(--spacing-6)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: 'var(--font-size-2xl)', 
          fontWeight: 'var(--font-weight-bold)' 
        }}>
          ?˜ê²½ ?¤ì •
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)' 
        }}>
          ?œìŠ¤???¬ìš© ?˜ê²½??ê°œì¸?”í•˜?¸ìš”.
        </p>
      </header>

      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?Œë§ˆ
              </label>
              <select
                name="theme"
                value={preferences.theme}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="light">?¼ì´??ëª¨ë“œ</option>
                <option value="dark">?¤í¬ ëª¨ë“œ</option>
                <option value="auto">?œìŠ¤???¤ì • ?°ë¦„</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?¸ì–´
              </label>
              <select
                name="language"
                value={preferences.language}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="ko">?œêµ­??/option>
                <option value="en">English</option>
                <option value="ja">?¥æœ¬èª?/option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?œê°„?€
              </label>
              <select
                name="timezone"
                value={preferences.timezone}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="Asia/Seoul">?œìš¸ (UTC+9)</option>
                <option value="Asia/Tokyo">?„ì¿„ (UTC+9)</option>
                <option value="America/New_York">?´ìš• (UTC-5)</option>
                <option value="Europe/London">?°ë˜ (UTC+0)</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?˜ì´ì§€????ª© ??
              </label>
              <select
                name="itemsPerPage"
                value={preferences.itemsPerPage}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="5">5ê°?/option>
                <option value="10">10ê°?/option>
                <option value="20">20ê°?/option>
                <option value="50">50ê°?/option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-4)', 
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              ê¸°ëŠ¥ ?¤ì •
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Checkbox
                id="autoSave"
                label="?ë™ ?€???œì„±??
                checked={preferences.autoSave}
                onChange={handleCheckboxChange('autoSave')}
              />

              <Checkbox
                id="showTutorials"
                label="?œí† ë¦¬ì–¼ ë°??„ì?ë§??œì‹œ"
                checked={preferences.showTutorials}
                onChange={handleCheckboxChange('showTutorials')}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            gap: 'var(--spacing-3)',
            paddingTop: 'var(--spacing-4)',
            borderTop: '1px solid var(--border-secondary)'
          }}>
            <Button 
              type="button" 
              variant="outline"
              onClick={resetToDefaults}
            >
              ê¸°ë³¸ê°’ìœ¼ë¡?ë³µì›
            </Button>
            <Button type="submit" variant="primary">
              ?€??
            </Button>
          </div>
        </form>
      </Card>
    </Container>

  );
};

export default PreferencesSettings;