import { create } from 'zustand'

// 프로필(닉네임/아바타)을 localStorage에 저장해 마이페이지와 수정 화면이 공유한다.
// TODO(API 연동): 서버 복구 시 GET/PATCH /customer/profile 로 교체.

const NICKNAME_KEY = 'lq.profile.nickname'
const AVATAR_KEY = 'lq.profile.avatar'

interface ProfileState {
  nickname: string
  avatarUrl: string | null
  setProfile: (p: { nickname: string; avatarUrl: string | null }) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  nickname: localStorage.getItem(NICKNAME_KEY) ?? '지우',
  avatarUrl: localStorage.getItem(AVATAR_KEY),

  setProfile: ({ nickname, avatarUrl }) => {
    localStorage.setItem(NICKNAME_KEY, nickname)
    if (avatarUrl) {
      localStorage.setItem(AVATAR_KEY, avatarUrl)
    } else {
      localStorage.removeItem(AVATAR_KEY)
    }
    set({ nickname, avatarUrl })
  },
}))
