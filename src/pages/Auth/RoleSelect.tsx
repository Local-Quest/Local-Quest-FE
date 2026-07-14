import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/tokens'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  gap: 48px;
  text-align: center;
`

const Logo = styled.p`
  font-family: 'Unkempt', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: ${colors.black};
`

const Question = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 18px;
  color: ${colors.black};
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

const RoleButton = styled.button<{ variant: 'customer' | 'owner' }>`
  height: 56px;
  border-radius: 16px;
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  border: ${(p) => (p.variant === 'owner' ? `1px solid ${colors.blue600}` : 'none')};
  background: ${(p) => (p.variant === 'customer' ? colors.blue600 : colors.white)};
  color: ${(p) => (p.variant === 'customer' ? colors.white : colors.blue600)};
`

/** 앱 최초 진입 시 손님/사장님을 나누는 진입 화면 */
export function RoleSelect() {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Logo>Local Quest</Logo>
      <Question>동네를 탐험할까요, 가게를 알릴까요?</Question>
      <ButtonGroup>
        <RoleButton variant="customer" type="button" onClick={() => navigate('/onboarding')}>
          손님으로 시작하기
        </RoleButton>
        <RoleButton variant="owner" type="button" onClick={() => navigate('/owner/onboarding')}>
          사장님으로 시작하기
        </RoleButton>
      </ButtonGroup>
    </Wrapper>
  )
}
