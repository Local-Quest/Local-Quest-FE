import { AxiosError } from 'axios'
import { apiClient } from '@/api/client'
import { clearTokens, setTokens } from '@/api/token'
import { USE_MOCK, mockLogin, mockSignup } from '@/api/mock'

export type Role = 'CUSTOMER' | 'OWNER'

export interface LoginRequest {
  username: string
  password: string
  role: Role
}

export interface SignupRequest {
  username: string
  password: string
  nickname: string
  role: Role
}

/** 로그인/회원가입 성공 시 서버가 내려주는 사용자/토큰 정보 */
export interface AuthResponse {
  userId: number | string
  role: Role
  nickname?: string
  accessToken: string
  refreshToken?: string
}

export interface AuthUser {
  userId: number | string
  role: Role
  nickname?: string
}

// 서버 응답 키가 accessToken/token 등으로 흔들릴 수 있어 방어적으로 정규화한다.
function normalize(data: Record<string, unknown>, fallbackRole: Role): AuthResponse {
  const accessToken = (data.accessToken ?? data.token ?? data.access_token) as string
  const refreshToken = (data.refreshToken ?? data.refresh_token) as string | undefined
  return {
    userId: (data.userId ?? data.id ?? data.user_id ?? '') as number | string,
    role: (data.role as Role) ?? fallbackRole,
    nickname: (data.nickname ?? data.name) as string | undefined,
    accessToken,
    refreshToken,
  }
}

// POST /auth/login
export async function login(req: LoginRequest): Promise<AuthResponse> {
  if (USE_MOCK) {
    const auth = await mockLogin(req)
    setTokens(auth.accessToken, auth.refreshToken)
    return auth
  }
  const { data } = await apiClient.post('/auth/login', req)
  const auth = normalize(data, req.role)
  if (auth.accessToken) {
    setTokens(auth.accessToken, auth.refreshToken)
  }
  return auth
}

// POST /auth/signup — 서버가 토큰을 함께 내려주면 자동 로그인, 아니면 토큰 없이 반환.
export async function signup(req: SignupRequest): Promise<AuthResponse | null> {
  if (USE_MOCK) {
    const auth = await mockSignup(req)
    setTokens(auth.accessToken, auth.refreshToken)
    return auth
  }
  const { data } = await apiClient.post('/auth/signup', req)
  if (data && (data.accessToken || data.token)) {
    const auth = normalize(data, req.role)
    setTokens(auth.accessToken, auth.refreshToken)
    return auth
  }
  return null
}

export function logout(): void {
  clearTokens()
}

/** axios 에러를 사용자에게 보여줄 한국어 메시지로 변환 */
export function getAuthErrorMessage(error: unknown, fallback = '잠시 후 다시 시도해주세요'): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    const status = error.response?.status
    if (status === 401 || status === 400) return '아이디 또는 비밀번호를 확인해주세요'
    if (status === 409) return '이미 사용 중인 아이디예요'
    if (error.code === 'ERR_NETWORK') return '네트워크 연결을 확인해주세요'
  }
  return fallback
}
