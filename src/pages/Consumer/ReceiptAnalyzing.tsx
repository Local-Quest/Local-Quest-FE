import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { FileText, Check, Circle } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 실제로는 서버에 업로드한 영수증 이미지의 AI 분석 결과(성공/실패)를
// polling 하거나 응답을 기다렸다가 그 결과에 따라 success/failure로 분기해야 함.
// 지금은 데모용으로 일정 시간 뒤 무조건 success로 이동함.
// ---------------------------------------------------------------------------

const ANALYZE_DELAY_MS = 1800

const checklist = [
  { label: '매장명 확인 완료', done: true },
  { label: '구매 금액 확인 완료', done: true },
  { label: '방문 시간대 검증 중…', done: false },
]

const spinKeyframes = `
  @keyframes receiptSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 100vh;
  padding: 0 40px;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const SpinnerWrap = styled.div`
  ${spinKeyframes}
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SpinnerRing = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 8px solid #f0e7dc;
  border-top-color: #f2913d;
  animation: receiptSpin 1s linear infinite;
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
  font-size: 18px;
  color: #1f1a15;
`

const Subtitle = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  color: #a2917f;
`

const Checklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 240px;
`

const ChecklistRow = styled.div<{ done: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => (p.done ? '#2d8c42' : '#c9b3a5')};
`

export function ReceiptAnalyzing() {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/missions/${id ?? '1'}/verify/success`, { replace: true })
    }, ANALYZE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [id, navigate])

  return (
    <Page>
      <SpinnerWrap>
        <SpinnerRing />
        <FileText size={40} color="#a2917f" />
      </SpinnerWrap>

      <TextBlock>
        <Title>영수증 분석 중</Title>
        <Subtitle>
          매장·금액·시간을 확인하고 있어요
          <br />
          잠시만 기다려 주세요
        </Subtitle>
      </TextBlock>

      <Checklist>
        {checklist.map((item) => (
          <ChecklistRow key={item.label} done={item.done}>
            {item.done ? <Check size={16} /> : <Circle size={14} />}
            {item.label}
          </ChecklistRow>
        ))}
      </Checklist>
    </Page>
  )
}
