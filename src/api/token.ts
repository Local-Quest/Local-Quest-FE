// 액세스/리프레시 토큰을 localStorage에 보관하는 저장소.
// React 밖(axios 인터셉터)에서도 접근해야 하므로 zustand가 아닌 단순 모듈로 둔다.

const ACCESS_TOKEN_KEY = 'lq.accessToken'
const REFRESH_TOKEN_KEY = 'lq.refreshToken'

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
