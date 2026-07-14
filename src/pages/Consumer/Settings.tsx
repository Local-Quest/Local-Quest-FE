import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, AlertTriangle } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): PATCH /customer/settings/notification, POST /auth/logout, DELETE /customer/account
// 진행 중인 인증 건이 있는 상태에서 탈퇴 시도 시 -> 처리 완료 후 탈퇴 가능하도록 서버 응답 기반 분기 필요
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 24px;
  border-bottom: 8px solid #f4eee7;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`

const RowLabel = styled.span`
  font-size: 13px;
  color: #1f1a15;
`

const Toggle = styled.button<{ on: boolean }>`
  position: relative;
  width: 44px;
  height: 26px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.on ? '#2d8c42' : '#e6d5c9')};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${(p) => (p.on ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #ffffff;
    transition: left 150ms;
  }
`

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 24px;
`

const LogoutButton = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #f0e7dc;
  background: #ffffff;
  color: #6a4c3a;
  font-size: 13px;
  cursor: pointer;
`

const WithdrawButton = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #fee8da;
  background: #ffffff;
  color: #c9b3a5;
  font-size: 13px;
  cursor: pointer;
`

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #fbeae2;
`

const ConfirmHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d95c3a;
  font-size: 12px;
`

const ConfirmDesc = styled.p`
  font-size: 11px;
  color: #a2604a;
  line-height: 1.5;
`

const ConfirmActions = styled.div`
  display: flex;
  gap: 8px;
`

const ConfirmCancel = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #f0d7ca;
  background: #ffffff;
  color: #6a4c3a;
  font-size: 12px;
  cursor: pointer;
`

const ConfirmDelete = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #d95c3a;
  color: #fdfbf8;
  font-size: 12px;
  cursor: pointer;
`

export function Settings() {
  const navigate = useNavigate()
  const [notifyOn, setNotifyOn] = useState(true)
  const [confirmingWithdraw, setConfirmingWithdraw] = useState(false)

  return (
    <Page>
      <Bar>
        <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </BackButton>
        <Title>설정</Title>
      </Bar>

      <Section>
        <Row>
          <RowLabel>알림 수신</RowLabel>
          <Toggle type="button" on={notifyOn} onClick={() => setNotifyOn((v) => !v)} aria-pressed={notifyOn} />
        </Row>
      </Section>

      <BottomSection>
        <LogoutButton type="button" onClick={() => navigate('/welcome', { replace: true })}>
          로그아웃
        </LogoutButton>

        {!confirmingWithdraw ? (
          <WithdrawButton type="button" onClick={() => setConfirmingWithdraw(true)}>
            회원탈퇴
          </WithdrawButton>
        ) : (
          <ConfirmBox>
            <ConfirmHeader>
              <AlertTriangle size={16} />
              정말 탈퇴하시겠어요?
            </ConfirmHeader>
            <ConfirmDesc>탈퇴 시 보유 포인트와 쿠폰이 모두 소멸되며 되돌릴 수 없어요.</ConfirmDesc>
            <ConfirmActions>
              <ConfirmCancel type="button" onClick={() => setConfirmingWithdraw(false)}>
                취소
              </ConfirmCancel>
              <ConfirmDelete type="button" onClick={() => navigate('/welcome', { replace: true })}>
                탈퇴하기
              </ConfirmDelete>
            </ConfirmActions>
          </ConfirmBox>
        )}
      </BottomSection>
    </Page>
  )
}
