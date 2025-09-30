import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import AboutPage from '../pages/About';
import { AppHeader, AppThemeProvider } from '@gergling/ui-components';

// TODO: I hate it, but it works. Ideally it would just be imported by the package.
import '@fontsource-variable/bodoni-moda-sc';
import '@fontsource-variable/raleway';
import '@fontsource-variable/raleway/wght-italic.css';
import { getRoutes } from '../routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Header = styled(AppHeader)`
  // background-color: #002347;
  // color: white;
  // padding: 1rem;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // border-bottom: 2px solid #0056a0;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const queryClient = new QueryClient();

const App: React.FC = () => {
  const routes = getRoutes();
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Header title='Gregory, Michael & Davies'/>
        <Nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </Nav>
        <MainContent>
          <Routes>
            {routes.map(({ props }) => <Route {...props} />)}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MainContent>
      </QueryClientProvider>
    </AppThemeProvider>
  );
};

export default App;
