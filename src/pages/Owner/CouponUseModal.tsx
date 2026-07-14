import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): POST /owner/coupons/:id/use -> {holderId}
// 처리 후 즉시 만료되며 되돌릴 수 없음 (네트워크 재시도해도 중복 차감 방지 필요)
// ---------------------------------------------------------------------------

const target = {
  couponTitle: '아메리카노 20% 할인',
  holderName: '민수',
  holderTag: '#U8231',
  purchasedAt: '01.12',
  code: 'AMER-20-8KF3',
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(31, 26, 21, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: calc(100% - 48px);
  max-width: 340px;
  padding: 26px 22px;
  border-radius: 22px;
  background: #fdfbf8;
`

const Title = styled.p`
  font-size: 17px;
  color: #1f1a15;
  text-align: center;
  margin-bottom: 14px;
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border-radius: 14px;
  background: #f9f7f4;
  margin-bottom: 12px;
`

const InfoTitle = styled.p`
  font-size: 14px;
  color: #1f1a15;
`

const InfoDesc = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const NoticeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fef8f0;
  color: #8b5a2b;
  font-size: 11px;
  margin-bottom: 16px;
`

const ConfirmButton = styled.button`
  height: 46px;
  border: none;
  border-radius: 12px;
  background: #1f1a15;
  color: #fdfbf8;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 2px;
`

const CancelButton = styled.button`
  height: 41px;
  border: none;
  background: none;
  color: #a2917f;
  font-size: 13px;
  cursor: pointer;
`

export function CouponUseModal() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Backdrop>
      <Card>
        <Title>쿠폰을 사용 처리할까요?</Title>
        <InfoBox>
          <InfoTitle>{target.couponTitle}</InfoTitle>
          <InfoDesc>
            {target.holderName} {target.holderTag} · {target.purchasedAt} 구매 · {target.code}
          </InfoDesc>
        </InfoBox>
        <NoticeBox>
          <AlertCircle size={18} />
          처리 후에는 즉시 만료되며 되돌릴 수 없어요
        </NoticeBox>
        <ConfirmButton
          type="button"
          onClick={() => navigate(`/owner/coupons/${id ?? '1'}/use/complete`, { replace: true })}
        >
          사용 처리
        </ConfirmButton>
        <CancelButton type="button" onClick={() => navigate(-1)}>
          취소
        </CancelButton>
      </Card>
    </Backdrop>
  )
}
