import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ProgressRing } from '@/components/ProgressRing'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트로 교체될 예정
// - GET /customer/points/history?month=YYYY-MM -> 날짜별 완료 미션 수(dayProgress)
// ---------------------------------------------------------------------------

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

/** 더미: 날짜(1~) -> 완료 미션 수. 없는 날짜는 미활동으로 처리 */
const dummyProgress: Record<number, number> = {
  1: 5,
  2: 3,
  4: 5,
  5: 2,
  6: 1,
}

const TODAY_DATE = 6

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
  padding-bottom: 24px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #1f1a15;
  cursor: pointer;
  display: flex;
`

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const NavButton = styled.button`
  background: none;
  border: none;
  color: #a2917f;
  cursor: pointer;
  display: flex;
`

const MonthLabel = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #1f1a15;
`

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 12px 20px 4px;
`

const WeekdayCell = styled.p`
  text-align: center;
  font-size: 11px;
  color: #c9b3a5;
`

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 6px 20px 20px;
`

const DayCell = styled.div<{ isToday: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 6px 0;
  border-radius: 12px;
  background: ${(p) => (p.isToday ? '#1f1a15' : 'transparent')};
  cursor: pointer;
`

const DayNumber = styled.p<{ isToday: boolean; dim: boolean }>`
  font-size: 12px;
  color: ${(p) => (p.isToday ? '#fdfbf8' : p.dim ? '#d9ccc0' : '#6d5f52')};
`

const EmptyRing = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #f0e7dc;
`

const Legend = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-bottom: 16px;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const LegendDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${(p) => p.color};
`

const LegendLabel = styled.span`
  font-size: 11px;
  color: #a2917f;
`

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function MonthlyProgress() {
  const navigate = useNavigate()
  const [cursor, setCursor] = useState(new Date(2025, 0, 1))

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstWeekday = getFirstWeekday(year, month)

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const changeMonth = (delta: number) => {
    setCursor(new Date(year, month + delta, 1))
  }

  return (
    <Page>
      <Header>
        <CloseButton type="button" aria-label="닫기" onClick={() => navigate(-1)}>
          <X size={20} />
        </CloseButton>
        <MonthNav>
          <NavButton type="button" aria-label="이전 달" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={18} />
          </NavButton>
          <MonthLabel>
            {year}년 {month + 1}월
          </MonthLabel>
          <NavButton type="button" aria-label="다음 달" onClick={() => changeMonth(1)}>
            <ChevronRight size={18} />
          </NavButton>
        </MonthNav>
        <div style={{ width: 20 }} />
      </Header>

      <WeekdayRow>
        {WEEKDAYS.map((w) => (
          <WeekdayCell key={w}>{w}</WeekdayCell>
        ))}
      </WeekdayRow>

      <DayGrid>
        {cells.map((date, i) => {
          if (date === null) return <div key={`empty-${i}`} />
          const completed = dummyProgress[date]
          const isToday = date === TODAY_DATE
          const isFuture = date > TODAY_DATE
          return (
            <DayCell key={date} isToday={isToday}>
              <DayNumber isToday={isToday} dim={isFuture}>
                {date}
              </DayNumber>
              {completed !== undefined ? (
                <ProgressRing
                  value={completed}
                  max={5}
                  size={20}
                  thickness={2.5}
                  trackColor="#f0e7dc"
                  progressColor={completed >= 5 ? '#2d8c42' : '#f2913d'}
                />
              ) : (
                <EmptyRing />
              )}
            </DayCell>
          )
        })}
      </DayGrid>

      <Legend>
        <LegendItem>
          <LegendDot color="#2d8c42" />
          <LegendLabel>완주</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendDot color="#f2913d" />
          <LegendLabel>진행</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendDot color="#f0e7dc" />
          <LegendLabel>미활동</LegendLabel>
        </LegendItem>
      </Legend>
    </Page>
  )
}
