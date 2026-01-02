import React, { useState } from 'react';
import { Container, Card, Button, Checkbox } from '@bookstore/common-ui';

const PrivacySettings: React.FC = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    dataCollection: true,
    analyticsTracking: false,
    thirdPartySharing: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 개인정보 설정 업데이트
    alert('개인정보 설정이 저장되었습니다.');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrivacy(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // TODO: 계정 삭제 API 호출
      alert('계정 삭제 요청이 처리되었습니다.');
    }
  };

  const handleExportData = () => {
    // TODO: 데이터 내보내기 API 호출
    alert('데이터 내보내기가 시작되었습니다. 완료되면 이메일로 알려드리겠습니다.');
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
          개인정보 설정
        </h1>
        <p style={{
          margin: 'var(--spacing-2) 0 0',
          color: 'var(--text-secondary)'
        }}>
          개인정보 보호 및 계정 보안을 관리하세요.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{
                marginBottom: 'var(--spacing-4)',
                color: 'var(--text-primary)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                프로필 공개 설정
              </h3>

              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-2)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--text-primary)'
                }}>
                  프로필 공개 범위
                </label>
                <select
                  name="profileVisibility"
                  value={privacy.profileVisibility}
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
                  <option value="public">전체 공개</option>
                  <option value="friends">친구만</option>
                  <option value="private">비공개</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <Checkbox
                  id="showEmail"
                  label="이메일 주소 공개"
                  checked={privacy.showEmail}
                  onChange={handleCheckboxChange('showEmail')}
                />

                <Checkbox
                  id="showPhone"
                  label="전화번호 공개"
                  checked={privacy.showPhone}
                  onChange={handleCheckboxChange('showPhone')}
                />

                <Checkbox
                  id="allowMessages"
                  label="다른 사용자의 메시지 허용"
                  checked={privacy.allowMessages}
                  onChange={handleCheckboxChange('allowMessages')}
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
                데이터 및 개인정보
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <Checkbox
                  id="dataCollection"
                  label="서비스 개선을 위한 데이터 수집 동의"
                  checked={privacy.dataCollection}
                  onChange={handleCheckboxChange('dataCollection')}
                />

                <Checkbox
                  id="analyticsTracking"
                  label="분석 추적 허용"
                  checked={privacy.analyticsTracking}
                  onChange={handleCheckboxChange('analyticsTracking')}
                />

                <Checkbox
                  id="thirdPartySharing"
                  label="제3자와의 데이터 공유 허용"
                  checked={privacy.thirdPartySharing}
                  onChange={handleCheckboxChange('thirdPartySharing')}
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: 'var(--spacing-2)',
              borderTop: '1px solid var(--border-secondary)'
            }}>
              <Button type="submit" variant="primary">
                저장
              </Button>
            </div>
          </form>
        </Card>

        <Card>
          <header style={{
            marginBottom: 'var(--spacing-2)'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              데이터 관리
            </h2>
            <p style={{
              margin: 'var(--spacing-2) 0 0',
              color: 'var(--text-secondary)'
            }}>
              개인 데이터를 관리하고 계정을 제어하세요.
            </p>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="outline"
                onClick={handleExportData}
              >
                내 데이터 내보내기
              </Button>
            </div>

            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <header style={{
                marginBottom: 'var(--spacing-2)'
              }}>
              <h2 style={{
                margin: 0,
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-bold)'
              }}>
                위험 구역
              </h2>
                <p style={{
                  margin: 'var(--spacing-2) 0 0',
                  color: 'var(--text-secondary)'
                }}>
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
                </p>
                </header>
                <Button
                  variant="outline"
                  onClick={handleDeleteAccount}
                >
                  계정 삭제
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default PrivacySettings;