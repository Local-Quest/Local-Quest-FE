import styled from '@emotion/styled'
import { SubPageHeader } from '@/components/SubPageHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /customer/points/history -> {pointBalance, earnedCount, logs[]}
// ---------------------------------------------------------------------------

const summary = { balance: 1240, earnedCount: 12 }

const logs = [
  { id: '1', label: '블루보틀 성수 미션 완료', date: '01.14 14:20', amount: 100, pending: false },
  { id: '2', label: '5개 완주 보너스', date: '01.14 14:21', amount: 500, pending: false },
  { id: '3', label: '아메리카노 쿠폰 교환', date: '01.13 18:02', amount: -300, pending: false },
  { id: '4', label: '스타벅스 성수점 미션 완료', date: '01.12 10:44', amount: 100, pending: true },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const SummaryCard = styled.div`
  display: flex;
  align-items: center;
  padding: 22px 0;
  margin: 20px 24px;
  border-radius: 16px;
  background: #1f1a15;
`

const SummaryCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & + & {
    border-left: 1px solid rgba(255, 255, 255, 0.15);
  }
`

const SummaryValue = styled.p`
  font-weight: 800;
  font-size: 20px;
  color: #fdfbf8;
`

const SummaryLabel = styled.p`
  font-size: 11px;
  color: #c9b3a5;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #f1e9df;
`

const RowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const RowLabel = styled.p`
  font-size: 13px;
  color: #1f1a15;
`

const RowDate = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const RowAmount = styled.p<{ positive: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.positive ? '#2d8c42' : '#d95c3a')};
`

const PendingTag = styled.span`
  font-size: 10px;
  color: #e6853d;
  margin-left: 6px;
`

const EmptyState = styled.p`
  padding: 60px 24px;
  text-align: center;
  font-size: 13px;
  color: #a2917f;
`

export function PointsHistory() {
  return (
    <Page>
      <SubPageHeader title="포인트 내역" />

      <SummaryCard>
        <SummaryCol>
          <SummaryValue>{summary.balance.toLocaleString()}P</SummaryValue>
          <SummaryLabel>보유 포인트</SummaryLabel>
        </SummaryCol>
        <SummaryCol>
          <SummaryValue>{summary.earnedCount}회</SummaryValue>
          <SummaryLabel>포인트 받은 횟수</SummaryLabel>
        </SummaryCol>
      </SummaryCard>

      {logs.length === 0 ? (
        <EmptyState>아직 포인트 내역이 없어요</EmptyState>
      ) : (
        <List>
          {logs.map((log) => (
            <Row key={log.id}>
              <RowInfo>
                <RowLabel>{log.label}</RowLabel>
                <RowDate>
                  {log.date}
                  {log.pending && <PendingTag>잠시 후 반영됩니다</PendingTag>}
                </RowDate>
              </RowInfo>
              <RowAmount positive={log.amount > 0}>
                {log.amount > 0 ? '+' : ''}
                {log.amount}P
              </RowAmount>
            </Row>
          ))}
        </List>
      )}
    </Page>
  )
}
