import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/profile -> {storeName, bizNumber}
// - PATCH /owner/settings/notification -> 알림 토글
// - POST /auth/logout / POST /owner/store/close -> 로그아웃 / 매장 폐업
// ---------------------------------------------------------------------------

const store = { name: '블루보틀 성수', bizNumber: '123-45-67890' }

const Page = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
`

const Header = styled.div`
  padding: 20px 24px 15px;
  border-bottom: 1px solid #f1e9df;
`

const Title = styled.p`
  font-size: 18px;
  color: #1f1a15;
`

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px 21px;
  border-bottom: 1px solid #f1e9df;
`

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #f3e4d7;
  font-size: 24px;
  color: #1f1a15;
  flex-shrink: 0;
`

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const StoreName = styled.p`
  font-size: 15px;
  color: #1f1a15;
`

const BizNumber = styled.p`
  font-size: 12px;
  color: #a2917f;
`

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px 21px;
  border-bottom: 1px solid #f1e9df;
`

const MenuRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 17px;
  border-radius: 10px;
  border: 1px solid #f0e7dc;
  background: #ffffff;
  cursor: pointer;
  color: #1f1a15;
  font-size: 13px;
`

const SettingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 24px 21px;
  border-bottom: 1px solid #f1e9df;
`

const SettingTitle = styled.p`
  font-size: 13px;
  color: #1f1a15;
  letter-spacing: 0.52px;
`

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`

const SettingLabel = styled.span`
  font-size: 13px;
  color: #6d5f52;
`

const Toggle = styled.button<{ on: boolean }>`
  position: relative;
  width: 44px;
  height: 26px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.on ? '#2d8c42' : '#e6d5c9')};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${(p) => (p.on ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #ffffff;
    transition: left 150ms;
  }
`

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 24px;
`

const LogoutButton = styled.button`
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #f0e7dc;
  background: #ffffff;
  color: #6a4c3a;
  font-size: 13px;
  cursor: pointer;
`

const CloseButton = styled.button`
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #fee8da;
  background: #ffffff;
  color: #c9b3a5;
  font-size: 13px;
  cursor: pointer;
`

export function OwnerMyPage() {
  const navigate = useNavigate()
  const [notifyOn, setNotifyOn] = useState(true)

  return (
    <Page>
      <Header>
        <Title>마이페이지</Title>
      </Header>

      <ProfileRow>
        <Avatar>{store.name.charAt(0)}</Avatar>
        <ProfileText>
          <StoreName>{store.name}</StoreName>
          <BizNumber>사업자 {store.bizNumber}</BizNumber>
        </ProfileText>
      </ProfileRow>

      <MenuSection>
        <MenuRow type="button" onClick={() => navigate('/owner/store/edit')}>
          매장 정보 관리
          <ChevronRight size={16} color="#c9b3a5" />
        </MenuRow>
        <MenuRow type="button" onClick={() => navigate('/owner/dashboard')}>
          방문 분석 통계
          <ChevronRight size={16} color="#c9b3a5" />
        </MenuRow>
      </MenuSection>

      <SettingSection>
        <SettingTitle>설정</SettingTitle>
        <SettingRow>
          <SettingLabel>알림 수신</SettingLabel>
          <Toggle type="button" on={notifyOn} onClick={() => setNotifyOn((v) => !v)} aria-pressed={notifyOn} />
        </SettingRow>
      </SettingSection>

      <BottomSection>
        <LogoutButton type="button" onClick={() => navigate('/owner/welcome')}>
          로그아웃
        </LogoutButton>
        <CloseButton type="button">매장 폐업 신청</CloseButton>
      </BottomSection>
    </Page>
  )
}
