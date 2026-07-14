import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { X } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 실패 사유는 실제로 POST /customer/missions/:id/verify 실패 응답에서
// 내려주는 사유 코드에 맞춰 아래 목록 중 해당하는 항목만(혹은 서버가 준 문구로) 표시해야 함.
// ---------------------------------------------------------------------------

const reasons = [
  { title: '유효하지 않은 영수증', desc: '매장명·금액을 인식할 수 없어요. 선명하게 다시 촬영해 주세요.' },
  { title: '이미 인증된 영수증', desc: '중복 인증은 불가해요. 다른 영수증으로 시도해 주세요.' },
  { title: '매장 반경 밖', desc: '매장에서 200m 이내에서 다시 시도해 주세요. (현재 1.2km)' },
  { title: '조건 미충족', desc: '최소 구매 1,000원 조건 미달이에요. (영수증 900원)' },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 24px 12px;
`

const FailIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background: #fbeae2;
  color: #d95c3a;
  margin-bottom: 8px;
`

const Title = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: #1f1a15;
  text-align: center;
`

const Subtitle = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #a2917f;
  text-align: center;
`

const ReasonList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 24px;
`

const ReasonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px 15px 15px 17px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-left: 3px solid #d95c3a;
`

const ReasonTitle = styled.p`
  font-weight: 600;
  font-size: 13px;
  color: #1f1a15;
`

const ReasonDesc = styled.p`
  font-weight: 400;
  font-size: 11px;
  color: #a2917f;
`

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px 24px;
`

const RetryButton = styled.button`
  height: 50px;
  border: none;
  border-radius: 14px;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`

const LaterButton = styled.button`
  height: 43px;
  border: none;
  background: none;
  color: #a2917f;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`

export function ReceiptFailure() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Page>
      <TopBlock>
        <FailIcon>
          <X size={36} strokeWidth={3} />
        </FailIcon>
        <Title>인증에 실패했어요</Title>
        <Subtitle>아래 사유를 확인 후 다시 시도해 주세요</Subtitle>
      </TopBlock>

      <ReasonList>
        {reasons.map((reason) => (
          <ReasonCard key={reason.title}>
            <ReasonTitle>{reason.title}</ReasonTitle>
            <ReasonDesc>{reason.desc}</ReasonDesc>
          </ReasonCard>
        ))}
      </ReasonList>

      <BottomBlock>
        <RetryButton type="button" onClick={() => navigate(`/missions/${id ?? '1'}/verify`, { replace: true })}>
          다시 촬영하기
        </RetryButton>
        <LaterButton type="button" onClick={() => navigate(`/missions/${id ?? '1'}`, { replace: true })}>
          나중에 하기
        </LaterButton>
      </BottomBlock>
    </Page>
  )
}
