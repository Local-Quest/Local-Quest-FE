import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ImagePlus } from 'lucide-react'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import { FormPage, FormBody, Field, FieldLabel, TextInput, Select, PrimaryButton } from '@/components/owner/form'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/store -> 기존 값 프리필, PATCH /owner/store -> 저장
// ---------------------------------------------------------------------------

const CATEGORIES = ['카페', '음식', '편의점', '베이커리', '라면/주점', '미용', '영화/놀이', '문화생활', '스포츠']

const store = {
  name: '블루보틀 성수',
  category: '카페',
  address: '서울 성동구 아차산로 17길 48',
  openTime: '08:00',
  closeTime: '21:00',
}

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const UploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 124px;
  border-radius: 10px;
  border: 2px dashed #f0e7dc;
  background: #f9f7f4;
  color: #a2917f;
  cursor: pointer;

  input {
    display: none;
  }
`

const UploadHint = styled.p`
  font-size: 10px;
  color: #c9b3a5;
`

export function StoreEdit() {
  const navigate = useNavigate()
  const [name, setName] = useState(store.name)

  const canSave = name.trim().length > 0

  return (
    <FormPage>
      <OwnerHeader title="매장 정보 관리" />
      <FormBody>
        <Field>
          <FieldLabel>매장명 *</FieldLabel>
          <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="매장명 입력" />
        </Field>
        <Field>
          <FieldLabel>업종 *</FieldLabel>
          <Select defaultValue={store.category}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <FieldLabel>주소 *</FieldLabel>
          <TextInput defaultValue={store.address} placeholder="도로명 주소 입력" />
        </Field>
        <Field>
          <FieldLabel>영업시간 *</FieldLabel>
          <TimeRow>
            <TextInput type="time" defaultValue={store.openTime} style={{ flex: 1 }} />
            <span>~</span>
            <TextInput type="time" defaultValue={store.closeTime} style={{ flex: 1 }} />
          </TimeRow>
        </Field>
        <Field>
          <FieldLabel>매장 사진</FieldLabel>
          <UploadBox>
            <ImagePlus size={22} />
            <span>이미지 변경</span>
            <UploadHint>최대 5MB</UploadHint>
            <input type="file" accept="image/*" />
          </UploadBox>
        </Field>
        <PrimaryButton
          type="button"
          disabled={!canSave}
          style={{ opacity: canSave ? 1 : 0.5 }}
          onClick={() => canSave && navigate('/owner/mypage', { replace: true })}
        >
          저장하기
        </PrimaryButton>
      </FormBody>
    </FormPage>
  )
}
