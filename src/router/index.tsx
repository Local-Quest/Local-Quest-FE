import { createBrowserRouter } from 'react-router-dom'
import { ConsumerLayout } from '@/components/layout/ConsumerLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Main } from '@/pages/Consumer/Main'
import { Missions } from '@/pages/Consumer/Missions'
import { Map } from '@/pages/Consumer/Map'
import { Coupons } from '@/pages/Consumer/Coupons'
import { MyPage } from '@/pages/Consumer/MyPage'
import { MissionDetail } from '@/pages/Consumer/MissionDetail'
import { ReceiptCapture } from '@/pages/Consumer/ReceiptCapture'
import { ReceiptAnalyzing } from '@/pages/Consumer/ReceiptAnalyzing'
import { ReceiptSuccess } from '@/pages/Consumer/ReceiptSuccess'
import { ReceiptFailure } from '@/pages/Consumer/ReceiptFailure'
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
      { path: 'missions', element: <Missions /> },
      { path: 'map', element: <Map /> },
      { path: 'coupons', element: <Coupons /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/start', element: <RoleSelect /> },
      { path: '/missions/:id', element: <MissionDetail /> },
      { path: '/missions/:id/verify', element: <ReceiptCapture /> },
      { path: '/missions/:id/verify/analyzing', element: <ReceiptAnalyzing /> },
      { path: '/missions/:id/verify/success', element: <ReceiptSuccess /> },
      { path: '/missions/:id/verify/failure', element: <ReceiptFailure /> },
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
