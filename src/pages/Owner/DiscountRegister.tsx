import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import styled from '@emotion/styled'
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
// TODO(API 연동): POST /owner/discounts -> {productName, discountRate, remainingQty, deadline}
// 등록 즉시 활성화되어 손님 메인 "근처 이벤트"에 노출됨
// ---------------------------------------------------------------------------

const PercentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    flex: 1;
  }
`

export function DiscountRegister() {
  const navigate = useNavigate()

  return (
    <FormPage>
      <OwnerHeader title="마감할인 등록" />
      <FormBody>
        <Field>
          <FieldLabel>상품명 *</FieldLabel>
          <TextInput placeholder="할인할 상품명 입력" />
        </Field>
        <Field>
          <FieldLabel>할인율 *</FieldLabel>
          <PercentRow>
            <TextInput type="number" placeholder="50" />
            <span>%</span>
          </PercentRow>
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
