import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import styled from '@emotion/styled'
import { ChevronRight } from 'lucide-react'
import { colors } from '@/styles/tokens'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Logo = styled.p`
  flex-shrink: 0;
  font-family: 'Unkempt', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 48px;
  text-align: center;
  color: ${colors.black};
  margin: 40px 0 24px;
`

/** 슬라이드가 보이는 영역 - flex:1로 고정돼서 슬라이드마다 내용 크기가 달라도 화면 높이가 안 바뀜 */
const Viewport = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  touch-action: pan-y;
`

const Track = styled.div<{ translatePercent: number; dragging: boolean }>`
  display: flex;
  height: 100%;
  transform: translateX(${(p) => p.translatePercent}%);
  transition: ${(p) => (p.dragging ? 'none' : 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1)')};
`

const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  overflow: hidden;
`

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 0 40px;
`

const DotRow = styled.div`
  display: flex;
  gap: 6px;
`

const Dot = styled.span<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(p) => (p.active ? colors.orange500 : '#d7d7d7')};
  transition: background 200ms;
`

const swipeHintKeyframes = `
  @keyframes swipeHintNudge {
    0%, 100% { transform: translateX(0); opacity: 0.6; }
    50% { transform: translateX(5px); opacity: 1; }
  }
`

const SwipeHint = styled.div`
  ${swipeHintKeyframes}
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 13px;
  color: #b1b1b1;

  svg {
    animation: swipeHintNudge 1.4s ease-in-out infinite;
  }
`

const NextButton = styled.button<{ isLast: boolean }>`
  width: 278px;
  max-width: 100%;
  height: 43px;
  border: none;
  border-radius: 25px;
  background: ${(p) => (p.isLast ? colors.orangeCta : colors.orange400)};
  color: ${colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`

const DRAG_THRESHOLD_PERCENT = 18

interface OnboardingCarouselProps {
  slides: ReactNode[]
  /** 마지막 슬라이드 버튼을 누르면(혹은 스와이프하면) 호출됨 */
  onFinish: () => void
  /** 마지막 슬라이드 버튼 텍스트 */
  finishLabel?: string
  /** 첫 슬라이드 이후(마지막 제외) 버튼 텍스트 */
  nextLabel?: string
}

/**
 * 손님/사장님 온보딩 공용 캐러셀.
 * 첫 화면은 "스와이프하여 계속하기" 텍스트만 있고, 그 다음 화면부터는 버튼으로 이동함.
 * 스와이프 제스처 자체는 모든 화면에서 계속 동작함.
 */
export function OnboardingCarousel({ slides, onFinish, finishLabel = '퀘스트 받기', nextLabel = '다음' }: OnboardingCarouselProps) {
  const [index, setIndex] = useState(0)
  const [dragPercent, setDragPercent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)

  const isLast = index === slides.length - 1

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setDragging(true)
    startXRef.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !viewportRef.current) return
    const width = viewportRef.current.offsetWidth || 1
    const deltaPx = e.clientX - startXRef.current
    let deltaPercent = (deltaPx / width) * 100
    // 첫 슬라이드에서 뒤로, 마지막 슬라이드에서 더 앞으로 당길 때는 저항감 주기
    if (index === 0 && deltaPercent > 0) deltaPercent *= 0.35
    setDragPercent(deltaPercent)
  }

  const endDrag = () => {
    if (!dragging) return
    setDragging(false)
    if (dragPercent <= -DRAG_THRESHOLD_PERCENT) {
      if (isLast) onFinish()
      else setIndex((i) => i + 1)
    } else if (dragPercent >= DRAG_THRESHOLD_PERCENT && index > 0) {
      setIndex((i) => i - 1)
    }
    setDragPercent(0)
  }

  return (
    <Wrapper>
      <Logo>Local Quest</Logo>
      <Viewport
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Track translatePercent={-index * 100 + dragPercent} dragging={dragging}>
          {slides.map((slide, i) => (
            <Slide key={i}>{slide}</Slide>
          ))}
        </Track>
      </Viewport>
      <Footer>
        <DotRow>
          {slides.map((_, i) => (
            <Dot key={i} active={i === index} />
          ))}
        </DotRow>
        {index === 0 ? (
          <SwipeHint>
            스와이프하여 계속하기
            <ChevronRight size={14} />
          </SwipeHint>
        ) : (
          <NextButton
            type="button"
            isLast={isLast}
            onClick={() => (isLast ? onFinish() : setIndex((i) => i + 1))}
          >
            {isLast ? finishLabel : nextLabel}
          </NextButton>
        )}
      </Footer>
    </Wrapper>
  )
}
