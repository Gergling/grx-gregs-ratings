import styled from '@emotion/styled';

export const StyledProgressMarker = styled.div`
  &::after {
    width: 1rem;
    height: 1px;
    border-style: solid;
    border-width: 2px;
    border-color: ${({ theme: { colors: { primary }}}) => primary.main};
  }
`;

export const ProgressMarkerDivider = styled.div<{ partial?: boolean; }>`
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
