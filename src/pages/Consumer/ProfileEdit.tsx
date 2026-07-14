import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ImagePlus } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): PATCH /customer/profile -> {nickname, avatarUrl}
// 닉네임 중복/형식 검사는 서버 응답 기반으로 교체 필요 (지금은 더미 검증만 존재)
// ---------------------------------------------------------------------------

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 24px;
  border-bottom: 1px solid #f1e9df;
`

const BackButton = styled.button`
  position: absolute;
  left: 24px;
  background: none;
  border: none;
  color: #1f1a15;
  cursor: pointer;
  display: flex;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #1f1a15;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 28px 24px 32px;
`

const AvatarUpload = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 92px;
  height: 92px;
  border-radius: 46px;
  background: #f9f7f4;
  border: 1px dashed #e6d5c9;
  color: #a2917f;
  cursor: pointer;

  input {
    display: none;
  }
`

const AvatarHint = styled.span`
  font-size: 10px;
  color: #c9b3a5;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const FieldLabel = styled.p`
  font-size: 12px;
  color: #1f1a15;
`

const TextInput = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid #f0e7dc;
  border-radius: 10px;
  background: #ffffff;
  font-size: 14px;
  color: #1f1a15;
  font-family: 'Pretendard', sans-serif;

  &:focus {
    outline: none;
    border-color: #e6853d;
  }
`

const ErrorText = styled.p`
  font-size: 11px;
  color: #d95c3a;
`

const SaveButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #1f1a15;
  color: #fdfbf8;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`

export function ProfileEdit() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('지우')
  const [error, setError] = useState('')

  const handleSave = () => {
    const trimmed = nickname.trim()
    if (!trimmed) {
      setError('닉네임을 입력해주세요')
      return
    }
    if (trimmed.length > 10) {
      setError('닉네임은 10자 이내로 입력해주세요')
      return
    }
    // TODO(API 연동): 실제로는 서버에서 중복 여부 확인 후 처리
    navigate('/mypage', { replace: true })
  }

  return (
    <Page>
      <Bar>
        <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </BackButton>
        <Title>프로필 수정</Title>
      </Bar>

      <Body>
        <AvatarUpload>
          <ImagePlus size={22} />
          <AvatarHint>사진 변경</AvatarHint>
          <input type="file" accept="image/*" />
        </AvatarUpload>

        <Field>
          <FieldLabel>닉네임</FieldLabel>
          <TextInput
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setError('')
            }}
            placeholder="닉네임 입력"
          />
          {error && <ErrorText>{error}</ErrorText>}
        </Field>

        <SaveButton type="button" onClick={handleSave}>
          저장하기
        </SaveButton>
      </Body>
    </Page>
  )
}
