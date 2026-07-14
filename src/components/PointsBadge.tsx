import styled from '@emotion/styled'
import { colors } from '@/styles/tokens'

const Badge = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border: 1px solid ${colors.black};
  border-radius: 25px;
  font-weight: 700;
  font-size: 12px;
  color: ${colors.black};
  flex-shrink: 0;
`

interface PointsBadgeProps {
  points: number
}

/**
 * 미션/지도/쿠폰/마이 페이지 헤더에 쓰이는 포인트 뱃지.
 * 메인페이지 헤더의 PointsPill과 동일한 스타일(outline)로 통일함.
 */
export function PointsBadge({ points }: PointsBadgeProps) {
  return <Badge>P {points.toLocaleString()}</Badge>
}
