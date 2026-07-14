import { create } from 'zustand'
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  type AuthUser,
  type LoginRequest,
  type SignupRequest,
} from '@/api/auth'

const USER_KEY = 'lq.user'

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function persistUser(user: AuthUser | null): void {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_KEY)
  }
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  /** 로그인. 성공 시 스토어/토큰 저장 */
  login: (req: LoginRequest) => Promise<AuthUser>
  /** 회원가입. 서버가 토큰을 주면 자동 로그인되며 AuthUser 반환, 아니면 null */
  signup: (req: SignupRequest) => Promise<AuthUser | null>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  const stored = readStoredUser()
  return {
    user: stored,
    isAuthenticated: stored !== null,

    login: async (req) => {
      const res = await loginApi(req)
      const user: AuthUser = { userId: res.userId, role: res.role, nickname: res.nickname }
      persistUser(user)
      set({ user, isAuthenticated: true })
      return user
    },

    signup: async (req) => {
      const res = await signupApi(req)
      if (!res) return null
      const user: AuthUser = { userId: res.userId, role: res.role, nickname: res.nickname }
      persistUser(user)
      set({ user, isAuthenticated: true })
      return user
    },

    logout: () => {
      logoutApi()
      persistUser(null)
      set({ user: null, isAuthenticated: false })
    },
  }
})

// 세션 만료(리프레시 실패) 시 스토어도 초기화한다.
window.addEventListener('auth:session-expired', () => {
  persistUser(null)
  useAuthStore.setState({ user: null, isAuthenticated: false })
})
