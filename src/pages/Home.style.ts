import styled from '@emotion/styled';
import { PageContainer } from '../common/components/styles';

export const HomePageContainer = styled(PageContainer)<{
  width: number;
}>`
  min-width: ${({ width }) => width}rem;
  width: ${({ width }) => width}rem;
`;
