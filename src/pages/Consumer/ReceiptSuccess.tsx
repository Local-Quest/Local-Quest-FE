import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 응답으로 교체될 예정
// - POST /customer/missions/:id/verify 성공 응답 -> storeName, earnedPoints, todayProgress
// ---------------------------------------------------------------------------

const result = {
  storeName: '블루보틀 성수',
  earnedPoints: 100,
  todayProgress: { completed: 3, max: 5 },
  nextRewardHint: '2개만 더 채우면 500P!',
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  min-height: 100vh;
  padding: 0 15px;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background: #2d8c42;
  color: #fdfbf8;
  box-shadow: 0px 12px 32px -8px rgba(45, 140, 66, 0.5);
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`

const Title = styled.p`
  font-weight: 700;
  font-size: 22px;
  color: #1f1a15;
`

const Subtitle = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #a2917f;
`

const ProgressCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 360px;
  padding: 21px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
`

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ProgressLabel = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: #6d5f52;
`

const ProgressValue = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #f2913d;
`

const SegmentRow = styled.div`
  display: flex;
  gap: 6px;
`

const Segment = styled.div<{ state: 'filled' | 'current' | 'empty' }>`
  flex: 1;
  height: 10px;
  border-radius: 5px;
  background: ${(p) => (p.state === 'empty' ? '#f0e7dc' : p.state === 'current' ? '#f2913d' : '#2d8c42')};
  box-shadow: ${(p) => (p.state === 'current' ? '0 0 0 3px rgba(242, 145, 61, 0.2)' : 'none')};
`

const RewardHint = styled.p`
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: #2d8c42;
`

const ConfirmButton = styled.button`
  width: 100%;
  max-width: 360px;
  height: 50px;
  border: none;
  border-radius: 14px;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`

export function ReceiptSuccess() {
  const navigate = useNavigate()
  const { completed, max } = result.todayProgress

  return (
    <Page>
      <SuccessIcon>
        <Check size={48} strokeWidth={3} />
      </SuccessIcon>

      <TextBlock>
        <Title>인증 완료!</Title>
        <Subtitle>{result.storeName} 미션을 완료했어요</Subtitle>
      </TextBlock>

      <ProgressCard>
        <ProgressRow>
          <ProgressLabel>오늘의 미션 진척도</ProgressLabel>
          <ProgressValue>
            {completed}/{max}
          </ProgressValue>
        </ProgressRow>
        <SegmentRow>
          {Array.from({ length: max }).map((_, i) => (
            <Segment
              key={i}
              state={i < completed - 1 ? 'filled' : i === completed - 1 ? 'current' : 'empty'}
            />
          ))}
        </SegmentRow>
        <RewardHint>
          +{result.earnedPoints}P 적립 · {result.nextRewardHint}
        </RewardHint>
      </ProgressCard>

      <ConfirmButton type="button" onClick={() => navigate('/', { replace: true })}>
        확인
      </ConfirmButton>
    </Page>
  )
}
