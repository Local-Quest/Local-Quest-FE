import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, User } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/owner', label: '대시보드', icon: LayoutDashboard, end: true },
  { to: '/owner/manage', label: '관리', icon: ClipboardList, end: false },
  { to: '/owner/mypage', label: '마이페이지', icon: User, end: false },
] as const

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 64px;
  background: #fdfbf8;
  border-top: 1px solid #f1e9df;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
`

const Item = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #c9b3a5;
  font-size: 10px;
  font-weight: 600;

  &.active {
    color: #1f1a15;
  }
`

export function OwnerBottomNav() {
  return (
    <Nav>
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <Item key={to} to={to} end={end}>
          <Icon size={20} strokeWidth={2} />
          <span>{label}</span>
        </Item>
      ))}
    </Nav>
  )
}
