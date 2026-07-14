import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Gift } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 오늘 미션 5개(게이지 100%) 채웠을 때 뜨는 특별 완료 모달.
// - 영수증 인증 성공 응답에서 todayProgress가 max에 도달하면 이 화면으로 분기
// - GET /customer/points/history -> earnedPoints, bonusPoints, todayCompleteCount
// ---------------------------------------------------------------------------

const result = {
  earnedPoints: 500,
  bonusPoints: 50,
  todayCompleteCount: 3,
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(31, 26, 21, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: calc(100% - 40px);
  max-width: 350px;
  padding: 32px 26px;
  border-radius: 28px;
  background: #fdfbf8;
  box-shadow: 0px 24px 60px -12px rgba(31, 26, 21, 0.5);
`

const Eyebrow = styled.p`
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1.3px;
  color: #f2913d;
  text-align: center;
`

const Title = styled.p`
  font-weight: 700;
  font-size: 22px;
  color: #1f1a15;
  text-align: center;
  padding-bottom: 14px;
`

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  margin-bottom: 14px;
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: linear-gradient(160deg, #f2913d 11%, #e0742a 89%);
  box-shadow: 0px 16px 36px -8px rgba(242, 145, 61, 0.55);
  color: #fdfbf8;
`

const PointsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: #f3e4d7;
  margin-bottom: 14px;
`

const PointsLabel = styled.p`
  font-size: 12px;
  color: #8b7565;
`

const PointsValue = styled.p`
  font-weight: 700;
  font-size: 34px;
  color: #1f1a15;

  span {
    font-size: 20px;
  }
`

const PointsHint = styled.p`
  font-size: 11px;
  color: #2d8c42;
`

const ClaimButton = styled.button`
  width: 100%;
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

const FootNote = styled.p`
  font-size: 11px;
  color: #c9b3a5;
  text-align: center;
  line-height: 1.5;
`

export function MissionCompleteModal() {
  const navigate = useNavigate()

  return (
    <Backdrop>
      <Card>
        <Eyebrow>MISSION COMPLETE</Eyebrow>
        <Title>오늘 미션 5개 완주!</Title>
        <IconWrap>
          <IconBox>
            <Gift size={64} />
          </IconBox>
        </IconWrap>
        <PointsBox>
          <PointsLabel>획득 포인트</PointsLabel>
          <PointsValue>
            +{result.earnedPoints}
            <span>P</span>
          </PointsValue>
          <PointsHint>
            보너스 상자 +{result.bonusPoints}P 포함 · 오늘 {result.todayCompleteCount}번째 완주
          </PointsHint>
        </PointsBox>
        <ClaimButton type="button" onClick={() => navigate('/', { replace: true })}>
          받기
        </ClaimButton>
        <FootNote>
          받은 후 게이지는 0으로 초기화되며
          <br />
          이어서 새 미션을 수행할 수 있어요
        </FootNote>
      </Card>
    </Backdrop>
  )
}
