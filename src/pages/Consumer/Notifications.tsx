import styled from '@emotion/styled'
import { Ticket, MapPin, Gift, BellRing } from 'lucide-react'
import { SubPageHeader } from '@/components/SubPageHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /customer/notifications -> 알림 목록
// 현재는 목데이터. 읽음 처리(PATCH .../read)는 서버 복구 후 연동.
// ---------------------------------------------------------------------------

type NotiType = 'mission' | 'coupon' | 'reward' | 'system'

interface Noti {
  id: string
  type: NotiType
  title: string
  body: string
  timeLabel: string
  unread?: boolean
}

const ICONS: Record<NotiType, typeof Ticket> = {
  mission: MapPin,
  coupon: Ticket,
  reward: Gift,
  system: BellRing,
}

const notifications: Noti[] = [
  { id: '1', type: 'reward', title: '오늘의 보너스 상자 도착!', body: '미션 5개를 완주해서 500P를 받았어요.', timeLabel: '방금 전', unread: true },
  { id: '2', type: 'mission', title: '주변에 새 미션이 생겼어요', body: '블루보틀 성수 · 도보 3분 · +100P', timeLabel: '1시간 전', unread: true },
  { id: '3', type: 'coupon', title: '쿠폰 만료 임박', body: '아메리카노 사이즈업 무료 쿠폰이 2일 뒤 만료돼요.', timeLabel: '어제' },
  { id: '4', type: 'system', title: '연속 수행 12일 달성 🔥', body: '내일도 미션을 완료하면 연속 기록이 이어져요.', timeLabel: '2일 전' },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div<{ unread?: boolean }>`
  display: flex;
  gap: 13px;
  padding: 18px 20px;
  border-bottom: 1px solid #f1e9df;
  background: ${(p) => (p.unread ? '#fdf4ec' : 'transparent')};
`

const IconWrap = styled.div`
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: #fdece1;
  color: #e6853d;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const NotiTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #1f1a15;
`

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e6853d;
  flex-shrink: 0;
`

const NotiText = styled.p`
  font-weight: 400;
  font-size: 12.5px;
  color: #7c6c5d;
  line-height: 1.45;
`

const TimeText = styled.p`
  font-weight: 500;
  font-size: 11px;
  color: #b6a493;
  margin-top: 2px;
`

const EmptyText = styled.p`
  padding: 60px 0;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  color: #b6a493;
`

export function Notifications() {
  return (
    <Page>
      <SubPageHeader title="알림" />
      {notifications.length === 0 ? (
        <EmptyText>아직 도착한 알림이 없어요</EmptyText>
      ) : (
        <List>
          {notifications.map((noti) => {
            const Icon = ICONS[noti.type]
            return (
              <Row key={noti.id} unread={noti.unread}>
                <IconWrap>
                  <Icon size={19} />
                </IconWrap>
                <Body>
                  <TitleRow>
                    <NotiTitle>{noti.title}</NotiTitle>
                    {noti.unread && <Dot />}
                  </TitleRow>
                  <NotiText>{noti.body}</NotiText>
                  <TimeText>{noti.timeLabel}</TimeText>
                </Body>
              </Row>
            )
          })}
        </List>
      )}
    </Page>
  )
}
