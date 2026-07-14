import styled from '@emotion/styled'
import { useCounterStore } from '@/store/useCounterStore'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
`

const Title = styled.h1`
  font-size: 1.75rem;
`

const Count = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #1a1a1a;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`

export function Home() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <Wrapper>
      <Title>Local Quest</Title>
      <Count>{count}</Count>
      <ButtonRow>
        <Button onClick={decrement}>-1</Button>
        <Button onClick={reset}>reset</Button>
        <Button onClick={increment}>+1</Button>
      </ButtonRow>
    </Wrapper>
  )
}
