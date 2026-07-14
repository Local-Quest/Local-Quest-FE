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

interface LoginProps {
  role: 'CUSTOMER' | 'OWNER'
  signupPath: string
  homePath: string
}

export function Login({ role, signupPath, homePath }: LoginProps) {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await login({ username, password, role })
      navigate(homePath, { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <Title>로그인</Title>
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
          비밀번호
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
          />
        </Label>
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? '로그인 중...' : '로그인'}
        </SubmitButton>
      </Form>
      <SwitchRow>
        아직 계정이 없으신가요?
        <SwitchLink type="button" onClick={() => navigate(signupPath)}>
          회원가입
        </SwitchLink>
      </SwitchRow>
    </Wrapper>
  )
}
