import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/tokens'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 100vh;
  padding: 24px;
  gap: 40px;
  text-align: center;
`

const TitleBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 32px;
  color: ${colors.black};
  white-space: pre-line;
  line-height: 1.3;
`

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding-bottom: 24px;
`

const SwitchText = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  color: #b1b1b1;
`

const SwitchLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  color: ${colors.orange600};
  text-decoration: underline;
  cursor: pointer;
`

const PrimaryButton = styled.button`
  width: 278px;
  max-width: 100%;
  height: 43px;
  border: none;
  border-radius: 25px;
  background: ${colors.blue600};
  color: ${colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
`

const Logo = styled.p`
  font-family: 'Unkempt', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: ${colors.black};
  margin-bottom: 8px;
`

interface WelcomeProps {
  loginPath: string
  signupPath: string
  /** 사장님 웰컴 화면(223:4791)엔 로고가 있고 손님 화면(223:4481)엔 없어서 옵션으로 분리 */
  showLogo?: boolean
}

/**
 * 로그인/회원가입으로 넘어가는 진입(웰컴) 화면.
 * 피그마엔 "로그인 강조" / "회원가입 강조" 두 상태로 나뉘어 있었지만,
 * 기능적으로 동일해서 하나의 화면 + 전환 링크로 합쳤음.
 */
export function Welcome({ loginPath, signupPath, showLogo = false }: WelcomeProps) {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <TitleBlock>
        {showLogo && <Logo>Local Quest</Logo>}
        <Title>{'로컬 퀘스트에 오신 걸\n환영합니다!'}</Title>
      </TitleBlock>
      <BottomBlock>
        <SwitchText>
          만약 계정이 없으신가요?{' '}
          <SwitchLink type="button" onClick={() => navigate(signupPath)}>
            회원가입
          </SwitchLink>
        </SwitchText>
        <PrimaryButton type="button" onClick={() => navigate(loginPath)}>
          로그인
        </PrimaryButton>
      </BottomBlock>
    </Wrapper>
  )
}
