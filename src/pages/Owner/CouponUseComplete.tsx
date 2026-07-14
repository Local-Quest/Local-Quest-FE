import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): POST /owner/coupons/:id/use 성공 응답 -> holderName, holderTag, processedAt, couponTitle
// ---------------------------------------------------------------------------

const result = {
  holderName: '민수',
  holderTag: '#U8231',
  processedAt: '01.14 15:22',
  couponTitle: '아메리카노 20% 할인',
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  min-height: 100vh;
  padding: 0 24px;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 44px;
  background: #2d8c42;
  color: #fdfbf8;
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`

const Title = styled.p`
  font-size: 20px;
  color: #1f1a15;
`

const Subtitle = styled.p`
  font-size: 13px;
  color: #a2917f;
`

const CouponBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 342px;
  padding: 16px;
  border-radius: 16px;
  background: #f9f7f4;
  overflow: hidden;
`

const CouponTitle = styled.p`
  font-size: 13px;
  color: #1f1a15;
`

const CouponDesc = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const ExpiredStamp = styled.span`
  position: absolute;
  right: 12px;
  top: 12px;
  transform: rotate(8deg);
  padding: 4px 10px;
  border: 2px solid #c9b3a5;
  border-radius: 6px;
  color: #c9b3a5;
  font-size: 11px;
`

const WarningBox = styled.div`
  width: 100%;
  max-width: 342px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fbeae2;
  color: #d95c3a;
  font-size: 11px;
  text-align: center;
  line-height: 1.5;
`

const ListButton = styled.button`
  width: 100%;
  max-width: 342px;
  height: 50px;
  border: none;
  border-radius: 14px;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`

export function CouponUseComplete() {
  const navigate = useNavigate()

  return (
    <Page>
      <SuccessIcon>
        <Check size={44} strokeWidth={3} />
      </SuccessIcon>

      <TextBlock>
        <Title>사용 처리 완료</Title>
        <Subtitle>
          {result.holderName} {result.holderTag} · {result.processedAt} 처리
        </Subtitle>
      </TextBlock>

      <CouponBox>
        <CouponTitle>{result.couponTitle}</CouponTitle>
        <CouponDesc>만료 처리됨 · 재사용 불가</CouponDesc>
        <ExpiredStamp>만료</ExpiredStamp>
      </CouponBox>

      <WarningBox>
        이미 사용됐거나 기간이 지난 쿠폰은 처리할 수 없어요. 네트워크 오류 시 재시도해도 중복 차감되지 않아요.
      </WarningBox>

      <ListButton type="button" onClick={() => navigate('/owner/coupons', { replace: true })}>
        목록으로
      </ListButton>
    </Page>
  )
}
