import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트로 교체될 예정
// - GET /customer/points/history / GET /coupons/:id -> pointBalance, requiredPoints
// ---------------------------------------------------------------------------

const pointBalance = 200
const requiredPoints = 500

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(31, 26, 21, 0.5);
  display: flex;
  align-items: flex-end;
  font-family: 'Pretendard', sans-serif;
`

const Sheet = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 24px 32px;
  border-radius: 26px 26px 0 0;
  background: #fdfbf8;
`

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: #e6d5c9;
  margin-bottom: 20px;
`

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #fbeae2;
  color: #d95c3a;
  margin-bottom: 14px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 17px;
  color: #1f1a15;
  margin-bottom: 6px;
`

const Subtitle = styled.p`
  font-size: 12px;
  color: #a2917f;
  margin-bottom: 18px;
`

const Breakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`

const RowLabel = styled.span`
  color: #6d5f52;
`

const RowValue = styled.span<{ tone?: 'danger' }>`
  color: ${(p) => (p.tone === 'danger' ? '#d95c3a' : '#1f1a15')};
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #f1e9df;
`

const ShortageRow = styled(Row)`
  font-weight: 600;
  font-size: 14px;
`

const ShortageLabel = styled.span`
  color: #d95c3a;
`

const PrimaryButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 14px;
  background: #f2913d;
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 6px;
`

const CloseButton = styled.button`
  height: 43px;
  border: none;
  background: none;
  color: #a2917f;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`

export function InsufficientPointsSheet() {
  const navigate = useNavigate()
  const shortage = requiredPoints - pointBalance

  return (
    <Backdrop>
      <Sheet>
        <Handle />
        <IconWrap>
          <AlertCircle size={30} />
        </IconWrap>
        <Title>포인트가 부족해요</Title>
        <Subtitle>{shortage}P가 더 필요해요</Subtitle>
        <Breakdown>
          <Row>
            <RowLabel>보유 포인트</RowLabel>
            <RowValue>{pointBalance.toLocaleString()}P</RowValue>
          </Row>
          <Row>
            <RowLabel>필요 포인트</RowLabel>
            <RowValue>{requiredPoints.toLocaleString()}P</RowValue>
          </Row>
          <Divider />
          <ShortageRow>
            <ShortageLabel>부족분</ShortageLabel>
            <ShortageLabel>{shortage.toLocaleString()}P</ShortageLabel>
          </ShortageRow>
        </Breakdown>
        <PrimaryButton type="button" onClick={() => navigate('/missions')}>
          미션하고 포인트 모으기
        </PrimaryButton>
        <CloseButton type="button" onClick={() => navigate(-1)}>
          닫기
        </CloseButton>
      </Sheet>
    </Backdrop>
  )
}
