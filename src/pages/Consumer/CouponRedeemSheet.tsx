import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트들로 교체될 예정
// - GET /coupons/:id            -> couponName, storeName, expireLabel, costPoints
// - GET /customer/points/history -> pointBalance
// - POST /customer/coupons/:id/redeem -> "교환하기" 버튼 액션
// 보유 포인트 < 필요 포인트일 경우 /coupons/:id/redeem/insufficient 로 이동해야 함
// ---------------------------------------------------------------------------

const coupon = {
  title: '아메리카노 20% 할인',
  storeName: '블루보틀 성수',
  expireLabel: '30일 이내 사용',
  costPoints: 500,
}
const pointBalance = 1200

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
  padding: 24px 24px 32px;
  border-radius: 26px 26px 0 0;
  background: #fdfbf8;
`

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: #e6d5c9;
  align-self: center;
  margin-bottom: 20px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 17px;
  color: #1f1a15;
  text-align: center;
  padding-bottom: 18px;
`

const CouponBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
  border-radius: 16px;
  background: #f9f7f4;
  margin-bottom: 16px;
`

const CouponName = styled.p`
  font-size: 14px;
  color: #1f1a15;
`

const CouponMeta = styled.p`
  font-size: 11px;
  color: #a2917f;
`

const Breakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background: #f1e9df;
`

const TotalRow = styled(Row)`
  font-weight: 600;
  font-size: 14px;
`

const ConfirmButton = styled.button`
  height: 50px;
  border: none;
  border-radius: 14px;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 6px;
`

const CancelButton = styled.button`
  height: 43px;
  border: none;
  background: none;
  color: #a2917f;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`

export function CouponRedeemSheet() {
  const navigate = useNavigate()
  const { id } = useParams()
  const remaining = pointBalance - coupon.costPoints
  const canAfford = remaining >= 0

  const handleConfirm = () => {
    if (!canAfford) {
      navigate(`/coupons/${id ?? '1'}/redeem/insufficient`, { replace: true })
      return
    }
    navigate('/coupons', { replace: true })
  }

  return (
    <Backdrop>
      <Sheet>
        <Handle />
        <Title>포인트로 교환할까요?</Title>
        <CouponBox>
          <CouponName>{coupon.title}</CouponName>
          <CouponMeta>
            {coupon.storeName} · {coupon.expireLabel}
          </CouponMeta>
        </CouponBox>
        <Breakdown>
          <Row>
            <RowLabel>보유 포인트</RowLabel>
            <RowValue>{pointBalance.toLocaleString()}P</RowValue>
          </Row>
          <Row>
            <RowLabel>교환 차감</RowLabel>
            <RowValue tone="danger">-{coupon.costPoints.toLocaleString()}P</RowValue>
          </Row>
          <Divider />
          <TotalRow>
            <RowLabel>교환 후 잔액</RowLabel>
            <RowValue>{Math.max(remaining, 0).toLocaleString()}P</RowValue>
          </TotalRow>
        </Breakdown>
        <ConfirmButton type="button" onClick={handleConfirm}>
          교환하기
        </ConfirmButton>
        <CancelButton type="button" onClick={() => navigate(-1)}>
          취소
        </CancelButton>
      </Sheet>
    </Backdrop>
  )
}
