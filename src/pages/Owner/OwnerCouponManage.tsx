import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/coupons?status=selling|soldout|ended -> items
// ---------------------------------------------------------------------------

type Status = 'selling' | 'soldout' | 'ended'

interface CouponItem {
  id: string
  title: string
  remaining: number
  total: number
  badgeLabel: string
  badgeTone: 'green' | 'gray'
  disabled?: boolean
}

const itemsByStatus: Record<Status, CouponItem[]> = {
  selling: [{ id: '1', title: '아메리카노 20% 할인', remaining: 7, total: 100, badgeLabel: '판매중', badgeTone: 'green' }],
  soldout: [
    { id: '2', title: '초콜릿 무스 무료', remaining: 0, total: 50, badgeLabel: '품절', badgeTone: 'gray', disabled: true },
  ],
  ended: [],
}

const TABS: { key: Status; label: string }[] = [
  { key: 'selling', label: '판매 중' },
  { key: 'soldout', label: '품절' },
  { key: 'ended', label: '종료' },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
`

const TabRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 24px;
  border-bottom: 1px solid #f1e9df;
`

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  background: ${(p) => (p.active ? '#1f1a15' : '#f3e4d7')};
  color: ${(p) => (p.active ? '#fdfbf8' : '#6a4c3a')};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px;
`

const Card = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 13px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  opacity: ${(p) => (p.disabled ? 0.7 : 1)};
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const CardTitle = styled.p`
  font-size: 13px;
  color: #1f1a15;
`

const CardMeta = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const Badge = styled.span<{ tone: 'green' | 'gray' }>`
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  color: ${(p) => (p.tone === 'green' ? '#fdfbf8' : '#6a4c3a')};
  background: ${(p) => (p.tone === 'green' ? '#2d8c42' : '#f3e4d7')};
`

const ProgressTrack = styled.div`
  height: 6px;
  border-radius: 3px;
  background: #f3e4d7;
  overflow: hidden;
`

const ProgressFill = styled.div<{ percent: number; tone: 'orange' | 'gray' }>`
  height: 100%;
  width: ${(p) => p.percent}%;
  background: ${(p) => (p.tone === 'orange' ? '#e6853d' : '#c9b3a5')};
`

const DetailButton = styled.button<{ disabled?: boolean }>`
  padding: 9px 8px;
  border-radius: 8px;
  border: 1px solid #f0e7dc;
  background: #ffffff;
  font-size: 11px;
  color: #6a4c3a;
  cursor: ${(p) => (p.disabled ? 'default' : 'pointer')};
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
`

const EmptyText = styled.p`
  padding: 40px 0;
  text-align: center;
  font-size: 12px;
  color: #c9b3a5;
`

export function OwnerCouponManage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('selling')
  const items = itemsByStatus[status]

  return (
    <Page>
      <OwnerHeader title="쿠폰 관리" />
      <TabRow>
        {TABS.map((tab) => (
          <Tab key={tab.key} type="button" active={status === tab.key} onClick={() => setStatus(tab.key)}>
            {tab.label}
          </Tab>
        ))}
      </TabRow>

      {items.length > 0 ? (
        <List>
          {items.map((item) => {
            const percent = Math.round((item.remaining / item.total) * 100)
            return (
              <Card key={item.id} disabled={item.disabled}>
                <CardTop>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardMeta>
                      남은 수량: {item.remaining} / {item.total}
                    </CardMeta>
                  </div>
                  <Badge tone={item.badgeTone}>{item.badgeLabel}</Badge>
                </CardTop>
                <ProgressTrack>
                  <ProgressFill percent={percent} tone={item.disabled ? 'gray' : 'orange'} />
                </ProgressTrack>
                <DetailButton
                  type="button"
                  disabled={item.disabled}
                  onClick={() => !item.disabled && navigate(`/owner/coupons/${item.id}`)}
                >
                  상세 보기
                </DetailButton>
              </Card>
            )
          })}
        </List>
      ) : (
        <EmptyText>해당하는 쿠폰이 없어요</EmptyText>
      )}
    </Page>
  )
}
