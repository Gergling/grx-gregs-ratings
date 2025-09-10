import styled from '@emotion/styled';

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

const AboutPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>About Our Firm</Title>
      <Paragraph>
        At Gregory, Michael & Davies, we believe that every complex problem can be solved with an even more complex, and equally baseless, mathematical model. Our team of world-renowned analysts, who are paid entirely in hypothetical equity, are dedicated to providing you with ratings and rankings that are both impeccably formatted and utterly useless.
      </Paragraph>
      <Paragraph>
        We are not responsible for any decisions made based on our data. In fact, we highly recommend you do the exact opposite of whatever our models suggest. It's usually for the best.
      </Paragraph>
    </PageContainer>
  );
};

export default AboutPage;
