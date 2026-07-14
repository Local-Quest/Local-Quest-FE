import { useRef } from 'react'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { X, Camera, Image, RotateCw } from 'lucide-react'

// ---------------------------------------------------------------------------
// TODO(API 연동): 지금은 파일 선택으로 촬영을 대체함 (실제 카메라 프리뷰 미구현)
// - 촬영/선택된 이미지를 POST /customer/missions/:id/verify 로 전송
// - 실제 카메라 스트림이 필요하면 getUserMedia + <video>로 교체 예정
// ---------------------------------------------------------------------------

const mission = { storeName: '블루보틀 성수' }

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #1a1613;
  font-family: 'Pretendard', sans-serif;
  padding-bottom: 34px;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 24px 8px;
`

const CloseButton = styled.button`
  position: absolute;
  left: 24px;
  background: none;
  border: none;
  color: #fdfbf8;
  cursor: pointer;
  display: flex;
`

const HeaderTitle = styled.p`
  color: #fdfbf8;
  font-weight: 600;
  font-size: 16px;
`

const Subtitle = styled.p`
  color: #d9c9bb;
  font-size: 13px;
  text-align: center;
  padding: 0 24px 26px;
`

const FrameWrap = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 34px;
`

const ScanFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 322px;
  height: 429px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(154deg, #2a231d 11%, #1a1613 89%);
`

const cornerBase = `
  position: absolute;
  width: 37px;
  height: 37px;
  border-color: #f2913d;
  border-style: solid;
`

const CornerTL = styled.div`
  ${cornerBase}
  left: 16px;
  top: 16px;
  border-width: 3px 0 0 3px;
  border-top-left-radius: 8px;
`
const CornerTR = styled.div`
  ${cornerBase}
  right: 16px;
  top: 16px;
  border-width: 3px 3px 0 0;
  border-top-right-radius: 8px;
`
const CornerBL = styled.div`
  ${cornerBase}
  left: 16px;
  bottom: 16px;
  border-width: 0 0 3px 3px;
  border-bottom-left-radius: 8px;
`
const CornerBR = styled.div`
  ${cornerBase}
  right: 16px;
  bottom: 16px;
  border-width: 0 3px 3px 0;
  border-bottom-right-radius: 8px;
`

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  background: linear-gradient(to right, transparent, #f2913d 50%, transparent);
`

const ScanHint = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0.55;
  color: #d9c9bb;
`

const ScanHintText = styled.p`
  font-size: 12px;
`

const Controls = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
`

const SideButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: #2a231d;
  color: #fdfbf8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ShutterButton = styled.button`
  width: 84px;
  height: 84px;
  border-radius: 44.5px;
  background: #fdfbf8;
  border: 5px solid #55483d;
  cursor: pointer;
`

const HiddenInput = styled.input`
  display: none;
`

export function ReceiptCapture() {
  const navigate = useNavigate()
  const { id } = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const goToAnalyzing = () => navigate(`/missions/${id ?? '1'}/verify/analyzing`)

  return (
    <Page>
      <Header>
        <CloseButton type="button" aria-label="닫기" onClick={() => navigate(-1)}>
          <X size={22} />
        </CloseButton>
        <HeaderTitle>영수증 촬영</HeaderTitle>
      </Header>
      <Subtitle>{mission.storeName} · 영수증 전체가 보이게 촬영하세요</Subtitle>

      <FrameWrap>
        <ScanFrame>
          <CornerTL />
          <CornerTR />
          <CornerBL />
          <CornerBR />
          <ScanLine />
          <ScanHint>
            <Camera size={40} />
            <ScanHintText>영수증을 프레임 안에 맞춰주세요</ScanHintText>
          </ScanHint>
        </ScanFrame>
      </FrameWrap>

      <Controls>
        <SideButton type="button" aria-label="갤러리에서 선택" onClick={() => fileInputRef.current?.click()}>
          <Image size={22} />
        </SideButton>
        <ShutterButton type="button" aria-label="촬영" onClick={goToAnalyzing} />
        <SideButton type="button" aria-label="다시 시도">
          <RotateCw size={22} />
        </SideButton>
      </Controls>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          if (e.target.files?.[0]) goToAnalyzing()
        }}
      />
    </Page>
  )
}
