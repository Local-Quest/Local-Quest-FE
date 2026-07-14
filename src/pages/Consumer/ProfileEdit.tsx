import { useRef, useState, type ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ImagePlus } from 'lucide-react'
import { SubPageHeader } from '@/components/SubPageHeader'
import { useProfileStore } from '@/store/useProfileStore'

// ---------------------------------------------------------------------------
// TODO(API 연동): PATCH /customer/profile -> {nickname, avatarUrl}
// 닉네임 중복/형식 검사는 서버 응답 기반으로 교체 필요 (지금은 더미 검증만 존재)
// 아바타는 목 모드에서 data URL로 localStorage(useProfileStore)에 저장.
// ---------------------------------------------------------------------------

const MAX_AVATAR_BYTES = 2 * 1024 * 1024 // 2MB

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 28px 24px 32px;
`

const AvatarUpload = styled.label<{ image?: string | null }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 92px;
  height: 92px;
  border-radius: 46px;
  background: ${(p) => (p.image ? `url(${p.image}) center/cover no-repeat` : '#f9f7f4')};
  border: 1px dashed #e6d5c9;
  color: #a2917f;
  cursor: pointer;
  overflow: hidden;

  input {
    display: none;
  }
`

const AvatarEditBadge = styled.span`
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: #1f1a15;
  color: #fdfbf8;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fdfbf8;
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
  const { nickname: savedNickname, avatarUrl: savedAvatar, setProfile } = useProfileStore()
  const [nickname, setNickname] = useState(savedNickname)
  const [avatar, setAvatar] = useState<string | null>(savedAvatar)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_AVATAR_BYTES) {
      setError('파일 용량이 너무 큽니다 (최대 2MB)')
      if (fileRef.current) fileRef.current.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(typeof reader.result === 'string' ? reader.result : null)
      setError('')
    }
    reader.readAsDataURL(file)
  }

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
    setProfile({ nickname: trimmed, avatarUrl: avatar })
    navigate('/mypage', { replace: true })
  }

  return (
    <Page>
      <SubPageHeader title="프로필 수정" />

      <Body>
        <AvatarUpload image={avatar}>
          {!avatar && (
            <>
              <ImagePlus size={22} />
              <AvatarHint>사진 변경</AvatarHint>
            </>
          )}
          <AvatarEditBadge>
            <ImagePlus size={14} />
          </AvatarEditBadge>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
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
