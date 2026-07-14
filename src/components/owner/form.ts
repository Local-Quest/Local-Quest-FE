import styled from '@emotion/styled'

/** 사장님 등록/생성 폼 공용 스타일 (미션/할인/쿠폰/매장 등록 폼에서 재사용) */

export const FormPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
`

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px 32px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FieldLabel = styled.p`
  font-size: 12px;
  color: #1f1a15;
`

export const FieldSubLabel = styled.p`
  font-size: 11px;
  color: #8b7565;
`

export const TextInput = styled.input`
  height: 41px;
  padding: 0 12px;
  border: 1px solid #f0e7dc;
  border-radius: 10px;
  background: #ffffff;
  font-size: 13px;
  color: #1f1a15;
  font-family: 'Pretendard', sans-serif;

  &::placeholder {
    color: #757575;
  }

  &:focus {
    outline: none;
    border-color: #e6853d;
  }
`

export const Select = styled.select`
  height: 43px;
  padding: 0 14px;
  border: 1px solid #f0e7dc;
  border-radius: 10px;
  background: #ffffff;
  font-size: 13px;
  color: #1f1a15;
  font-family: 'Pretendard', sans-serif;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #e6853d;
  }
`

export const HintText = styled.p`
  font-size: 10px;
  color: #c9b3a5;
`

export const PrimaryButton = styled.button<{ tone?: 'dark' | 'orange' }>`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: ${(p) => (p.tone === 'orange' ? '#e6853d' : '#1f1a15')};
  color: #fdfbf8;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`

export const NoticeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 12px 12px 15px;
  border-radius: 10px;
  background: #fef8f0;
  border-left: 3px solid #e6853d;
`

export const NoticeTitle = styled.p`
  font-size: 12px;
  color: #8b5a2b;
`

export const NoticeDesc = styled.p`
  font-size: 11px;
  color: #a2917f;
`
