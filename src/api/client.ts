import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/api/token'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
})

// 리프레시 전용 axios 인스턴스: 인터셉터 무한루프를 피하려고 apiClient와 분리한다.
const refreshClient = axios.create({ baseURL, timeout: 10_000 })

// 요청 인터셉터: 액세스 토큰이 있으면 Authorization 헤더로 첨부.
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 동시에 여러 요청이 401을 받을 때 리프레시가 중복 호출되지 않도록 in-flight 프로미스를 공유한다.
let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('NO_REFRESH_TOKEN')
  }
  // POST /auth/refresh { refreshToken } -> { accessToken, refreshToken? }
  const { data } = await refreshClient.post('/auth/refresh', { refreshToken })
  const nextAccess: string = data.accessToken ?? data.token
  const nextRefresh: string | undefined = data.refreshToken
  if (!nextAccess) {
    throw new Error('INVALID_REFRESH_RESPONSE')
  }
  setTokens(nextAccess, nextRefresh)
  return nextAccess
}

// 응답 인터셉터: 401이면 한 번 리프레시 후 원 요청을 재시도한다.
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined
    const status = error.response?.status
    const url = original?.url ?? ''

    const isAuthEndpoint =
      url.includes('/auth/login') || url.includes('/auth/signup') || url.includes('/auth/refresh')

    if (status === 401 && original && !original._retried && !isAuthEndpoint && getRefreshToken()) {
      original._retried = true
      try {
        refreshPromise = refreshPromise ?? refreshAccessToken()
        const newToken = await refreshPromise
        refreshPromise = null
        original.headers.Authorization = `Bearer ${newToken}`
        return apiClient(original)
      } catch (refreshError) {
        refreshPromise = null
        clearTokens()
        // 세션 만료를 앱 전역에서 감지할 수 있도록 이벤트 발행 (라우팅은 리스너에서 처리)
        window.dispatchEvent(new CustomEvent('auth:session-expired'))
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
