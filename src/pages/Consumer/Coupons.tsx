import { useState } from 'react'
import styled from '@emotion/styled'
import { Search } from 'lucide-react'
import { PointsBadge } from '@/components/PointsBadge'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트들로 교체될 예정
// - GET /customer/points/history                 -> pointBalance
// - GET /customer/coupons?status=available|used|expired -> tabs, coupons
// ---------------------------------------------------------------------------

const pointBalance = 1240

type CouponStatus = 'available' | 'used' | 'expired'
type BadgeVariant = 'free' | 'default'

interface Coupon {
  id: string
  title: string
  storeName: string
  category: string
  dDay: string
  dueDate: string
  badgeLabel: string
  badgeVariant: BadgeVariant
}

const TABS: { key: CouponStatus; label: string }[] = [
  { key: 'available', label: '사용 가능' },
  { key: 'used', label: '사용 완료' },
  { key: 'expired', label: '기간 만료' },
]

const couponsByStatus: Record<CouponStatus, Coupon[]> = {
  available: [
    {
      id: '1',
      title: '아메리카노 사이즈업 무료',
      storeName: '블루보틀 성수',
      category: '카페',
      dDay: 'D-2',
      dueDate: '07.16까지',
      badgeLabel: '무료',
      badgeVariant: 'free',
    },
    {
      id: '2',
      title: '3,000원 할인 쿠폰',
      storeName: '파리크라상 역삼',
      category: '베이커리',
      dDay: 'D-11',
      dueDate: '07.25까지',
      badgeLabel: '3,000원',
      badgeVariant: 'default',
    },
    {
      id: '3',
      title: '지정 음료 1+1',
      storeName: 'GS25 선릉역점',
      category: '편의점',
      dDay: 'D-20',
      dueDate: '08.03까지',
      badgeLabel: '1+1',
      badgeVariant: 'default',
    },
  ],
  used: [],
  expired: [],
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-radius: 14px;
`

const SearchPlaceholder = styled.p`
  font-weight: 500;
  font-size: 13px;
  color: #bcaa99;
`

const TabRow = styled.div`
  display: flex;
  gap: 22px;
  border-bottom: 1px solid #f1e9df;
`

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 14px;
  font-weight: ${(p) => (p.active ? 700 : 600)};
  font-size: 14px;
  color: ${(p) => (p.active ? '#1f1a15' : '#c3b3a3')};
  border-bottom: 2px solid ${(p) => (p.active ? '#1f1a15' : 'transparent')};

  strong {
    color: #e6853d;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const CouponRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 21px 0;
  border-bottom: 1px solid #f1e9df;

  &:last-of-type {
    border-bottom: none;
  }
`

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const CouponTitle = styled.p`
  font-weight: 600;
  font-size: 15px;
  color: #1f1a15;
`

const CouponMeta = styled.p`
  font-weight: 400;
  font-size: 12.5px;
  color: #a2917f;

  strong {
    font-weight: 600;
    color: #c2582b;
  }
`

const CouponBadge = styled.div<{ variant: BadgeVariant }>`
  flex-shrink: 0;
  padding: 6px 11px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 12.5px;
  white-space: nowrap;
  background: ${(p) => (p.variant === 'free' ? '#fdece1' : '#f3e9df')};
  color: ${(p) => (p.variant === 'free' ? '#c2582b' : '#8b644b')};
`

const EmptyText = styled.p`
  padding: 26px 0;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  color: #b6a493;
`

export function Coupons() {
  const [status, setStatus] = useState<CouponStatus>('available')
  const coupons = couponsByStatus[status]

  return (
    <Page>
      <Header>
        <Title>내 쿠폰</Title>
        <PointsBadge points={pointBalance} />
      </Header>

      <SearchBar>
        <Search size={17} color="#bcaa99" />
        <SearchPlaceholder>매장명 검색</SearchPlaceholder>
      </SearchBar>

      <TabRow>
        {TABS.map((tab) => (
          <Tab key={tab.key} type="button" active={status === tab.key} onClick={() => setStatus(tab.key)}>
            {tab.label} {tab.key === 'available' && <strong>{couponsByStatus.available.length}</strong>}
          </Tab>
        ))}
      </TabRow>

      {coupons.length > 0 && (
        <List>
          {coupons.map((coupon) => (
            <CouponRow key={coupon.id}>
              <CouponInfo>
                <CouponTitle>{coupon.title}</CouponTitle>
                <CouponMeta>
                  {coupon.storeName} · {coupon.category} ·{' '}
                  <strong>
                    {coupon.dDay} · {coupon.dueDate}
                  </strong>
                </CouponMeta>
              </CouponInfo>
              <CouponBadge variant={coupon.badgeVariant}>{coupon.badgeLabel}</CouponBadge>
            </CouponRow>
          ))}
        </List>
      )}

      <EmptyText>
        {coupons.length > 0 ? '미션을 완료하면 새로운 쿠폰이 쌓여요' : '아직 쿠폰이 없어요'}
      </EmptyText>
    </Page>
  )
}
