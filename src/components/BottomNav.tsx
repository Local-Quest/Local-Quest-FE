import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { Home, SquareCheck, MapPin, Ticket, User } from 'lucide-react'
import { colors } from '@/styles/tokens'

const NAV_ITEMS = [
  { to: '/', label: '홈', icon: Home, end: true },
  { to: '/missions', label: '미션', icon: SquareCheck, end: false },
  { to: '/map', label: '지도', icon: MapPin, end: false },
  { to: '/coupons', label: '쿠폰', icon: Ticket, end: false },
  { to: '/mypage', label: '마이', icon: User, end: false },
] as const

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 64px;
  background: ${colors.white};
  border-top: 1px solid ${colors.orange200};
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
  color: ${colors.blue900};
  font-size: 10px;
  font-weight: 700;

  &.active {
    color: ${colors.orangeText};
  }
`

export function BottomNav() {
  return (
    <Nav>
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <Item key={to} to={to} end={end}>
          <Icon size={22} strokeWidth={2} />
          <span>{label}</span>
        </Item>
      ))}
    </Nav>
  )
}
