import styled from '@emotion/styled';
import { StyledPanelContainer } from '../../../common/components/styles';

export const ElasticResponsivePanelContainer = styled(StyledPanelContainer)<{
  width: number;
}>`
  min-width: ${({ width }) => width}rem;
  width: ${({ width }) => width}rem;
`;
