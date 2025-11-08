import styled from '@emotion/styled';

export const SurveyProgressMarkerDivider = styled.div<{ partial?: boolean; }>`
  width: 1rem;
  height: 0;
  border-style: ${({ partial }) => partial ? 'dashed' : 'solid' };
  border-width: 2px;
  border-color: ${({ theme: { colors: { primary }}}) => primary.main};
  border-radius: 2px;

  &:first-of-type {
    display: none;
  }
`;

export const StyledSurveyProgress = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
  color: ${({ theme: { colors: { primary } } }) => primary.main};
  align-items: center;
`;
