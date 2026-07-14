// 서버가 내려간 동안 auth를 목데이터로 동작시키는 모듈.
// VITE_USE_MOCK !== 'false' 이면 목 모드로 동작한다(기본값: 목 모드 ON).
// 서버가 복구되면 .env 에서 VITE_USE_MOCK=false 로 바꾸면 실제 API 연동으로 돌아간다.

import type { AuthResponse, LoginRequest, SignupRequest } from '@/api/auth'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function makeToken(prefix: string): string {
  return `${prefix}.${Math.random().toString(36).slice(2)}.${Date.now()}`
}

export async function mockLogin(req: LoginRequest): Promise<AuthResponse> {
  await delay(300)
  return {
    userId: `mock-${req.role.toLowerCase()}-1`,
    role: req.role,
    nickname: req.username || (req.role === 'OWNER' ? '사장님' : '지우'),
    accessToken: makeToken('mock-access'),
    refreshToken: makeToken('mock-refresh'),
  }
}

export async function mockSignup(req: SignupRequest): Promise<AuthResponse> {
  await delay(300)
  return {
    userId: `mock-${req.role.toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
    role: req.role,
    nickname: req.nickname,
    accessToken: makeToken('mock-access'),
    refreshToken: makeToken('mock-refresh'),
  }
}
