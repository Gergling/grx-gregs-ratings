import styled from '@emotion/styled';
import { useNavigationDrawer } from '@gergling/ui-components';
import { FeaturedBlogs } from '../features/blogs/components/FeaturedBlogs';
// import { PersonalityType } from '../features/surveys/components/PersonalityType';
import { RandometricsPane } from '../features/randometrics';
import { useElasticResponse } from '../features/elastic-response';
import { useEffect, useMemo } from 'react';
import { getRem } from '../features/elastic-response/utilities/rem-cell';
import { PageContainer } from '../common/components/styles';
import { HomePageContainer } from './Home.style';

// const PageContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 2rem;
//   background-color: white;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
// `;

// const Title = styled.h2`
//   color: #002347;
//   border-bottom: 2px solid #0056a0;
//   padding-bottom: 0.5rem;
//   margin-bottom: 1.5rem;
// `;

// const Paragraph = styled.p`
//   line-height: 1.6;
//   color: #333;
// `;

export const HomePage: React.FC = () => {
  const { breakpoint, getWidth, size } = useElasticResponse();
  // const minimum = breakpoints[0];
  // const maximum = breakpoints[breakpoints.length - 1];
  // const { containerLeftMargin } = useNavigationDrawer();
  // const width = useMemo(
  //   () => Math.max(
  //     getRem(breakpoint, 1).width,
  //     getRem(size, 1).width
  //   ) - 7 - (containerLeftMargin > 0 ? 2 : 0),
  //   [breakpoint, containerLeftMargin, size]
  // );
  const width = useMemo(
    () => getWidth(7),
    [getWidth]
  );
  // useEffect(() => {
  //   console.log('page', width, breakpoint, size, getRem(breakpoint, 1).width,
  //     getRem(size, 1).width, containerLeftMargin)
  // }, [width, breakpoint, size, containerLeftMargin]);
  return (
    <HomePageContainer width={width}>
      <RandometricsPane />
      <FeaturedBlogs />
      {/* <BlogProgress /> */}
      {/* <Title>Welcome to our Absurd Quantitative Applications</Title>
      <Paragraph>
        This is the home page of our esteemed, and entirely fictitious, consulting firm. Here you can find our expertly crafted, yet completely nonsensical, ratings and rankings.
      </Paragraph>
      <Paragraph>
        Navigating to the 'About' page will reveal a brief, and equally absurd, description of our firm's mission and ethos.
      </Paragraph>
      <PersonalityType /> */}
    </HomePageContainer>
  );
};

export default HomePage;
