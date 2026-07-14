import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트로 교체될 예정
// - GET /owner/store  -> storeName, isOpen, isVerified
// - GET /owner/dashboard/today -> stats(오늘 방문/완료 미션/판매 쿠폰/예상 수익)
// - GET /owner/activity/recent -> recentActivity
// ---------------------------------------------------------------------------

const store = { name: '블루보틀 성수', isOpen: true, isVerified: true }

const stats = [
  { label: '오늘 방문', value: '12', delta: '↑ 어제 대비 +3' },
  { label: '완료 미션', value: '8', delta: '↑ 어제 대비 +2' },
  { label: '판매 쿠폰', value: '5', delta: '3개 품절' },
  { label: '예상 수익(포인트)', value: '2.4M', delta: '월간' },
]

const recentActivity = [
  { title: '미션 1 인증 완료', time: '오늘 14:20', value: '+100P', tone: 'green' as const },
  { title: '쿠폰 3개 판매', time: '오늘 11:35', value: '2.1K', tone: 'orange' as const },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
`

const StoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 24px 21px;
  border-bottom: 1px solid #f1e9df;
`

const StoreName = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #1f1a15;
`

const StoreStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const OpenText = styled.span`
  font-size: 12px;
  color: #a2917f;
`

const VerifiedBadge = styled.span`
  padding: 3px 8px;
  border-radius: 12px;
  background: #2d8c42;
  color: #fdfbf8;
  font-size: 11px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 20px 24px;
`

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
`

const StatLabel = styled.p`
  font-size: 12px;
  color: #a2917f;
  text-align: center;
`

const StatValue = styled.p`
  font-size: 28px;
  color: #1f1a15;
  text-align: center;
`

const StatDelta = styled.p`
  font-size: 10px;
  color: #c9b3a5;
  text-align: center;
`

const ActionCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 24px;
`

const ActionButton = styled.button<{ variant: 'dark' | 'orange' | 'white' }>`
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  border: ${(p) => (p.variant === 'white' ? '1px solid #f0e7dc' : 'none')};
  background: ${(p) => (p.variant === 'dark' ? '#1f1a15' : p.variant === 'orange' ? '#e6853d' : '#ffffff')};
  color: ${(p) => (p.variant === 'white' ? '#1f1a15' : '#fdfbf8')};
`

const RecentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 21px 24px 20px;
  border-top: 1px solid #f1e9df;
`

const RecentTitle = styled.p`
  font-size: 14px;
  color: #1f1a15;
  letter-spacing: 0.56px;
`

const RecentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const RecentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 10px;
  background: #f9f7f4;
`

const RecentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const RecentText = styled.p`
  font-size: 12px;
  color: #1f1a15;
`

const RecentTime = styled.p`
  font-size: 10px;
  color: #a2917f;
`

const RecentValue = styled.p<{ tone: 'green' | 'orange' }>`
  font-size: 12px;
  color: ${(p) => (p.tone === 'green' ? '#2d8c42' : '#e6853d')};
`

export function OwnerMain() {
  const navigate = useNavigate()

  return (
    <Page>
      <StoreHeader>
        <StoreName>{store.name}</StoreName>
        <StoreStatusRow>
          <OpenText>{store.isOpen ? '영업 중' : '영업 종료'}</OpenText>
          {store.isVerified && <VerifiedBadge>인증 완료</VerifiedBadge>}
        </StoreStatusRow>
      </StoreHeader>

      <StatsGrid>
        {stats.map((s) => (
          <StatCard key={s.label}>
            <StatLabel>{s.label}</StatLabel>
            <StatValue>{s.value}</StatValue>
            <StatDelta>{s.delta}</StatDelta>
          </StatCard>
        ))}
      </StatsGrid>

      <ActionCol>
        <ActionButton variant="dark" type="button" onClick={() => navigate('/owner/missions/register')}>
          + 미션 등록
        </ActionButton>
        <ActionButton variant="orange" type="button" onClick={() => navigate('/owner/discounts/register')}>
          + 마감할인 등록
        </ActionButton>
        <ActionButton variant="white" type="button" onClick={() => navigate('/owner/coupons/create')}>
          + 쿠폰 생성
        </ActionButton>
      </ActionCol>

      <RecentSection>
        <RecentTitle>최근 활동</RecentTitle>
        <RecentList>
          {recentActivity.map((a) => (
            <RecentRow key={a.title}>
              <RecentInfo>
                <RecentText>{a.title}</RecentText>
                <RecentTime>{a.time}</RecentTime>
              </RecentInfo>
              <RecentValue tone={a.tone}>{a.value}</RecentValue>
            </RecentRow>
          ))}
        </RecentList>
      </RecentSection>
    </Page>
  )
}
