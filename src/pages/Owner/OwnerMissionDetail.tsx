import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'

// ---------------------------------------------------------------------------
// TODO(API 연동): GET /owner/missions/:id -> mission 상세 정보
// ---------------------------------------------------------------------------

const mission = {
  title: '첫 방문 보너스',
  category: '카페',
  storeName: '블루보틀 성수',
  status: '진행중',
  visitTime: '12:00 ~ 18:00',
  minAmount: '1,000원',
  rewardPoints: '+100P',
  rewardNote: '1회 인증당 지급 · 첫 방문 보너스 +50P',
  registeredAt: '2025.01.10',
  totalVerified: '12회',
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fdfbf8;
  font-family: 'Pretendard', sans-serif;
  padding-bottom: 90px;
`

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px;
`

const TitleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MissionTitle = styled.p`
  font-size: 18px;
  color: #1f1a15;
`

const MissionMeta = styled.p`
  font-size: 12px;
  color: #a2917f;
`

const StatusBadge = styled.span`
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 12px;
  background: #2d8c42;
  color: #fdfbf8;
  font-size: 11px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 17px 24px 16px;
  border-top: 1px solid #f1e9df;
`

const SectionTitle = styled.p`
  font-size: 13px;
  color: #1f1a15;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`

const InfoLabel = styled.span`
  color: #6d5f52;
`

const InfoValue = styled.span`
  color: #1f1a15;
`

const RewardBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: #f3e4d7;
`

const RewardValue = styled.p`
  font-size: 22px;
  color: #1f1a15;
`

const RewardNote = styled.p`
  font-size: 12px;
  color: #8b7565;
`

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  display: flex;
  gap: 12px;
  padding: 15px 24px 26px;
  background: #fdfbf8;
  border-top: 1px solid #f1e9df;
`

const EditButton = styled.button`
  flex: 1;
  padding: 15px;
  border-radius: 12px;
  border: none;
  background: #1f1a15;
  color: #fdfbf8;
  font-size: 14px;
  cursor: pointer;
`

const DeleteButton = styled.button`
  flex: 1;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #f2c9bb;
  background: #ffffff;
  color: #d95c3a;
  font-size: 14px;
  cursor: pointer;
`

export function OwnerMissionDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Page>
      <OwnerHeader title="미션 상세" />

      <TitleRow>
        <TitleCol>
          <MissionTitle>{mission.title}</MissionTitle>
          <MissionMeta>
            {mission.category} · {mission.storeName}
          </MissionMeta>
        </TitleCol>
        <StatusBadge>{mission.status}</StatusBadge>
      </TitleRow>

      <Section>
        <SectionTitle>미션 조건</SectionTitle>
        <InfoRow>
          <InfoLabel>방문 시간대</InfoLabel>
          <InfoValue>{mission.visitTime}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>최소 구매 금액</InfoLabel>
          <InfoValue>{mission.minAmount}</InfoValue>
        </InfoRow>
      </Section>

      <Section>
        <SectionTitle>혜택 · 지급 포인트</SectionTitle>
        <RewardBox>
          <RewardValue>{mission.rewardPoints}</RewardValue>
          <RewardNote>{mission.rewardNote}</RewardNote>
        </RewardBox>
      </Section>

      <Section>
        <InfoRow>
          <InfoLabel>등록일</InfoLabel>
          <InfoValue>{mission.registeredAt}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>누적 인증</InfoLabel>
          <InfoValue>{mission.totalVerified}</InfoValue>
        </InfoRow>
      </Section>

      <BottomBar>
        <EditButton type="button" onClick={() => navigate('/owner/missions/register')}>
          수정
        </EditButton>
        <DeleteButton type="button" onClick={() => navigate(`/owner/missions/${id ?? '1'}/delete`)}>
          삭제
        </DeleteButton>
      </BottomBar>
    </Page>
  )
}
