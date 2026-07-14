import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Wallet, Clock, CheckCircle2, Navigation, Camera } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트로 교체될 예정
// - GET /customer/missions/:id  -> mission 상세(사진, 조건, 보상, 매장 위치 등)
// ---------------------------------------------------------------------------

const mission = {
  storeName: '블루보틀 성수',
  category: '카페',
  rating: 4.8,
  reviewCount: 213,
  address: '서울 성동구 아차산로 · 도보 3분(210m)',
  rewardPoints: 100,
  bonusBenefit: '아메리카노 사이즈업 무료',
  conditions: [
    { icon: Wallet, text: '1만원 이상 결제 후 영수증 인증' },
    { icon: Clock, text: '방문 가능 시간 11:00 ~ 20:00' },
    { icon: CheckCircle2, text: '하루 1회 · 반경 100m 이내에서 인증' },
  ],
  walkLabel: '도보 3분',
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  font-family: 'Pretendard', sans-serif;
  background: #fff8f4;
  min-height: 100vh;
`

const HeroImage = styled.div`
  position: relative;
  height: 230px;
  overflow: hidden;
  background: repeating-linear-gradient(135deg, #efe4d8 0 2px, #f6efe6 2px 4px);
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(58, 43, 34, 0) 34%, rgba(58, 43, 34, 0.35) 60%, rgba(58, 43, 34, 0.72) 100%);
`

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  top: 52px;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: rgba(58, 43, 34, 0.4);
  backdrop-filter: blur(2px);
  color: #fff8f4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const HeroText = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const HeroTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

const CategoryTag = styled.span`
  background: #fdb689;
  color: #3a2b22;
  font-weight: 600;
  font-size: 10.5px;
  padding: 3px 9px;
  border-radius: 7px;
`

const RatingText = styled.span`
  color: #fff8f4;
  font-weight: 600;
  font-size: 11px;
`

const StoreName = styled.p`
  color: #fff8f4;
  font-weight: 800;
  font-size: 23px;
  letter-spacing: -0.46px;
`

const AddressText = styled.p`
  color: rgba(255, 248, 244, 0.85);
  font-weight: 500;
  font-size: 12px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 18px;
`

const RewardCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 18px;
  border-radius: 16px;
  background: #3a2b22;
`

const RewardCol = styled.div<{ align?: 'end' }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: ${(p) => (p.align === 'end' ? 'flex-end' : 'flex-start')};
`

const RewardLabel = styled.span`
  color: #c9a289;
  font-weight: 600;
  font-size: 11px;
`

const RewardValue = styled.span`
  color: #fdb689;
  font-weight: 800;
  font-size: 24px;
`

const BonusValue = styled.span`
  color: #fff8f4;
  font-weight: 700;
  font-size: 13px;
  text-align: right;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`

const SectionTitle = styled.p`
  font-weight: 800;
  font-size: 14px;
  color: #3a2b22;
`

const ConditionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  color: #5c4636;
`

const ConditionText = styled.span`
  font-weight: 500;
  font-size: 13px;
`

const RouteBox = styled.div`
  position: relative;
  height: 122px;
  border: 1px solid #efe0d4;
  border-radius: 14px;
  overflow: hidden;
  background: #f5f0e8;
`

const RouteDot = styled.div`
  position: absolute;
  left: 14%;
  bottom: 12%;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #3a2b22;
  border: 3px solid #ffffff;
`

const RoutePin = styled.div`
  position: absolute;
  right: 30%;
  top: -6%;
  color: #e5a67d;
`

const WalkLabel = styled.div`
  position: absolute;
  right: 12px;
  bottom: 10px;
  background: #ffffff;
  border: 1px solid #efe0d4;
  border-radius: 9px;
  padding: 6px 11px;
  font-weight: 700;
  font-size: 11px;
  color: #6a4c3a;
`

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 18px;
`

const NavigateButton = styled.button`
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 15px;
  border: 1px solid #efe0d4;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3a2b22;
`

const VerifyButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 15px;
  background: #3a2b22;
  color: #fff8f4;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  padding: 16px;
`

export function MissionDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Page>
      <HeroImage>
        <HeroOverlay />
        <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </BackButton>
        <HeroText>
          <HeroTopRow>
            <CategoryTag>{mission.category}</CategoryTag>
            <RatingText>
              ★ {mission.rating} · 리뷰 {mission.reviewCount}
            </RatingText>
          </HeroTopRow>
          <StoreName>{mission.storeName}</StoreName>
          <AddressText>{mission.address}</AddressText>
        </HeroText>
      </HeroImage>

      <Content>
        <RewardCard>
          <RewardCol>
            <RewardLabel>방문 인증 시 지급</RewardLabel>
            <RewardValue>+{mission.rewardPoints}P</RewardValue>
          </RewardCol>
          <RewardCol align="end">
            <RewardLabel>함께 받는 혜택</RewardLabel>
            <BonusValue>{mission.bonusBenefit}</BonusValue>
          </RewardCol>
        </RewardCard>

        <Section>
          <SectionTitle>미션 조건</SectionTitle>
          {mission.conditions.map(({ icon: Icon, text }) => (
            <ConditionRow key={text}>
              <Icon size={19} />
              <ConditionText>{text}</ConditionText>
            </ConditionRow>
          ))}
        </Section>

        <Section>
          <SectionTitle>찾아가는 길</SectionTitle>
          <RouteBox>
            <RoutePin>
              <Navigation size={30} fill="#e5a67d" />
            </RoutePin>
            <RouteDot />
            <WalkLabel>{mission.walkLabel}</WalkLabel>
          </RouteBox>
        </Section>
      </Content>

      <ActionRow>
        <NavigateButton type="button" aria-label="길찾기">
          <Navigation size={22} />
        </NavigateButton>
        <VerifyButton type="button" onClick={() => navigate(`/missions/${id ?? '1'}/verify`)}>
          <Camera size={20} />
          영수증으로 인증하기
        </VerifyButton>
      </ActionRow>
    </Page>
  )
}
