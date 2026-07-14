import { createBrowserRouter } from 'react-router-dom'
import { ConsumerLayout } from '@/components/layout/ConsumerLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { OwnerLayout } from '@/components/layout/OwnerLayout'
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
import { MissionCompleteModal } from '@/pages/Consumer/MissionCompleteModal'
import { MonthlyProgress } from '@/pages/Consumer/MonthlyProgress'
import { ProfileEdit } from '@/pages/Consumer/ProfileEdit'
import { PointsHistory } from '@/pages/Consumer/PointsHistory'
import { MissionHistory } from '@/pages/Consumer/MissionHistory'
import { Settings } from '@/pages/Consumer/Settings'
import { Welcome } from '@/pages/Auth/Welcome'
import { Login } from '@/pages/Auth/Login'
import { Signup } from '@/pages/Auth/Signup'
import { RoleSelect } from '@/pages/Auth/RoleSelect'
import { CustomerOnboarding } from '@/pages/Auth/CustomerOnboarding'
import { OwnerOnboarding } from '@/pages/Auth/OwnerOnboarding'
import { OwnerMain } from '@/pages/Owner/OwnerMain'
import { OwnerManage } from '@/pages/Owner/OwnerManage'
import { OwnerMyPage } from '@/pages/Owner/OwnerMyPage'
import { StoreRegister } from '@/pages/Owner/StoreRegister'
import { MissionRegister } from '@/pages/Owner/MissionRegister'
import { DiscountRegister } from '@/pages/Owner/DiscountRegister'
import { CouponCreate } from '@/pages/Owner/CouponCreate'
import { OwnerCouponManage } from '@/pages/Owner/OwnerCouponManage'
import { OwnerMissionDetail } from '@/pages/Owner/OwnerMissionDetail'
import { MissionDeleteModal } from '@/pages/Owner/MissionDeleteModal'
import { DiscountUpdateModal } from '@/pages/Owner/DiscountUpdateModal'
import { OwnerCouponDetail } from '@/pages/Owner/OwnerCouponDetail'
import { CouponUseModal } from '@/pages/Owner/CouponUseModal'
import { CouponUseComplete } from '@/pages/Owner/CouponUseComplete'
import { VisitDashboard } from '@/pages/Owner/VisitDashboard'
import { StoreEdit } from '@/pages/Owner/StoreEdit'

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
    path: '/owner',
    element: <OwnerLayout />,
    children: [
      { index: true, element: <OwnerMain /> },
      { path: 'manage', element: <OwnerManage /> },
      { path: 'coupons', element: <OwnerCouponManage /> },
      { path: 'mypage', element: <OwnerMyPage /> },
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
      { path: '/missions/:id/verify/complete', element: <MissionCompleteModal /> },
      { path: '/calendar', element: <MonthlyProgress /> },
      { path: '/mypage/edit', element: <ProfileEdit /> },
      { path: '/mypage/points', element: <PointsHistory /> },
      { path: '/mypage/missions', element: <MissionHistory /> },
      { path: '/mypage/settings', element: <Settings /> },
      { path: '/onboarding', element: <CustomerOnboarding /> },
      { path: '/owner/onboarding', element: <OwnerOnboarding /> },
      { path: '/welcome', element: <Welcome loginPath="/login" signupPath="/signup" /> },
      { path: '/login', element: <Login role="CUSTOMER" signupPath="/signup" homePath="/" /> },
      { path: '/signup', element: <Signup role="CUSTOMER" loginPath="/login" homePath="/" /> },
      { path: '/owner/welcome', element: <Welcome loginPath="/owner/login" signupPath="/owner/signup" showLogo /> },
      { path: '/owner/login', element: <Login role="OWNER" signupPath="/owner/signup" homePath="/owner" /> },
      { path: '/owner/signup', element: <Signup role="OWNER" loginPath="/owner/login" homePath="/owner" /> },
      { path: '/owner/store/register', element: <StoreRegister /> },
      { path: '/owner/missions/register', element: <MissionRegister /> },
      { path: '/owner/discounts/register', element: <DiscountRegister /> },
      { path: '/owner/coupons/create', element: <CouponCreate /> },
      { path: '/owner/coupons/:id', element: <OwnerCouponDetail /> },
      { path: '/owner/coupons/:id/use', element: <CouponUseModal /> },
      { path: '/owner/coupons/:id/use/complete', element: <CouponUseComplete /> },
      { path: '/owner/missions/:id', element: <OwnerMissionDetail /> },
      { path: '/owner/missions/:id/delete', element: <MissionDeleteModal /> },
      { path: '/owner/discounts/:id/edit', element: <DiscountUpdateModal /> },
      { path: '/owner/dashboard', element: <VisitDashboard /> },
      { path: '/owner/store/edit', element: <StoreEdit /> },
    ],
  },
])
