import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Trash2, AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): DELETE /owner/missions/:id
// 삭제는 즉시 반영되지 않고 "내일부터" 미노출 처리됨 (오늘까지는 고객에게 계속 노출)
// ---------------------------------------------------------------------------

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(31, 26, 21, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: calc(100% - 48px);
  max-width: 340px;
  padding: 26px 22px;
  border-radius: 22px;
  background: #fdfbf8;
`

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #fbeae2;
  color: #d95c3a;
  align-self: center;
  margin-bottom: 14px;
`

const Title = styled.p`
  font-size: 17px;
  color: #1f1a15;
  text-align: center;
  margin-bottom: 6px;
`

const Desc = styled.p`
  font-size: 12px;
  color: #a2917f;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 14px;

  strong {
    color: #1f1a15;
    font-weight: 600;
  }
`

const NoticeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fef8f0;
  color: #8b5a2b;
  font-size: 11px;
  margin-bottom: 16px;
`

const DeleteButton = styled.button`
  height: 46px;
  border: none;
  border-radius: 12px;
  background: #d95c3a;
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

export function MissionDeleteModal() {
  const navigate = useNavigate()

  return (
    <Backdrop>
      <Card>
        <IconWrap>
          <Trash2 size={28} />
        </IconWrap>
        <Title>미션을 삭제할까요?</Title>
        <Desc>
          현재 <strong>노출 중</strong>인 미션이에요.
          <br />
          삭제는 <strong>내일부터 반영</strong>되며 오늘까지는 고객에게 계속 노출됩니다.
        </Desc>
        <NoticeBox>
          <AlertCircle size={18} />
          인증 완료 12건의 기록은 보존됩니다
        </NoticeBox>
        <DeleteButton type="button" onClick={() => navigate('/owner/manage', { replace: true })}>
          삭제하기
        </DeleteButton>
        <CancelButton type="button" onClick={() => navigate(-1)}>
          취소
        </CancelButton>
      </Card>
    </Backdrop>
  )
}
