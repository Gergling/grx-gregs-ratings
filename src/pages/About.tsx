import styled from '@emotion/styled';
import { Typography, TypographyProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { Seo } from '../common/components/Seo';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const headingFactory = (
  variant: TypographyProps['variant'],
) => {
  return styled(styled((props: TypographyProps) => <Typography variant={variant} {...props} />)`
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;
    // padding-bottom: 0.5rem;
    // margin-bottom: 1.5rem;
  `);
};

const Subheading = headingFactory('h6')``;

const Title = headingFactory('h4')`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
`;

const Paragraph = styled.p`
  line-height: 1.6;
  color: #333;
`;

export const AboutPage: React.FC = () => {
  return (
    <PageContainer>
      <Seo
        title="About GM&D"
        description="About Gregory, Michael & Davies cruel and unusual measurements, ratings and categorisations."
      />
      <Title>
        About Gregory, Michael & Davies
      </Title>
      <Paragraph>
        Here at Gregory, Michael & Davies (GMD), we are committed to
        empowering our clients to navigate the complexities of the rapidly
        shifting competitive space with unmatched clarity and confidence. We
        believe that informed decision-making is the cornerstone of sustained
        success.
      </Paragraph>
      <Paragraph>
        Our mission is to deliver robust, innovative solutions that transform
        data. We don't just process information; we refine it. We nurture it.
        We caress it, so that it understands it's always welcome to come back
        to a home where it can find its own slippers and bedroom. This provides
        a crucial lens through which our partners can view and understand their
        operational and strategic positioning.
      </Paragraph>
      <Subheading>
        What We Do
      </Subheading>
      <Paragraph>
        GMD is a recognised leader in the specialised field of cruel and
        unusual measurements, ratings and categorisations. Our...
        <i>unique</i> approaches to data processing are designed to provide
        unparalleled measurements, ratings, and categorisations across critical
        performance vectors.
      </Paragraph>
      <Paragraph>
        We address the crucial need for standardisation and precision in a
        world of accelerating change. By collaborating closely with our
        clients, we develop insights that support risk mitigation, strategic
        investment, and operational efficiency, ultimately fostering a superior
        competitive edge.
      </Paragraph>
      <Subheading>
        Our Commitment
      </Subheading>
      <Paragraph>
        Our <Link to="/team">team</Link> is composed of seasoned professionals and "thought" "leaders"
        dedicated to maintaining the highest standards of integrity,
        reliability, and impressive buzzwords. We are constantly evolving our
        methodologies to ensure our partners always have access to the most
        relevant and forward-thinking tools available.
      </Paragraph>
      <Paragraph>
        At GMD, we deliver more than just data; we deliver the
        foundational <s>obscurity</s> clarity needed for confident future
        planning and strategic execution.
      </Paragraph>
      <Paragraph>
        In essence: We are a trusted partner, delivering solutions that provide
        clarity for confident decision-making, using proprietary frameworks for
        measurement, ratings, and categorisations.
      </Paragraph>
      <Paragraph>
        At Gregory, Michael & Davies, we deliver <Typography variant='h6' component='span' sx={{ fontSize: '1rem' }}>solutions</Typography>.
      </Paragraph>
      <small>
        <small>
          <small>
            We are not responsible for any decisions made based on our data. In fact, we highly recommend you do the exact opposite of whatever our models suggest. It's usually for the best.
          </small>
        </small>
      </small>
    </PageContainer>
  );
};

export default AboutPage;
