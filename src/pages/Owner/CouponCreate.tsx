import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import { FormPage, FormBody, Field, FieldLabel, TextInput, Select, PrimaryButton } from '@/components/owner/form'

// ---------------------------------------------------------------------------
// TODO(API 연동): POST /owner/coupons -> {name, benefitType, benefitValue, requiredPoints, quantity, expireDate}
// ---------------------------------------------------------------------------

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 17px;
  border-radius: 12px;
  background: #f3e4d7;
  border: 1px solid #e6d5c9;
`

const PreviewLabel = styled.p`
  font-size: 12px;
  color: #1f1a15;
`

const PreviewCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 17px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #f0e7dc;
  overflow: hidden;
`

const PreviewRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const PreviewName = styled.p`
  font-size: 14px;
  color: #1f1a15;
`

const PreviewBenefit = styled.p`
  font-size: 14px;
  color: #e6853d;
`

const PreviewCost = styled.p`
  font-size: 12px;
  color: #1f1a15;
  text-align: right;
`

const PreviewCostLabel = styled.p`
  font-size: 10px;
  color: #c9b3a5;
  text-align: right;
`

const PreviewExpire = styled.p`
  font-size: 11px;
  color: #a2917f;
`

export function CouponCreate() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [benefitValue, setBenefitValue] = useState('20')
  const [requiredPoints, setRequiredPoints] = useState('500')

  return (
    <FormPage>
      <OwnerHeader title="쿠폰 생성" />
      <FormBody>
        <Field>
          <FieldLabel>쿠폰명 *</FieldLabel>
          <TextInput
            placeholder="쿠폰명 입력 (예: 아메리카노 20% 할인)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>혜택 유형 *</FieldLabel>
          <Select defaultValue="할인율 (%)">
            <option>할인율 (%)</option>
            <option>정액 할인 (원)</option>
            <option>무료 증정</option>
          </Select>
        </Field>
        <Field>
          <FieldLabel>혜택 값 *</FieldLabel>
          <TextInput
            type="number"
            placeholder="20"
            value={benefitValue}
            onChange={(e) => setBenefitValue(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>필요 포인트 *</FieldLabel>
          <TextInput
            type="number"
            placeholder="500"
            value={requiredPoints}
            onChange={(e) => setRequiredPoints(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>총 수량 *</FieldLabel>
          <TextInput type="number" placeholder="100" />
        </Field>
        <Field>
          <FieldLabel>유효기간 *</FieldLabel>
          <TextInput type="date" />
        </Field>

        <PreviewBox>
          <PreviewLabel>미리보기</PreviewLabel>
          <PreviewCard>
            <PreviewRow>
              <div>
                <PreviewName>{name || '아메리카노'}</PreviewName>
                <PreviewBenefit>{benefitValue}% 할인</PreviewBenefit>
              </div>
              <div>
                <PreviewCost>{requiredPoints}P</PreviewCost>
                <PreviewCostLabel>필요</PreviewCostLabel>
              </div>
            </PreviewRow>
            <PreviewExpire>유효기간: 2025.12.31까지</PreviewExpire>
          </PreviewCard>
        </PreviewBox>

        <PrimaryButton type="button" onClick={() => navigate('/owner/coupons')}>
          쿠폰 생성
        </PrimaryButton>
      </FormBody>
    </FormPage>
  )
}
