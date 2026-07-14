import { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowUpDown, ChevronRight, ImageOff, Check } from 'lucide-react'
import { PointsBadge } from '@/components/PointsBadge'

// ---------------------------------------------------------------------------
// TODO(API 연동): 아래 더미 데이터는 실제로 이 엔드포인트들로 교체될 예정
// - GET /customer/missions?category=&sort=   -> categories, missions
// - GET /customer/points/history             -> pointBalance
// - POST /customer/missions/:id/verify       -> "인증" 버튼 액션
// ---------------------------------------------------------------------------

const pointBalance = 1240

type MissionState = 'active' | 'default' | 'waiting' | 'done' | 'closed'

interface MissionItem {
  id: string
  storeName: string
  category: string
  distance: string
  distanceM: number // 거리순 정렬용 (m)
  createdAt: number // 최신순/오래된순 정렬용 (등록 시각, 클수록 최신)
  rewardText: string
  state: MissionState
  photoUrl?: string
}

type SortKey = 'distance' | 'latest' | 'oldest'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'distance', label: '거리순' },
  { key: 'latest', label: '최신순' },
  { key: 'oldest', label: '오래된순' },
]

const categories = ['전체', '카페', '베이커리', '편의점', '꽃집', '운동', '분식']

const missions: MissionItem[] = [
  { id: '1', storeName: '블루보틀 성수', category: '카페', distance: '210m', distanceM: 210, createdAt: 7, rewardText: '+100P', state: 'active' },
  { id: '2', storeName: '파리크라상 역삼', category: '베이커리', distance: '640m', distanceM: 640, createdAt: 6, rewardText: '+80P', state: 'default' },
  { id: '3', storeName: 'GS25 선릉역점', category: '편의점', distance: '880m', distanceM: 880, createdAt: 5, rewardText: '+30P', state: 'default' },
  { id: '4', storeName: '꽃소식 플라워', category: '꽃집', distance: '1.1km', distanceM: 1100, createdAt: 4, rewardText: '+60P', state: 'default' },
  { id: '5', storeName: '헬스보이짐 선릉', category: '운동', distance: '1.2km', distanceM: 1200, createdAt: 3, rewardText: '18시 이후 열림', state: 'waiting' },
  { id: '6', storeName: '김밥천국 역삼점', category: '분식', distance: '320m', distanceM: 320, createdAt: 2, rewardText: '+50P 적립완료', state: 'done' },
  { id: '7', storeName: '컵밥나라 역삼점', category: '분식', distance: '450m', distanceM: 450, createdAt: 1, rewardText: '+40P', state: 'closed' },
]

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

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ResultCount = styled.p`
  font-weight: 500;
  font-size: 13px;
  color: #a2917f;

  strong {
    font-weight: 700;
    color: #1f1a15;
  }
`

const SortWrap = styled.div`
  position: relative;
`

const SortLabel = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 12.5px;
  color: #1f1a15;
`

const SortMenu = styled.div`
  position: absolute;
  right: 0;
  top: 26px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  padding: 6px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(31, 26, 21, 0.12);
`

const SortMenuItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 10px;
  border: none;
  border-radius: 8px;
  background: ${(p) => (p.active ? '#fbf3ec' : 'none')};
  cursor: pointer;
  font-weight: ${(p) => (p.active ? 700 : 500)};
  font-size: 13px;
  color: #1f1a15;
  text-align: left;
`

const EmptyText = styled.p`
  padding: 40px 0;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  color: #b6a493;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div<{ dim?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 0;
  border-bottom: 1px solid #f1e9df;
  opacity: ${(p) => (p.dim ? 0.5 : 1)};

  &:last-of-type {
    border-bottom: none;
  }
`

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`

/** 매장 사진 자리표시자. 실제 사진 없으면 카테고리 아이콘으로 대체 노출 */
const Thumbnail = styled.div<{ photoUrl?: string }>`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${(p) => (p.photoUrl ? `url(${p.photoUrl}) center/cover no-repeat` : '#f3ece2')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9b3a5;
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

const ItemName = styled.p<{ muted?: boolean; strike?: boolean }>`
  font-weight: 600;
  font-size: 15px;
  color: ${(p) => (p.muted ? '#c3b3a3' : '#1f1a15')};
  text-decoration: ${(p) => (p.strike ? 'line-through' : 'none')};
`

const ItemMeta = styled.p<{ muted?: boolean }>`
  font-weight: 400;
  font-size: 12.5px;
  color: ${(p) => (p.muted ? '#c3b3a3' : '#a2917f')};

  strong {
    font-weight: 700;
    color: ${(p) => (p.muted ? '#c3b3a3' : '#1f1a15')};
  }
`

const VerifyButton = styled.button`
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 600;
  font-size: 12.5px;
  padding: 10px 18px;
  border-radius: 22px;
`

const StatusLabel = styled.p`
  flex-shrink: 0;
  font-weight: 500;
  font-size: 12px;
  color: #a2917f;
`

const ClosedBadge = styled.span`
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 20px;
  background: #f1e9df;
  font-weight: 700;
  font-size: 11px;
  color: #a2917f;
`

function ItemRight({ mission, onVerify }: { mission: MissionItem; onVerify: () => void }) {
  if (mission.state === 'active')
    return (
      <VerifyButton
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onVerify()
        }}
      >
        인증
      </VerifyButton>
    )
  if (mission.state === 'waiting') return <StatusLabel>대기</StatusLabel>
  if (mission.state === 'done') return <StatusLabel>완료</StatusLabel>
  if (mission.state === 'closed') return <ClosedBadge>마감됨</ClosedBadge>
  return <ChevronRight size={17} color="#c9b3a5" />
}

export function Missions() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('전체')
  const [sort, setSort] = useState<SortKey>('distance')
  const [sortOpen, setSortOpen] = useState(false)

  const visibleMissions = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = missions.filter((m) => {
      const matchesCategory = category === '전체' || m.category === category
      const matchesQuery =
        q === '' ||
        m.storeName.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'distance') return a.distanceM - b.distanceM
      if (sort === 'latest') return b.createdAt - a.createdAt
      return a.createdAt - b.createdAt // oldest
    })
    return sorted
  }, [query, category, sort])

  const sortLabel = SORT_OPTIONS.find((o) => o.key === sort)?.label ?? '거리순'

  return (
    <Page>
      <Header>
        <Title>미션</Title>
        <PointsBadge points={pointBalance} />
      </Header>

      <SearchBar>
        <Search size={17} color="#bcaa99" />
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="매장명, 카테고리 검색"
          aria-label="미션 검색"
        />
      </SearchBar>

      <CategoryRow>
        {categories.map((c) => (
          <CategoryChip key={c} active={category === c} type="button" onClick={() => setCategory(c)}>
            {c}
          </CategoryChip>
        ))}
      </CategoryRow>

      <ResultRow>
        <ResultCount>
          주변 미션 <strong>{visibleMissions.length}</strong>개
        </ResultCount>
        <SortWrap>
          <SortLabel type="button" onClick={() => setSortOpen((v) => !v)}>
            {sortLabel} <ArrowUpDown size={13} />
          </SortLabel>
          {sortOpen && (
            <SortMenu>
              {SORT_OPTIONS.map((option) => (
                <SortMenuItem
                  key={option.key}
                  type="button"
                  active={sort === option.key}
                  onClick={() => {
                    setSort(option.key)
                    setSortOpen(false)
                  }}
                >
                  {option.label}
                  {sort === option.key && <Check size={14} color="#e6853d" />}
                </SortMenuItem>
              ))}
            </SortMenu>
          )}
        </SortWrap>
      </ResultRow>

      {visibleMissions.length === 0 ? (
        <EmptyText>검색 결과가 없어요</EmptyText>
      ) : (
        <List>
          {visibleMissions.map((mission) => {
          const dim = mission.state === 'done' || mission.state === 'closed'
          const muted = mission.state === 'waiting' || mission.state === 'done' || mission.state === 'closed'
          const clickable = mission.state !== 'closed'
          return (
            <Item
              key={mission.id}
              dim={dim}
              onClick={clickable ? () => navigate(`/missions/${mission.id}`) : undefined}
              style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
              <ItemLeft>
                <Thumbnail photoUrl={mission.photoUrl}>
                  {!mission.photoUrl && <ImageOff size={18} />}
                </Thumbnail>
                <ItemInfo>
                  <ItemName muted={muted} strike={mission.state === 'done'}>
                    {mission.storeName}
                  </ItemName>
                  <ItemMeta muted={muted}>
                    {mission.category} · {mission.distance} ·{' '}
                    {mission.state === 'active' || mission.state === 'default' ? (
                      <strong>{mission.rewardText}</strong>
                    ) : (
                      mission.rewardText
                    )}
                  </ItemMeta>
                </ItemInfo>
              </ItemLeft>
              <ItemRight mission={mission} onVerify={() => navigate(`/missions/${mission.id}/verify`)} />
            </Item>
          )
          })}
        </List>
      )}
    </Page>
  )
}
