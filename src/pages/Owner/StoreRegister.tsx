import styled from '@emotion/styled'
import { AlertCircle, ImagePlus } from 'lucide-react'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import { FormPage, FormBody, Field, FieldLabel, TextInput, Select, PrimaryButton } from '@/components/owner/form'

// ---------------------------------------------------------------------------
// TODO(API 연동): POST /owner/store  -> {name, category, address, openTime, closeTime, photo}
// 등록 후 관리자 승인 대기 상태로 전환됨 (아래 배너 참고)
// ---------------------------------------------------------------------------

const CATEGORIES = ['카페', '음식', '편의점', '베이커리', '라면/주점', '미용', '영화/놀이', '문화생활', '스포츠']

const PendingBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 24px 21px;
  background: #fef8f0;
  border-bottom: 1px solid #f1e9df;
  color: #e6853d;
`

const PendingText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const PendingTitle = styled.p`
  font-size: 13px;
  color: #8b5a2b;
`

const PendingDesc = styled.p`
  font-size: 11px;
  color: #a2917f;
`

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

export function StoreRegister() {
  return (
    <FormPage>
      <OwnerHeader title="매장 정보 등록" />
      <PendingBanner>
        <AlertCircle size={18} />
        <PendingText>
          <PendingTitle>승인 대기 중</PendingTitle>
          <PendingDesc>관리자 검토까지 1-2일 소요됩니다</PendingDesc>
        </PendingText>
      </PendingBanner>
      <FormBody>
        <Field>
          <FieldLabel>매장명 *</FieldLabel>
          <TextInput placeholder="매장명 입력" />
        </Field>
        <Field>
          <FieldLabel>업종 *</FieldLabel>
          <Select defaultValue="">
            <option value="" disabled>
              업종 선택
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <FieldLabel>주소 *</FieldLabel>
          <TextInput placeholder="도로명 주소 입력" />
        </Field>
        <Field>
          <FieldLabel>영업시간 *</FieldLabel>
          <TimeRow>
            <TextInput type="time" style={{ flex: 1 }} />
            <span>~</span>
            <TextInput type="time" style={{ flex: 1 }} />
          </TimeRow>
        </Field>
        <Field>
          <FieldLabel>매장 사진 *</FieldLabel>
          <UploadBox>
            <ImagePlus size={22} />
            <span>이미지 업로드</span>
            <UploadHint>최대 5MB</UploadHint>
            <input type="file" accept="image/*" />
          </UploadBox>
        </Field>
        <PrimaryButton type="button">등록 신청</PrimaryButton>
      </FormBody>
    </FormPage>
  )
}
