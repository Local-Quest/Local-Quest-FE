import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { colors } from '@/styles/tokens'

/** 로그인/회원가입 등 하단탭바가 없는 화면들을 위한 공용 셸 */
const Shell = styled.div`
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: ${colors.white};
  position: relative;
`

export function AuthLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  )
}
