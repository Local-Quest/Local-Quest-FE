import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { OwnerHeader } from '@/components/owner/OwnerHeader'
import { FormPage, FormBody, Field, FieldLabel, FieldSubLabel, TextInput, Select, HintText, PrimaryButton } from '@/components/owner/form'

// ---------------------------------------------------------------------------
// TODO(API 연동): POST /owner/missions -> {category, visitTimeRange, minAmount, rewardPoints}
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { emoji: '☕', label: '카페' },
  { emoji: '🍔', label: '음식' },
  { emoji: '🏪', label: '편의점' },
  { emoji: '🍰', label: '베이커리' },
  { emoji: '🍜', label: '라면/주점' },
  { emoji: '💇', label: '미용' },
  { emoji: '🎬', label: '영화/놀이' },
  { emoji: '🎵', label: '문화생활' },
  { emoji: '⚽', label: '스포츠' },
]

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`

const CategoryChip = styled.button<{ active: boolean }>`
  padding: 12px 8px;
  border-radius: 10px;
  border: 1px solid ${(p) => (p.active ? '#e6853d' : '#f0e7dc')};
  background: ${(p) => (p.active ? '#fef3e9' : '#fdfbf8')};
  font-size: 11px;
  color: #1f1a15;
  cursor: pointer;
  text-align: center;
`

export function MissionRegister() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<string | null>(null)

  return (
    <FormPage>
      <OwnerHeader title="미션 등록" />
      <FormBody>
        <Field>
          <FieldLabel>미션 카테고리 *</FieldLabel>
          <CategoryGrid>
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c.label}
                type="button"
                active={category === c.label}
                onClick={() => setCategory(c.label)}
              >
                {c.emoji} {c.label}
              </CategoryChip>
            ))}
          </CategoryGrid>
        </Field>

        <Field>
          <FieldLabel>미션 조건</FieldLabel>
          <FieldSubLabel>방문 시간대 (선택)</FieldSubLabel>
          <Select defaultValue="제한 없음">
            <option>제한 없음</option>
            <option>11:00 ~ 20:00</option>
            <option>18:00 이후</option>
          </Select>
          <FieldSubLabel>최소 구매 금액</FieldSubLabel>
          <TextInput type="number" placeholder="0" />
        </Field>

        <Field>
          <FieldLabel>미션 보상</FieldLabel>
          <TextInput type="number" placeholder="포인트 입력" />
          <HintText>※ 1회 미션당 지급 포인트</HintText>
        </Field>

        <PrimaryButton type="button" onClick={() => navigate('/owner/manage')}>
          미션 등록
        </PrimaryButton>
      </FormBody>
    </FormPage>
  )
}
