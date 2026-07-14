import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 24px;
  border-bottom: 1px solid #f1e9df;
  flex-shrink: 0;
`

const BackButton = styled.button`
  position: absolute;
  left: 24px;
  background: none;
  border: none;
  color: #1f1a15;
  cursor: pointer;
  display: flex;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #1f1a15;
`

/** 사장님 페이지 공용 상단바 (뒤로가기 + 타이틀) */
export function OwnerHeader({ title }: { title: string }) {
  const navigate = useNavigate()
  return (
    <Bar>
      <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
      </BackButton>
      <Title>{title}</Title>
    </Bar>
  )
}
