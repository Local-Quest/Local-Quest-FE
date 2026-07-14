import { useState } from 'react'
import styled from '@emotion/styled'
import { AlertCircle } from 'lucide-react'
import { OwnerHeader } from '@/components/owner/OwnerHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/dashboard/visits?range=7d|30d
// -> {byWeekday[], byHour[], avgStayMinutes, completedMissionCount, sampleSize, categoryAvgRate}
// ---------------------------------------------------------------------------

type RangeKey = '7d' | '30d'

const weekdayData: Record<RangeKey, { label: string; value: number }[]> = {
  '7d': [
    { label: '월', value: 4 },
    { label: '화', value: 6 },
    { label: '수', value: 5 },
    { label: '목', value: 8 },
    { label: '금', value: 12 },
    { label: '토', value: 15 },
    { label: '일', value: 10 },
  ],
  '30d': [
    { label: '월', value: 18 },
    { label: '화', value: 22 },
    { label: '수', value: 19 },
    { label: '목', value: 27 },
    { label: '금', value: 41 },
    { label: '토', value: 52 },
    { label: '일', value: 38 },
  ],
}

const hourData: Record<RangeKey, { label: string; value: number }[]> = {
  '7d': [
    { label: '~11시', value: 2 },
    { label: '11-14시', value: 9 },
    { label: '14-17시', value: 6 },
    { label: '17-20시', value: 11 },
    { label: '20시~', value: 5 },
  ],
  '30d': [
    { label: '~11시', value: 12 },
    { label: '11-14시', value: 38 },
    { label: '14-17시', value: 25 },
    { label: '17-20시', value: 44 },
    { label: '20시~', value: 21 },
  ],
}

const summary: Record<RangeKey, { avgStay: number; completed: number; sampleSize: number }> = {
  '7d': { avgStay: 24, completed: 60, sampleSize: 60 },
  '30d': { avgStay: 27, completed: 217, sampleSize: 217 },
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px 4px;
`

const FilterChip = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${(p) => (p.active ? '#1f1a15' : '#f0e7dc')};
  background: ${(p) => (p.active ? '#1f1a15' : '#ffffff')};
  color: ${(p) => (p.active ? '#fdfbf8' : '#6d5f52')};
  font-size: 12px;
  cursor: pointer;
`

const SampleNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 24px 0;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fef8f0;
  color: #8b5a2b;
  font-size: 11px;
`

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 16px 24px;
`

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  text-align: center;
`

const StatLabel = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const StatValue = styled.p`
  font-size: 22px;
  color: #1f1a15;
`

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 24px 24px;
`

const ChartTitle = styled.p`
  font-size: 13px;
  color: #1f1a15;
`

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 120px;
  padding: 0 4px;
`

const BarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  height: 100%;
`

const Bar = styled.div<{ height: number }>`
  width: 100%;
  max-width: 22px;
  height: ${(p) => p.height}%;
  min-height: 4px;
  border-radius: 6px 6px 2px 2px;
  background: #e6853d;
`

const BarLabel = styled.span`
  font-size: 10px;
  color: #a2917f;
`

export function VisitDashboard() {
  const [range, setRange] = useState<RangeKey>('7d')

  const weekdays = weekdayData[range]
  const hours = hourData[range]
  const stat = summary[range]
  const maxWeekday = Math.max(...weekdays.map((d) => d.value))
  const maxHour = Math.max(...hours.map((d) => d.value))
  const lowSample = stat.sampleSize < 100

  return (
    <Page>
      <OwnerHeader title="방문 패턴 대시보드" />

      <FilterRow>
        <FilterChip type="button" active={range === '7d'} onClick={() => setRange('7d')}>
          최근 7일
        </FilterChip>
        <FilterChip type="button" active={range === '30d'} onClick={() => setRange('30d')}>
          최근 30일
        </FilterChip>
      </FilterRow>

      {lowSample && (
        <SampleNotice>
          <AlertCircle size={16} />
          표본 수가 적어 통계 신뢰도가 낮을 수 있어요
        </SampleNotice>
      )}

      <StatsRow>
        <StatCard>
          <StatLabel>평균 체류시간</StatLabel>
          <StatValue>{stat.avgStay}분</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>미션 완료 건수</StatLabel>
          <StatValue>{stat.completed}건</StatValue>
        </StatCard>
      </StatsRow>

      <ChartSection>
        <ChartTitle>요일별 방문 건수</ChartTitle>
        <BarChart>
          {weekdays.map((d) => (
            <BarCol key={d.label}>
              <Bar height={(d.value / maxWeekday) * 100} />
              <BarLabel>{d.label}</BarLabel>
            </BarCol>
          ))}
        </BarChart>
      </ChartSection>

      <ChartSection>
        <ChartTitle>시간대별 방문 건수</ChartTitle>
        <BarChart>
          {hours.map((d) => (
            <BarCol key={d.label}>
              <Bar height={(d.value / maxHour) * 100} />
              <BarLabel>{d.label}</BarLabel>
            </BarCol>
          ))}
        </BarChart>
      </ChartSection>
    </Page>
  )
}
