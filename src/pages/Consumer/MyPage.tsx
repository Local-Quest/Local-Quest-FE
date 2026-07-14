import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Settings, ImagePlus, Clock, ClipboardCheck, Ticket, Bell, ChevronRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트들로 교체될 예정
// - GET /customer/profile                -> userName, regionLabel, joinedLabel, avatarUrl
// - GET /customer/points/history         -> pointsEarnedCount, pointBalance
// - GET /customer/missions/history       -> completedMissionCount
// - POST /auth/logout                    -> 로그아웃 버튼 액션
// ---------------------------------------------------------------------------

const profile = {
  name: '지우',
  regionLabel: '성수동',
  joinedLabel: '2025.11 가입',
}

const stats = [
  { label: '포인트 받은 횟수', value: '12' },
  { label: '누적 포인트', value: '1,240' },
  { label: '완료 미션', value: '47' },
]

const menuItems = [
  { icon: Clock, label: '포인트 적립 내역', path: '/mypage/points' },
  { icon: ClipboardCheck, label: '미션 기록', path: '/mypage/missions' },
  { icon: Ticket, label: '쿠폰함', path: '/coupons' },
  { icon: Bell, label: '알림 설정', path: '/mypage/settings' },
  { icon: Settings, label: '설정', path: '/mypage/settings' },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 16px;
  font-family: 'Pretendard', sans-serif;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.p`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.66px;
  color: #1f1a15;
`

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border: 1px solid #ece2d6;
  background: #ffffff;
  cursor: pointer;
  color: #1f1a15;
`

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
  width: 66px;
  height: 66px;
  border-radius: 33px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px dashed rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.4);
`

const AvatarLabel = styled.span`
  font-weight: 500;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.55);
`

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`

const ProfileName = styled.p`
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.36px;
  color: #1f1a15;
`

const ProfileSubtitle = styled.p`
  font-weight: 400;
  font-size: 12.5px;
  color: #a2917f;
`

const EditButton = styled.button`
  flex-shrink: 0;
  border: 1px solid #e3d5c8;
  background: none;
  cursor: pointer;
  padding: 9px 15px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  color: #6d5f52;
`

const StatsCard = styled.div`
  display: flex;
  align-items: center;
  padding: 19px 0;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-radius: 20px;
`

const StatCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & + & {
    border-left: 1px solid #f1e9df;
  }
`

const StatValue = styled.p`
  font-weight: 800;
  font-size: 21px;
  color: #1f1a15;
`

const StatLabel = styled.p`
  font-weight: 500;
  font-size: 11px;
  color: #a2917f;
`

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuRow = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 0 17px;
  border: none;
  border-bottom: 1px solid #f1e9df;
  background: none;
  cursor: pointer;
  color: #1f1a15;

  &:last-of-type {
    border-bottom: none;
  }
`

const MenuLabel = styled.span`
  flex: 1;
  text-align: left;
  font-weight: 600;
  font-size: 14.5px;
  color: #1f1a15;
`

const LogoutButton = styled.button`
  padding: 25px 0;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 12.5px;
  color: #c3b3a3;
`

export function MyPage() {
  const navigate = useNavigate()

  return (
    <Page>
      <Header>
        <Title>마이</Title>
        <SettingsButton type="button" aria-label="설정" onClick={() => navigate('/mypage/settings')}>
          <Settings size={18} />
        </SettingsButton>
      </Header>

      <ProfileRow>
        <Avatar>
          <ImagePlus size={22} />
          <AvatarLabel>사진</AvatarLabel>
        </Avatar>
        <ProfileText>
          <ProfileName>{profile.name}</ProfileName>
          <ProfileSubtitle>
            {profile.regionLabel} · {profile.joinedLabel}
          </ProfileSubtitle>
        </ProfileText>
        <EditButton type="button" onClick={() => navigate('/mypage/edit')}>
          프로필 수정
        </EditButton>
      </ProfileRow>

      <StatsCard>
        {stats.map((stat) => (
          <StatCol key={stat.label}>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCol>
        ))}
      </StatsCard>

      <MenuList>
        {menuItems.map(({ icon: Icon, label, path }) => (
          <MenuRow key={label} type="button" onClick={() => navigate(path)}>
            <Icon size={20} />
            <MenuLabel>{label}</MenuLabel>
            <ChevronRight size={17} color="#c9b3a5" />
          </MenuRow>
        ))}
      </MenuList>

      <LogoutButton type="button" onClick={() => navigate('/welcome', { replace: true })}>
        로그아웃
      </LogoutButton>
    </Page>
  )
}
