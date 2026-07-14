import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OnboardingCarousel } from '@/components/OnboardingCarousel'
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
`

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 12px;
  border: 1px solid #f0e7dc;
  border-radius: 14px;
`

const StatLabel = styled.p`
  font-family: 'Pretendard';
  font-size: 11px;
  text-align: center;
  color: #a2917f;
`

const StatValue = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  color: #1f1a15;
`

const StatDelta = styled.p`
  font-family: 'Pretendard';
  font-size: 10px;
  text-align: center;
  color: #c9b3a5;
`

const CategoryTitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 12px;
  color: #1f1a15;
  align-self: flex-start;
  margin-bottom: 8px;
`

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
`

const CategoryChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 4px;
  border: 1px solid #f0e7dc;
  border-radius: 10px;
  background: #fdfbf8;
  font-family: 'Pretendard';
  font-size: 11px;
  text-align: center;
  color: #1f1a15;
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

const CATEGORIES = ['☕ 카페', '🍔 음식', '🏪 편의점', '🍰 베이커리', '🍜 라면/주점', '💇 미용', '🎬 영화/놀이', '🎵 문화생활', '⚽ 스포츠']

const STATS = [
  { label: '오늘 방문', value: '12', delta: '↑ 어제 대비 +3' },
  { label: '완료 미션', value: '8', delta: '↑ 어제 대비 +2' },
  { label: '판매 쿠폰', value: '5', delta: '3개 품절' },
  { label: '예상 수익(포인트)', value: '2.4M', delta: '월간' },
]

/** 사장님용 온보딩 캐러셀 (피그마 사장1~4 슬라이드 내용) */
export function OwnerOnboarding() {
  const navigate = useNavigate()

  const slides = [
    <HeroText key="o1">
      우리 가게 <span>퀘스트</span>로
      <br />
      홍보하기
    </HeroText>,

    <SlideColumn key="o2">
      <StatsGrid>
        {STATS.map((s) => (
          <StatCard key={s.label}>
            <StatLabel>{s.label}</StatLabel>
            <StatValue>{s.value}</StatValue>
            <StatDelta>{s.delta}</StatDelta>
          </StatCard>
        ))}
      </StatsGrid>
      <CaptionText>
        손님들의 <span>정보</span>를<br />한눈에 볼 수 있어요.
      </CaptionText>
    </SlideColumn>,

    <SlideColumn key="o3">
      <CategoryTitle>미션 카테고리</CategoryTitle>
      <CategoryGrid>
        {CATEGORIES.map((c) => (
          <CategoryChip key={c}>{c}</CategoryChip>
        ))}
      </CategoryGrid>
      <CaptionText>
        <span>카테고리</span> 별로 미션을
        <br />
        설정할 수 있어요.
      </CaptionText>
    </SlideColumn>,

    <SlideColumn key="o4">
      <MapPreview>
        <img src="/map.png" alt="" />
      </MapPreview>
      <CaptionText>
        <span>가게 주위</span>의 손님에게
        <br />
        퀘스트가 뜰거에요.
      </CaptionText>
    </SlideColumn>,
  ]

  return (
    <OnboardingCarousel slides={slides} onFinish={() => navigate('/owner/welcome')} finishLabel="퀘스트 등록하기" />
  )
}
