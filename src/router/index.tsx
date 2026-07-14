import { createBrowserRouter } from 'react-router-dom'
import { ConsumerLayout } from '@/components/layout/ConsumerLayout'
import { Main } from '@/pages/Consumer/Main'
import { ComingSoon } from '@/pages/ComingSoon'

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
])
