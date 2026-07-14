import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { OwnerBottomNav } from '@/components/OwnerBottomNav'

/** 사장님용 폰 프레임 셸 (대시보드/관리/마이페이지 하단 3탭 포함) */
const Shell = styled.div`
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: #fdfbf8;
  position: relative;
  padding-bottom: 80px;
`

export function OwnerLayout() {
  return (
    <Shell>
      <Outlet />
      <OwnerBottomNav />
    </Shell>
  )
}
