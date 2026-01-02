import React, { useState } from 'react';

import { Container, Card, Button, Checkbox } from '@bookstore/common-ui';


const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newMessages: true,
    tradeUpdates: true,
    bookRecommendations: false,
    systemUpdates: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ?∏Ï∂úÎ°??åÎ¶º ?§Ï†ï ?ÖÎç∞?¥Ìä∏
    alert('?åÎ¶º ?§Ï†ï???Ä?•Îêò?àÏäµ?àÎã§.');
  };


  const handleChange = (name: string) => (checked: boolean) => {

    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
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
          ?åÎ¶º ?§Ï†ï
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)' 
        }}>
          Î∞õÍ≥† ?∂Ï? ?åÎ¶º ?†Ìòï???†ÌÉù?òÏÑ∏??
        </p>
      </header>

      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-4)', 
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              ?åÎ¶º Î∞©Ïãù
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Checkbox
                id="emailNotifications"
                label="?¥Î©î???åÎ¶º"
                checked={notifications.emailNotifications}
                onChange={handleChange('emailNotifications')}
              />

              <Checkbox
                id="pushNotifications"
                label="?∏Ïãú ?åÎ¶º"
                checked={notifications.pushNotifications}
                onChange={handleChange('pushNotifications')}
              />

              <Checkbox
                id="smsNotifications"
                label="SMS ?åÎ¶º"
                checked={notifications.smsNotifications}
                onChange={handleChange('smsNotifications')}
              />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-4)', 
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              ?åÎ¶º ?¥Ïö©
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Checkbox
                id="newMessages"
                label="??Î©îÏãúÏßÄ"
                checked={notifications.newMessages}
                onChange={handleChange('newMessages')}
              />

              <Checkbox
                id="tradeUpdates"
                label="Í±∞Îûò ?ÖÎç∞?¥Ìä∏"
                checked={notifications.tradeUpdates}
                onChange={handleChange('tradeUpdates')}
              />

              <Checkbox
                id="bookRecommendations"
                label="?ÑÏÑú Ï∂îÏ≤ú"
                checked={notifications.bookRecommendations}
                onChange={handleChange('bookRecommendations')}
              />

              <Checkbox
                id="systemUpdates"
                label="?úÏä§???ÖÎç∞?¥Ìä∏"
                checked={notifications.systemUpdates}
                onChange={handleChange('systemUpdates')}
              />

              <Checkbox
                id="marketingEmails"
                label="ÎßàÏ????¥Î©î??
                checked={notifications.marketingEmails}
                onChange={handleChange('marketingEmails')}
              />

              <Checkbox
                id="weeklyDigest"
                label="Ï£ºÍ∞Ñ ?îÏïΩ"
                checked={notifications.weeklyDigest}
                onChange={handleChange('weeklyDigest')}
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
              onClick={() => {
                const allOff = Object.keys(notifications).reduce((acc, key) => {
                  acc[key] = false;
                  return acc;
                }, {} as any);
                setNotifications(allOff);
              }}
            >
              Î™®Îëê ?ÑÍ∏∞
            </Button>
            <Button type="submit" variant="primary">
              ?Ä??
            </Button>
          </div>
        </form>
      </Card>
    </Container>

  );
};

export default NotificationSettings;