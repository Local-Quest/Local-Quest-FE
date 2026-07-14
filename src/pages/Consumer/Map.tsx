import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Search, LocateFixed, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PointsBadge } from '@/components/PointsBadge'

// ---------------------------------------------------------------------------
// 지도: Leaflet + OpenStreetMap(무료, 키 불필요)로 실제 지도를 렌더링한다.
// 현재 위치는 브라우저 Geolocation, 주변 매장은 아래 목데이터 좌표(서버 /stores/nearby 대체).
// TODO(API 연동): 서버 복구 시 GET /stores/nearby?category=&lat=&lng= 로 stores 교체.
// ---------------------------------------------------------------------------

const pointBalance = 1240
const categories = ['전체', '카페', '베이커리', '편의점', '꽃집']
const RADIUS_M = 1000 // 반경 1km

// 위치 권한 거부 시 폴백 좌표(대전 유성구 일대)
const DEFAULT_CENTER: [number, number] = [36.3623, 127.3562]

interface Store {
  id: string
  name: string
  category: string
  lat: number
  lng: number
  distanceM: number
  status: string
  eventLabel?: string
}

// 매장은 현재 위치(또는 폴백 중심) 기준 상대 오프셋(북쪽 m, 동쪽 m)으로 배치한다.
// 이렇게 하면 사용자가 어디에 있든 항상 "내 주변"에 매장이 뜨고, 1km 밖 매장은 필터로 걸러진다.
interface StoreTemplate {
  id: string
  name: string
  category: string
  northM: number
  eastM: number
  status: string
  eventLabel?: string
}

const storeTemplates: StoreTemplate[] = [
  { id: '1', name: '성심당 유성점', category: '베이커리', northM: 120, eastM: 90, status: '미션 진행중', eventLabel: '진행 중 이벤트 · 갓 구운 빵 20% 할인' },
  { id: '2', name: '스타벅스 유성온천역점', category: '카페', northM: -180, eastM: 220, status: '미션 진행중', eventLabel: '진행 중 이벤트 · 아메리카노 사이즈업 무료' },
  { id: '3', name: 'GS25 봉명점', category: '편의점', northM: 260, eastM: -140, status: '미션 진행중' },
  { id: '4', name: '플로라 유성 꽃집', category: '꽃집', northM: -320, eastM: -280, status: '미션 진행중', eventLabel: '진행 중 이벤트 · 미니 꽃다발 증정' },
  { id: '5', name: '투썸플레이스 궁동점', category: '카페', northM: 430, eastM: 360, status: '미션 진행중' },
  { id: '6', name: 'CU 유성구청점', category: '편의점', northM: -560, eastM: 470, status: '미션 진행중' },
  { id: '7', name: '파리바게뜨 지족점', category: '베이커리', northM: 640, eastM: -680, status: '미션 진행중', eventLabel: '진행 중 이벤트 · 케이크 10% 할인' },
  // 1km 밖(필터로 제외되는 것을 확인용): 반경 밖 매장
  { id: '8', name: '대전역 명물 국밥', category: '분식', northM: 1400, eastM: 900, status: '미션 진행중' },
]

/** 중심 좌표 + 미터 오프셋 -> 실제 위경도로 변환하고 거리(m)를 계산해 Store 생성 */
function buildStores(center: [number, number]): Store[] {
  const latPerM = 1 / 111_000
  const lngPerM = 1 / (111_320 * Math.cos((center[0] * Math.PI) / 180))
  return storeTemplates.map((t) => ({
    id: t.id,
    name: t.name,
    category: t.category,
    lat: center[0] + t.northM * latPerM,
    lng: center[1] + t.eastM * lngPerM,
    distanceM: Math.round(Math.hypot(t.northM, t.eastM)),
    status: t.status,
    eventLabel: t.eventLabel,
  }))
}

function formatDistance(m: number): string {
  return m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m}m`
}

// Leaflet 기본 마커 이미지는 번들러에서 경로가 깨지므로 divIcon으로 직접 그린다.
function storeIcon(active: boolean): L.DivIcon {
  const color = active ? '#1f1a15' : '#e5853d'
  return L.divIcon({
    className: 'lq-store-pin',
    html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid #fff;box-shadow:0 2px 4px rgba(31,26,21,.3)"></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  })
}

const myLocationIcon = L.divIcon({
  className: 'lq-my-pin',
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#2f6bff;border:3px solid #fff;box-shadow:0 0 0 4px rgba(47,107,255,.25)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

/** 현재 위치가 잡히면 지도 중심을 그쪽으로 이동시키는 헬퍼 컴포넌트 */
function Recenter({ center }: { center: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, map.getZoom())
  }, [center, map])
  return null
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

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #1f1a15;

  &::placeholder {
    color: #bcaa99;
  }
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

const MapArea = styled.div`
  position: relative;
  height: 300px;
  border: 1px solid #f0e7dc;
  border-radius: 22px;
  overflow: hidden;

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: #f5f0e8;
  }
`

const LocateButton = styled.button`
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 500;
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

const EmptyCard = styled.div`
  padding: 22px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-radius: 20px;
  font-weight: 500;
  font-size: 13px;
  color: #a2917f;
`

export function Map() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('전체')
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null)
  const [selectedId, setSelectedId] = useState<string>(storeTemplates[0].id)

  const center = myLocation ?? DEFAULT_CENTER

  const locate = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setMyLocation([pos.coords.latitude, pos.coords.longitude]),
      () => setMyLocation(null), // 거부/실패 시 기본 좌표 유지
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  useEffect(locate, [])

  const visibleStores = useMemo(() => {
    const q = query.trim().toLowerCase()
    return buildStores(center).filter((s) => {
      const withinRadius = s.distanceM <= RADIUS_M // 1km 이내만
      const matchesCategory = category === '전체' || s.category === category
      const matchesQuery = q === '' || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      return withinRadius && matchesCategory && matchesQuery
    })
  }, [query, category, center])

  const selectedStore = visibleStores.find((s) => s.id === selectedId) ?? visibleStores[0] ?? null

  return (
    <Page>
      <Header>
        <Title>지도</Title>
        <PointsBadge points={pointBalance} />
      </Header>

      <SearchBar>
        <Search size={17} color="#bcaa99" />
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="매장명, 카테고리 검색"
          aria-label="매장 검색"
        />
      </SearchBar>

      <CategoryRow>
        {categories.map((c) => (
          <CategoryChip key={c} active={category === c} type="button" onClick={() => setCategory(c)}>
            {c}
          </CategoryChip>
        ))}
      </CategoryRow>

      <MapArea>
        <MapContainer center={center} zoom={15} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={myLocation} />
          <Circle
            center={center}
            radius={RADIUS_M}
            pathOptions={{ color: '#e5853d', weight: 1.5, fillColor: '#e5853d', fillOpacity: 0.06 }}
          />
          {myLocation && <Marker position={myLocation} icon={myLocationIcon} />}
          {visibleStores.map((store) => (
            <Marker
              key={store.id}
              position={[store.lat, store.lng]}
              icon={storeIcon(store.id === selectedStore?.id)}
              eventHandlers={{ click: () => setSelectedId(store.id) }}
            />
          ))}
        </MapContainer>
        <LocateButton type="button" aria-label="내 위치로 이동" onClick={locate}>
          <LocateFixed size={18} />
        </LocateButton>
      </MapArea>

      {selectedStore ? (
        <StoreCard>
          <StoreRow>
            <StoreInfo>
              <StoreName>{selectedStore.name}</StoreName>
              <StoreMeta>
                {selectedStore.category} · {formatDistance(selectedStore.distanceM)} · {selectedStore.status}
              </StoreMeta>
            </StoreInfo>
            <GoButton type="button" onClick={() => navigate('/missions')}>
              미션 보기
            </GoButton>
          </StoreRow>
          {selectedStore.eventLabel && (
            <EventRow type="button" onClick={() => navigate('/missions')}>
              <EventLabel>{selectedStore.eventLabel}</EventLabel>
              <ChevronRight size={16} color="#c9b3a5" />
            </EventRow>
          )}
        </StoreCard>
      ) : (
        <EmptyCard>주변에 등록된 매장이 없어요</EmptyCard>
      )}
    </Page>
  )
}
