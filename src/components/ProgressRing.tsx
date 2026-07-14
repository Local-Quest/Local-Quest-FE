import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { colors } from '@/styles/tokens'

interface ProgressRingProps {
  /** 현재 진행값 (예: 완료한 미션 수) */
  value: number
  /** 최대값 (예: 하루 최대 미션 수) */
  max: number
  /** 링 전체 지름(px) */
  size: number
  /** 링 두께(px) */
  thickness?: number
  trackColor?: string
  progressColor?: string
  children?: ReactNode
}

const Ring = styled.div<{ size: number }>`
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
  flex-shrink: 0;
`

const InnerHole = styled.div<{ size: number; thickness: number }>`
  position: absolute;
  top: ${(p) => p.thickness}px;
  left: ${(p) => p.thickness}px;
  width: ${(p) => p.size - p.thickness * 2}px;
  height: ${(p) => p.size - p.thickness * 2}px;
  border-radius: 50%;
  background: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`

/**
 * 원형 진행도 게이지 (오늘의 미션 진척도, 주간 미니 게이지 등에서 공용으로 사용)
 * conic-gradient로 도넛 형태를 만들고, 중앙은 흰 원으로 뚫어 링 모양을 낸다.
 */
export function ProgressRing({
  value,
  max,
  size,
  thickness = 8,
  trackColor = colors.orange100,
  progressColor = colors.orange500,
  children,
}: ProgressRingProps) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0
  const deg = ratio * 360

  return (
    <Ring
      size={size}
      style={{
        background: `conic-gradient(${progressColor} ${deg}deg, ${trackColor} ${deg}deg 360deg)`,
      }}
    >
      <InnerHole size={size} thickness={thickness}>
        {children}
      </InnerHole>
    </Ring>
  )
}
