import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import {
  FormPage,
  FormBody,
  Field,
  FieldLabel,
  TextInput,
  HintText,
  PrimaryButton,
  NoticeBox,
  NoticeTitle,
  NoticeDesc,
} from '@/components/owner/form'

// ---------------------------------------------------------------------------
// TODO(API 연동): POST /owner/discounts -> {title, content, remainingQty, deadline}
// 등록 즉시 활성화되어 손님 메인 "근처 이벤트"에 노출됨
// content는 자유 텍스트라 "50% 할인", "1+1" 등 형식 제한 없이 받음
// ---------------------------------------------------------------------------

export function DiscountRegister() {
  const navigate = useNavigate()

  return (
    <FormPage>
      <OwnerHeader title="이벤트 등록" />
      <FormBody>
        <Field>
          <FieldLabel>제목 *</FieldLabel>
          <TextInput placeholder="이벤트 제목 입력 (예: 크루아상 마감할인)" />
        </Field>
        <Field>
          <FieldLabel>내용 *</FieldLabel>
          <TextInput placeholder="예: 50% 할인, 1+1" />
          <HintText>할인율뿐 아니라 1+1, 증정 등 원하는 내용을 자유롭게 입력하세요</HintText>
        </Field>
        <Field>
          <FieldLabel>남은 수량 *</FieldLabel>
          <TextInput type="number" placeholder="10" />
        </Field>
        <Field>
          <FieldLabel>마감 시간 *</FieldLabel>
          <TextInput type="datetime-local" />
          <HintText>※ 설정 시간에 자동으로 비활성화됩니다</HintText>
        </Field>
        <PrimaryButton tone="orange" type="button" onClick={() => navigate('/owner/manage')}>
          지금 바로 등록
        </PrimaryButton>
        <NoticeBox>
          <NoticeTitle>등록 후 즉시 고객에게 노출됩니다</NoticeTitle>
          <NoticeDesc>마감 시간까지 '근처 이벤트'에 띄워집니다</NoticeDesc>
        </NoticeBox>
      </FormBody>
    </FormPage>
  )
}
