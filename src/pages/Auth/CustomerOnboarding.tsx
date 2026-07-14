import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OnboardingCarousel } from '@/components/OnboardingCarousel'
import { ProgressRing } from '@/components/ProgressRing'
import { colors } from '@/styles/tokens'

const HeroText = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  line-height: 1.4;
  color: ${colors.black};

  span {
    color: ${colors.orange500};
  }
`

const CaptionText = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  line-height: 1.4;
  color: #656371;
  margin-top: 20px;

  span {
    color: ${colors.orange500};
  }
`

const SlideColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const TodayCardPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
  border: 1px solid ${colors.orange600};
  border-radius: 20px;
  background: ${colors.greenLight};
`

const TodayCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const TodayCardLabel = styled.p`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 12px;
  color: ${colors.brown800};
`

const TodayCardHeadline = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 17px;
  color: ${colors.blue800};

  span {
    color: ${colors.orangeText};
  }
`

const RingValue = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  white-space: nowrap;

  span:first-of-type {
    font-size: 20px;
    color: ${colors.orange500};
  }
  span:last-of-type {
    font-size: 13px;
    color: #656371;
  }
`

const StatsCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #f0e7dc;
  border-radius: 20px;
  padding: 18px 0;
`

const StatCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & + & {
    border-left: 1px solid #f1e9df;
  }
`

const StatValue = styled.p`
  font-family: 'Pretendard';
  font-weight: 800;
  font-size: 19px;
  color: #1f1a15;
`

const StatLabel = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 10px;
  color: #a2917f;
`

const MapPreview = styled.div`
  width: 100%;
  max-width: 240px;
  max-height: 200px;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

/** 손님용 온보딩 캐러셀 (피그마 손님1~4 슬라이드 내용) */
export function CustomerOnboarding() {
  const navigate = useNavigate()

  const slides = [
    <HeroText key="s1">
      우리 동네 <span>숨겨진 장소</span>
      <br />
      매일 5개 이상의 <span>퀘스트</span>로
      <br />
      찾아가기
    </HeroText>,

    <SlideColumn key="s2">
      <TodayCardPreview>
        <TodayCardText>
          <TodayCardLabel>오늘의 진척도</TodayCardLabel>
          <TodayCardHeadline>
            미션 2개만 더 하면
            <br />
            <span>500P 획득</span>
          </TodayCardHeadline>
        </TodayCardText>
        <ProgressRing value={3} max={5} size={72} thickness={6}>
          <RingValue>
            <span>3</span>
            <span>/5</span>
          </RingValue>
        </ProgressRing>
      </TodayCardPreview>
      <CaptionText>
        5개의 <span>퀘스트</span>를 할 때마다
        <br />
        포인트를 받아요.
      </CaptionText>
    </SlideColumn>,

    <SlideColumn key="s3">
      <StatsCard>
        <StatCol>
          <StatValue>12</StatValue>
          <StatLabel>포인트 받은 횟수</StatLabel>
        </StatCol>
        <StatCol>
          <StatValue>1,240</StatValue>
          <StatLabel>누적 포인트</StatLabel>
        </StatCol>
        <StatCol>
          <StatValue>47</StatValue>
          <StatLabel>완료 미션</StatLabel>
        </StatCol>
      </StatsCard>
      <CaptionText>
        받은 <span>포인트</span>로는
        <br />
        여러 혜택 상품을 살 수 있어요.
      </CaptionText>
    </SlideColumn>,

    <SlideColumn key="s4">
      <MapPreview>
        <img src="/map.png" alt="" />
      </MapPreview>
      <CaptionText>
        가까운 <span>사장님</span>의 퀘스트부터
        <br />
        시작해 보세요.
      </CaptionText>
    </SlideColumn>,
  ]

  return <OnboardingCarousel slides={slides} onFinish={() => navigate('/welcome')} />
}
