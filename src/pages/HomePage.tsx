import styled from '@emotion/styled';
import { Pane } from '@gergling/ui-components';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  color: #002347;
  border-bottom: 2px solid #0056a0;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  color: #333;
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Title>Welcome to our Absurd Quantitative Applications</Title>
      <Paragraph>
        This is the home page of our esteemed, and entirely fictitious, consulting firm. Here you can find our expertly crafted, yet completely nonsensical, ratings and rankings.
      </Paragraph>
      <Paragraph>
        Navigating to the 'About' page will reveal a brief, and equally absurd, description of our firm's mission and ethos.
      </Paragraph>
      <Pane>What a pane in my ash.</Pane>
    </PageContainer>
  );
};

export default HomePage;
