import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { MapPin, ChevronDown, CalendarDays, Bell } from 'lucide-react'
import { ProgressRing } from '@/components/ProgressRing'
import { colors } from '@/styles/tokens'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트들로 교체될 예정
// - GET /customer/main/today-progress   -> todayProgress, nearbyEvents
// - GET /customer/main/weekly-progress  -> weeklyProgress
// - GET /customer/points/history        -> pointBalance
// ---------------------------------------------------------------------------

interface DayProgress {
  day: string
  completed: number
  max: number
  isToday?: boolean
}

const weeklyProgress: DayProgress[] = [
  { day: '월', completed: 5, max: 5 },
  { day: '화', completed: 3, max: 5 },
  { day: '수', completed: 4, max: 5 },
  { day: '목', completed: 3, max: 5, isToday: true },
  { day: '금', completed: 0, max: 5 },
  { day: '토', completed: 0, max: 5 },
  { day: '일', completed: 0, max: 5 },
]

const todayProgress = { completed: 3, max: 5 }
const todayRewardPoints = 500 // TODO(API 연동): 다음 미션 완료 보상 포인트, today-progress 응답에서 내려받을 값
const pointBalance = 1240
const locationLabel = '유성구'
const userName = '지환님'

interface NearbyEvent {
  id: string
  title: string
  storeName: string
  distanceM: number
  deadlineLabel?: string
  badgeLabel: string
}

const nearbyEvents: NearbyEvent[] = [
  { id: '1', title: '생수 1+1 행사', storeName: 'GS25 유성점', distanceM: 120, deadlineLabel: '오늘 마감', badgeLabel: '1+1' },
  { id: '2', title: '생수 1+1 행사', storeName: 'GS25 유성점', distanceM: 120, badgeLabel: '1+1' },
  { id: '3', title: '생수 1+1 행사', storeName: 'GS25 유성점', distanceM: 120, deadlineLabel: '오늘 마감', badgeLabel: '1+1' },
  { id: '4', title: '생수 1+1 행사', storeName: 'GS25 유성점', distanceM: 120, deadlineLabel: '오늘 마감', badgeLabel: '1+1' },
  { id: '5', title: '생수 1+1 행사', storeName: 'GS25 유성점', distanceM: 120, deadlineLabel: '오늘 마감', badgeLabel: '1+1' },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  font-family: 'Pretendard', sans-serif;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
  color: ${colors.black};
`

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${colors.black};
`

const CircleIconButton = styled(IconButton)`
  width: 28px;
  height: 28px;
  border: 1px solid ${colors.brown600};
  border-radius: 25px;
`

const PointsPill = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border: 1px solid ${colors.black};
  border-radius: 25px;
  font-weight: 700;
  font-size: 12px;
`

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const GreetingTitle = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: ${colors.black};
`

const GreetingSubtitle = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: ${colors.brown800};
`

const WeekRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 47px;
`

const DayLabel = styled.p<{ isToday?: boolean }>`
  font-weight: ${(p) => (p.isToday ? 700 : 500)};
  font-size: 14px;
  color: ${(p) => (p.isToday ? colors.orange500 : colors.black)};
`

const TodayCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  border: 2px solid ${colors.orange600};
  border-radius: 25px;
  background: ${colors.greenLight};
`

const TodayCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TodayCardLabel = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: ${colors.brown800};
`

const TodayCardHeadline = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: ${colors.blue800};

  span {
    color: ${colors.orangeText};
  }
`

const GoToMissionButton = styled.button`
  align-self: flex-start;
  height: 27px;
  padding: 0 17px;
  border: none;
  border-radius: 25px;
  background: ${colors.blue600};
  color: ${colors.white};
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
`

const RingValue = styled.p`
  font-weight: 700;
  white-space: nowrap;

  span:first-of-type {
    font-size: 24px;
    color: ${colors.orange500};
  }
  span:last-of-type {
    font-size: 16px;
    color: #656371;
  }
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SectionTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: ${colors.black};
  padding: 6px 0;
`

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EventItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.orange200};

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const EventRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const EventTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${colors.black};
`

const EventMeta = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  color: ${colors.brown800};

  strong {
    font-weight: 700;
    color: ${colors.orangeText};
  }
`

const EventBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 45px;
  padding: 0 8px;
  border-radius: 25px;
  background: ${colors.orange100};
  color: ${colors.orangeBadgeText};
  font-weight: 700;
  font-size: 14px;
`

export function Main() {
  const navigate = useNavigate()

  return (
    <Page>
      <TopBar>
        <LocationButton type="button">
          <MapPin size={20} />
          {locationLabel}
          <ChevronDown size={14} />
        </LocationButton>
        <TopBarRight>
          <CircleIconButton type="button" aria-label="캘린더" onClick={() => navigate('/calendar')}>
            <CalendarDays size={20} />
          </CircleIconButton>
          <CircleIconButton type="button" aria-label="알림">
            <Bell size={20} />
          </CircleIconButton>
          <PointsPill>P {pointBalance.toLocaleString()}</PointsPill>
        </TopBarRight>
      </TopBar>

      <Greeting>
        <GreetingTitle>안녕하세요, {userName}</GreetingTitle>
        <GreetingSubtitle>오늘도 동네 한 바퀴 돌아볼까요?</GreetingSubtitle>
      </Greeting>

      <WeekRow>
        {weeklyProgress.map((d) => (
          <DayColumn key={d.day}>
            <DayLabel isToday={d.isToday}>{d.day}</DayLabel>
            <ProgressRing value={d.completed} max={d.max} size={40} thickness={5} />
          </DayColumn>
        ))}
      </WeekRow>

      <TodayCard>
        <TodayCardText>
          <TodayCardLabel>오늘의 진척도</TodayCardLabel>
          <TodayCardHeadline>
            미션 {todayProgress.max - todayProgress.completed}개만 더 하면
            <br />
            <span>{todayRewardPoints}P 획득</span>
          </TodayCardHeadline>
          <GoToMissionButton type="button">미션하러 가기</GoToMissionButton>
        </TodayCardText>
        <ProgressRing value={todayProgress.completed} max={todayProgress.max} size={103} thickness={8}>
          <RingValue>
            <span>{todayProgress.completed}</span>
            <span>/{todayProgress.max}</span>
          </RingValue>
        </ProgressRing>
      </TodayCard>

      <Section>
        <SectionTitle>근처 이벤트</SectionTitle>
        <EventList>
          {nearbyEvents.map((event) => (
            <EventItem key={event.id}>
              <EventRow>
                <EventInfo>
                  <EventTitle>{event.title}</EventTitle>
                  <EventMeta>
                    <span>{event.storeName}</span>
                    <span>|</span>
                    <span>{event.distanceM}m</span>
                    {event.deadlineLabel && (
                      <>
                        <span>|</span>
                        <strong>{event.deadlineLabel}</strong>
                      </>
                    )}
                  </EventMeta>
                </EventInfo>
                <EventBadge>{event.badgeLabel}</EventBadge>
              </EventRow>
            </EventItem>
          ))}
        </EventList>
      </Section>
    </Page>
  )
}
