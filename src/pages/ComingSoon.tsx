import styled from '@emotion/styled'
import { colors } from '@/styles/tokens'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 60vh;
  padding: 24px;
  text-align: center;
`

const Title = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 18px;
  color: ${colors.blue900};
`

const Desc = styled.p`
  font-family: 'Pretendard';
  font-size: 13px;
  color: ${colors.brown800};
`

interface ComingSoonProps {
  title: string
}

/** 아직 퍼블리싱 안 된 화면 자리표시자 */
export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Desc>이 화면은 아직 준비 중이에요</Desc>
    </Wrapper>
  )
}
