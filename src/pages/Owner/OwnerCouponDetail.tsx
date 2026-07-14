import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/coupons/:id -> coupon 상세, GET /owner/coupons/:id/holders -> 보유 유저 목록
// ---------------------------------------------------------------------------

const coupon = {
  title: '아메리카노 20% 할인',
  meta: '할인율 20% · 필요 500P',
  status: '판매중',
  sold: 93,
  remaining: 7,
  used: 61,
}

const holders = [
  { id: '1', initial: '민', name: '민수', tag: '#U8231', note: '01.12 14:20 구매', status: '미사용' },
  { id: '2', initial: '민', name: '민수', tag: '#U9910', note: '01.13 09:05 구매 · 동명이인', status: '미사용' },
  { id: '3', initial: '지', name: '지은', tag: '#U7745', note: '01.11 18:40 구매', status: '사용완료' },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 24px 26px;
  border-bottom: 8px solid #f4eee7;
`

const InfoTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const CouponTitle = styled.p`
  font-size: 16px;
  color: #1f1a15;
`

const CouponMeta = styled.p`
  font-size: 12px;
  color: #a2917f;
`

const StatusBadge = styled.span`
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 12px;
  background: #2d8c42;
  color: #fdfbf8;
  font-size: 11px;
`

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border-radius: 12px;
  background: #f9f7f4;
  text-align: center;
`

const StatLabel = styled.p`
  font-size: 10px;
  color: #a2917f;
`

const StatValue = styled.p`
  font-size: 18px;
  color: #1f1a15;
`

const HolderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 8px;
`

const HolderTitle = styled.p`
  font-size: 14px;
  color: #1f1a15;

  strong {
    color: #f2913d;
  }
`

const FilterText = styled.button`
  background: none;
  border: none;
  font-size: 11px;
  color: #a2917f;
  cursor: pointer;
`

const HolderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 24px 24px;
`

const HolderRow = styled.div<{ dim?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  opacity: ${(p) => (p.dim ? 0.7 : 1)};
`

const HolderAvatar = styled.div<{ dim?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  flex-shrink: 0;
  background: ${(p) => (p.dim ? '#f0e7dc' : '#f3e4d7')};
  color: ${(p) => (p.dim ? '#a2917f' : '#8b7565')};
  font-size: 14px;
`

const HolderInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const HolderName = styled.p`
  font-size: 13px;
  color: #1f1a15;

  span {
    color: #c9b3a5;
    font-size: 10px;
  }
`

const HolderNote = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const HolderStatus = styled.span<{ used?: boolean }>`
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 10px;
  background: ${(p) => (p.used ? '#f0e7dc' : '#e6f2e9')};
  color: ${(p) => (p.used ? '#a2917f' : '#2d8c42')};
`

export function OwnerCouponDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Page>
      <OwnerHeader title="쿠폰 상세" />

      <InfoSection>
        <InfoTopRow>
          <div>
            <CouponTitle>{coupon.title}</CouponTitle>
            <CouponMeta>{coupon.meta}</CouponMeta>
          </div>
          <StatusBadge>{coupon.status}</StatusBadge>
        </InfoTopRow>
        <StatsRow>
          <StatBox>
            <StatLabel>판매</StatLabel>
            <StatValue>{coupon.sold}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>남은</StatLabel>
            <StatValue>{coupon.remaining}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>사용</StatLabel>
            <StatValue>{coupon.used}</StatValue>
          </StatBox>
        </StatsRow>
      </InfoSection>

      <HolderHeader>
        <HolderTitle>
          보유 유저 <strong>{holders.length}</strong>
        </HolderTitle>
        <FilterText type="button">미사용만 보기</FilterText>
      </HolderHeader>

      <HolderList>
        {holders.map((h) => {
          const used = h.status === '사용완료'
          return (
            <HolderRow key={h.id} dim={used}>
              <HolderAvatar dim={used}>{h.initial}</HolderAvatar>
              <HolderInfo>
                <HolderName>
                  {h.name} <span>{h.tag}</span>
                </HolderName>
                <HolderNote>{h.note}</HolderNote>
              </HolderInfo>
              {!used ? (
                <button
                  type="button"
                  onClick={() => navigate(`/owner/coupons/${id ?? '1'}/use`)}
                  style={{ all: 'unset', cursor: 'pointer' }}
                >
                  <HolderStatus>{h.status}</HolderStatus>
                </button>
              ) : (
                <HolderStatus used>{h.status}</HolderStatus>
              )}
            </HolderRow>
          )
        })}
      </HolderList>
    </Page>
  )
}
