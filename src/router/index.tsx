import { createBrowserRouter } from 'react-router-dom'
import { ConsumerLayout } from '@/components/layout/ConsumerLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Main } from '@/pages/Consumer/Main'
import { ComingSoon } from '@/pages/ComingSoon'
import { Welcome } from '@/pages/Auth/Welcome'
import { Login } from '@/pages/Auth/Login'
import { Signup } from '@/pages/Auth/Signup'
import { RoleSelect } from '@/pages/Auth/RoleSelect'
import { CustomerOnboarding } from '@/pages/Auth/CustomerOnboarding'
import { OwnerOnboarding } from '@/pages/Auth/OwnerOnboarding'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ConsumerLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: 'missions', element: <ComingSoon title="미션 리스트" /> },
      { path: 'map', element: <ComingSoon title="지도" /> },
      { path: 'coupons', element: <ComingSoon title="쿠폰" /> },
      { path: 'mypage', element: <ComingSoon title="마이페이지" /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/start', element: <RoleSelect /> },
      { path: '/onboarding', element: <CustomerOnboarding /> },
      { path: '/owner/onboarding', element: <OwnerOnboarding /> },
      { path: '/welcome', element: <Welcome loginPath="/login" signupPath="/signup" /> },
      { path: '/login', element: <Login role="CUSTOMER" signupPath="/signup" homePath="/" /> },
      { path: '/signup', element: <Signup role="CUSTOMER" loginPath="/login" homePath="/" /> },
      { path: '/owner/welcome', element: <Welcome loginPath="/owner/login" signupPath="/owner/signup" showLogo /> },
      { path: '/owner/login', element: <Login role="OWNER" signupPath="/owner/signup" homePath="/owner" /> },
      { path: '/owner/signup', element: <Signup role="OWNER" loginPath="/owner/login" homePath="/owner" /> },
      { path: '/owner', element: <ComingSoon title="사장님 대시보드" /> },
    ],
  },
])
