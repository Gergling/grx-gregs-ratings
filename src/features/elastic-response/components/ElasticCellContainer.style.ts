import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export const ElasticCellContainer = styled.div<{ variant?: CSSProperties['flexDirection']; }>`
  display: flex;
  flex-direction: ${({ variant = 'column' }) => variant};
  gap: 0.5rem;
  align-items: center;
`;
