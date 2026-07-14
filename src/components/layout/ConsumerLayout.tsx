import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { BottomNav } from '@/components/BottomNav'
import { colors } from '@/styles/tokens'

/** 모바일 웹앱을 데스크탑 브라우저에서도 폰 프레임처럼 보이게 하는 공용 셸 */
const Shell = styled.div`
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: ${colors.white};
  position: relative;
  padding-bottom: 100px; /* 하단 네비바(플로팅)에 콘텐츠 안 가리게 */
`

export function ConsumerLayout() {
  return (
    <Shell>
      <Outlet />
      <BottomNav />
    </Shell>
  )
}
