import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

const Header = styled.header`
  background-color: #002347;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #0056a0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056a0;
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  background-color: #f4f7f9;
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <>
      <Header>
        <h1>Gregory, Michael & Davies</h1>
        <Nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </Nav>
      </Header>
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MainContent>
    </>
  );
};

export default App;
