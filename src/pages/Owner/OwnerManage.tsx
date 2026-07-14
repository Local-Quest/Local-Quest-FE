import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/registrations?status=active|ended -> items
// ---------------------------------------------------------------------------

type Status = 'active' | 'ended'

interface RegItem {
  id: string
  title: string
  meta: string
  badgeLabel: string
  badgeTone: 'green' | 'orange'
  registeredAt: string
  countLabel: string
}

const itemsByStatus: Record<Status, RegItem[]> = {
  active: [
    {
      id: '1',
      title: '첫 방문 보너스',
      meta: '+100P · 카페',
      badgeLabel: '진행중',
      badgeTone: 'green',
      registeredAt: '2025.01.10',
      countLabel: '인증: 12회',
    },
    {
      id: '2',
      title: '라떼 구매 미션',
      meta: '+80P · 카페',
      badgeLabel: '내일부터',
      badgeTone: 'orange',
      registeredAt: '2025.01.12',
      countLabel: '인증: 5회',
    },
  ],
  ended: [],
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
`

const TabRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 24px 9px;
  border-bottom: 1px solid #f1e9df;
`

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 13px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
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

const Badge = styled.span<{ tone: 'green' | 'orange' }>`
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  color: #fdfbf8;
  background: ${(p) => (p.tone === 'green' ? '#2d8c42' : '#e6853d')};
`

const CardBottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: #c9b3a5;
`

const ActionRow = styled.div`
  display: flex;
  gap: 6px;
`

const ActionButton = styled.button<{ danger?: boolean }>`
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #f0e7dc;
  background: #ffffff;
  font-size: 11px;
  color: ${(p) => (p.danger ? '#c9b3a5' : '#6a4c3a')};
  cursor: pointer;
`

const EmptyText = styled.p`
  padding: 40px 0;
  text-align: center;
  font-size: 12px;
  color: #c9b3a5;
`

export function OwnerManage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('active')
  const items = itemsByStatus[status]

  return (
    <Page>
      <OwnerHeader title="등록 관리" />
      <TabRow>
        <Tab type="button" active={status === 'active'} onClick={() => setStatus('active')}>
          진행 중
        </Tab>
        <Tab type="button" active={status === 'ended'} onClick={() => setStatus('ended')}>
          종료
        </Tab>
      </TabRow>

      {items.length > 0 ? (
        <List>
          {items.map((item) => (
            <Card key={item.id}>
              <CardTop>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardMeta>{item.meta}</CardMeta>
                </div>
                <Badge tone={item.badgeTone}>{item.badgeLabel}</Badge>
              </CardTop>
              <CardBottomRow>
                <span>등록일: {item.registeredAt}</span>
                <span>{item.countLabel}</span>
              </CardBottomRow>
              <ActionRow>
                <ActionButton type="button" onClick={() => navigate(`/owner/missions/${item.id}`)}>
                  수정
                </ActionButton>
                <ActionButton danger type="button" onClick={() => navigate(`/owner/missions/${item.id}/delete`)}>
                  삭제
                </ActionButton>
              </ActionRow>
            </Card>
          ))}
        </List>
      ) : (
        <EmptyText>종료된 항목이 없어요</EmptyText>
      )}
    </Page>
  )
}
