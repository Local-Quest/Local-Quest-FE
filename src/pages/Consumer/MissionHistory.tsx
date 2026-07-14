import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SubPageHeader } from '@/components/SubPageHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /customer/missions/history -> 완료한 미션 리스트(날짜순)
// ---------------------------------------------------------------------------

const records = [
  { id: '1', storeName: '블루보틀 성수', date: '01.14', points: 100 },
  { id: '2', storeName: '스타벅스 성수점', date: '01.12', points: 100 },
  { id: '3', storeName: '올리브영 성수점', date: '01.10', points: 150 },
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
  padding: 8px 24px 24px;
`

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border: none;
  border-bottom: 1px solid #f1e9df;
  background: none;
  cursor: pointer;
  text-align: left;
`

const RowInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const RowStore = styled.p`
  font-size: 13px;
  color: #1f1a15;
`

const RowDate = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const RowPoints = styled.p`
  font-size: 13px;
  color: #2d8c42;
`

const EmptyState = styled.p`
  padding: 60px 24px;
  text-align: center;
  font-size: 13px;
  color: #a2917f;
`

export function MissionHistory() {
  const navigate = useNavigate()

  return (
    <Page>
      <SubPageHeader title="미션 기록" />

      {records.length === 0 ? (
        <EmptyState>아직 완료한 미션이 없어요</EmptyState>
      ) : (
        <List>
          {records.map((r) => (
            <Row key={r.id} type="button" onClick={() => navigate(`/missions/${r.id}`)}>
              <RowInfo>
                <RowStore>{r.storeName}</RowStore>
                <RowDate>{r.date} 완료</RowDate>
              </RowInfo>
              <RowPoints>+{r.points}P</RowPoints>
              <ChevronRight size={16} color="#c9b3a5" />
            </Row>
          ))}
        </List>
      )}
    </Page>
  )
}
