import styled from "@emotion/styled";

export const PageContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  color: #002347;
  border-bottom: 2px solid #0056a0;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Paragraph = styled.p`
  line-height: 1.6;
  color: #333;
`;

export const StyledPanelContainer = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
