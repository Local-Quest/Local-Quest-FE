import { useState, type FormEvent } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/tokens'
import { useAuthStore } from '@/store/useAuthStore'
import { getAuthErrorMessage } from '@/api/auth'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  gap: 32px;
`

const Title = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 22px;
  color: ${colors.black};
  margin-top: 40px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'Pretendard';
  font-size: 13px;
  font-weight: 600;
  color: ${colors.brown800};
`

const Input = styled.input`
  height: 48px;
  padding: 0 14px;
  border: 1px solid ${colors.orange200};
  border-radius: 10px;
  font-family: 'Pretendard';
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: ${colors.orange500};
  }
`

const ErrorText = styled.p`
  font-family: 'Pretendard';
  font-size: 12px;
  color: #d64545;
`

const SubmitButton = styled.button`
  height: 52px;
  border: none;
  border-radius: 12px;
  background: ${colors.blue600};
  color: ${colors.white};
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SwitchRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  font-family: 'Pretendard';
  font-size: 13px;
  color: ${colors.brown800};
`

const SwitchLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 13px;
  color: ${colors.orangeText};
  cursor: pointer;
`

interface SignupProps {
  role: 'CUSTOMER' | 'OWNER'
  loginPath: string
  homePath: string
}

export function Signup({ role, loginPath, homePath }: SignupProps) {
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!username || !nickname || !password || !passwordConfirm) {
      setError('모든 항목을 입력해주세요')
      return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않아요')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const user = await signup({ username, password, nickname, role })
      // 서버가 토큰까지 내려주면 자동 로그인 상태 -> 홈으로, 아니면 로그인 화면으로.
      navigate(user ? homePath : loginPath, { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          아이디
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
            autoComplete="username"
          />
        </Label>
        <Label>
          닉네임
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </Label>
        <Label>
          비밀번호
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="new-password"
          />
        </Label>
        <Label>
          비밀번호 확인
          <Input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
          />
        </Label>
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? '가입 중...' : '회원가입'}
        </SubmitButton>
      </Form>
      <SwitchRow>
        이미 계정이 있으신가요?
        <SwitchLink type="button" onClick={() => navigate(loginPath)}>
          로그인
        </SwitchLink>
      </SwitchRow>
    </Wrapper>
  )
}
