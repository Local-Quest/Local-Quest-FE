import styled from '@emotion/styled'

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 13px;
  border-radius: 20px;
  background: #1f1a15;
  flex-shrink: 0;
`

const PLabel = styled.span`
  font-weight: 800;
  font-size: 11px;
  color: #e6853d;
`

const Amount = styled.span`
  font-weight: 700;
  font-size: 13px;
  color: #fdfbf8;
`

interface PointsBadgeProps {
  points: number
}

/**
 * 미션/지도/쿠폰/마이 페이지 헤더에 쓰이는 채워진(dark) 포인트 뱃지.
 * 메인페이지의 outline 스타일 PointsPill과는 별개 컴포넌트임 (피그마 시안이 서로 다름).
 */
export function PointsBadge({ points }: PointsBadgeProps) {
  return (
    <Badge>
      <PLabel>P</PLabel>
      <Amount>{points.toLocaleString()}</Amount>
    </Badge>
  )
}
