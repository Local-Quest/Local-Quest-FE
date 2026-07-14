import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import { FormPage, FormBody, Field, FieldLabel, TextInput } from '@/components/owner/form'

// ---------------------------------------------------------------------------
// TODO(API 연동): PATCH /owner/discounts/:id -> {title, content, remainingQty}
// 이미 활성화된 이벤트라 저장 시 즉시 반영 확인 시트가 뜸
// ---------------------------------------------------------------------------

const event = { title: '크루아상 마감할인', content: '50% 할인', remainingQty: '8' }

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(31, 26, 21, 0.5);
  display: flex;
  align-items: flex-end;
  font-family: 'Pretendard', sans-serif;
`

const Sheet = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 30px;
  border-radius: 24px 24px 0 0;
  background: #fdfbf8;
`

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: #e6d5c9;
  align-self: center;
  margin-bottom: 18px;
`

const Title = styled.p`
  font-size: 17px;
  color: #1f1a15;
  text-align: center;
  margin-bottom: 8px;
`

const Desc = styled.p`
  font-size: 12px;
  color: #a2917f;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 18px;

  strong {
    color: #1f1a15;
    font-weight: 600;
  }
`

const ApplyButton = styled.button`
  height: 46px;
  border: none;
  border-radius: 12px;
  background: #f2913d;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 2px;
`

const CancelButton = styled.button`
  height: 41px;
  border: none;
  background: none;
  color: #a2917f;
  font-size: 13px;
  cursor: pointer;
`

export function DiscountUpdateModal() {
  const navigate = useNavigate()

  return (
    <>
      <FormPage>
        <OwnerHeader title="이벤트 수정" />
        <FormBody>
          <Field>
            <FieldLabel>제목</FieldLabel>
            <TextInput defaultValue={event.title} />
          </Field>
          <Field>
            <FieldLabel>내용</FieldLabel>
            <TextInput defaultValue={event.content} />
          </Field>
          <Field>
            <FieldLabel>남은 수량</FieldLabel>
            <TextInput defaultValue={event.remainingQty} />
          </Field>
        </FormBody>
      </FormPage>

      <Backdrop>
        <Sheet>
          <Handle />
          <Title>지금 바로 반영할까요?</Title>
          <Desc>
            활성 중인 이벤트라 <strong>즉시 반영</strong>돼요.
            <br />
            이미 노출된 고객 화면도 함께 갱신됩니다.
          </Desc>
          <ApplyButton type="button" onClick={() => navigate('/owner/manage', { replace: true })}>
            즉시 반영
          </ApplyButton>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
        </Sheet>
      </Backdrop>
    </>
  )
}
