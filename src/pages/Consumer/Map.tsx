import styled from '@emotion/styled'
import { Search, MapPin, LocateFixed, ChevronRight } from 'lucide-react'
import { PointsBadge } from '@/components/PointsBadge'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트들로 교체될 예정
// - GET /customer/points/history          -> pointBalance
// - GET /stores/nearby?category=&lat=&lng= -> 지도 마커, 하단 매장 카드
// - 카카오 로컬(지도) API 연동 후 MapArea를 실제 지도 컴포넌트로 교체 예정
// ---------------------------------------------------------------------------

const pointBalance = 1240
const categories = ['전체', '카페', '베이커리', '편의점']

const nearbyStore = {
  name: '블루보틀 성수',
  category: '카페',
  distance: '100m',
  status: '미션 진행중',
  eventLabel: '진행 중 이벤트 · 아메리카노 사이즈업 무료',
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  font-family: 'Pretendard', sans-serif;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.p`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.66px;
  color: #1f1a15;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-radius: 14px;
`

const SearchPlaceholder = styled.p`
  font-weight: 500;
  font-size: 13px;
  color: #bcaa99;
`

const CategoryRow = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const CategoryChip = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.active ? '#1f1a15' : 'none')};
  color: ${(p) => (p.active ? '#fdfbf8' : '#a2917f')};
  font-weight: ${(p) => (p.active ? 700 : 600)};
  font-size: 13px;
  border-radius: 18px;
  padding: ${(p) => (p.active ? '7px 14px' : '7px 0')};
`

/** 실제 지도 SDK(카카오맵) 연동 전까지의 자리표시자 */
const MapArea = styled.div`
  position: relative;
  height: 300px;
  border: 1px solid #f0e7dc;
  border-radius: 22px;
  overflow: hidden;
  background:
    repeating-linear-gradient(0deg, rgba(31, 26, 21, 0.05) 0 1px, transparent 1px 64px),
    repeating-linear-gradient(90deg, rgba(31, 26, 21, 0.05) 0 1px, transparent 1px 64px),
    #f5f0e8;
`

const Pin = styled(MapPin)`
  position: absolute;
  filter: drop-shadow(0 2px 3px rgba(31, 26, 21, 0.2));
`

const MyLocationDot = styled.div`
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1f1a15;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 5px rgba(31, 26, 21, 0.14);
`

const LocateButton = styled.button`
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(31, 26, 21, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1f1a15;
`

const StoreCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-radius: 20px;
`

const StoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const StoreName = styled.p`
  font-weight: 700;
  font-size: 15.5px;
  color: #1f1a15;
`

const StoreMeta = styled.p`
  font-weight: 400;
  font-size: 12.5px;
  color: #a2917f;
`

const GoButton = styled.button`
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 600;
  font-size: 12.5px;
  padding: 11px 16px;
  border-radius: 22px;
`

const EventRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 14px;
  border-top: 1px solid #f4ece2;
  background: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  cursor: pointer;
`

const EventLabel = styled.p`
  font-weight: 500;
  font-size: 12.5px;
  color: #6d5f52;
`

export function Map() {
  return (
    <Page>
      <Header>
        <Title>지도</Title>
        <PointsBadge points={pointBalance} />
      </Header>

      <SearchBar>
        <Search size={17} color="#bcaa99" />
        <SearchPlaceholder>매장명, 카테고리 검색</SearchPlaceholder>
      </SearchBar>

      <CategoryRow>
        {categories.map((c, i) => (
          <CategoryChip key={c} active={i === 0} type="button">
            {c}
          </CategoryChip>
        ))}
      </CategoryRow>

      <MapArea>
        <Pin size={24} color="#e5a67d" fill="#fee8da" style={{ left: '62%', top: '20%' }} />
        <Pin size={22} color="#e5a67d" fill="#fee8da" style={{ left: '22%', top: '40%' }} />
        <Pin size={22} color="#e5a67d" fill="#fee8da" style={{ left: '12%', top: '58%' }} />
        <Pin size={22} color="#e5a67d" fill="#fee8da" style={{ left: '58%', top: '66%' }} />
        <MyLocationDot />
        <LocateButton type="button" aria-label="내 위치로 이동">
          <LocateFixed size={18} />
        </LocateButton>
      </MapArea>

      <StoreCard>
        <StoreRow>
          <StoreInfo>
            <StoreName>{nearbyStore.name}</StoreName>
            <StoreMeta>
              {nearbyStore.category} · {nearbyStore.distance} · {nearbyStore.status}
            </StoreMeta>
          </StoreInfo>
          <GoButton type="button">미션 보기</GoButton>
        </StoreRow>
        <EventRow type="button">
          <EventLabel>{nearbyStore.eventLabel}</EventLabel>
          <ChevronRight size={16} color="#c9b3a5" />
        </EventRow>
      </StoreCard>
    </Page>
  )
}
