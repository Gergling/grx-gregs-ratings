import { useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppThemeProvider, PageContainer } from '@gergling/ui-components';
import {
  Group as GroupIcon,
  HistoryEdu as HistoryEduIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// TODO: I hate it, but it works. Ideally it would just be imported by the package.
import '@fontsource-variable/bodoni-moda-sc';
import '@fontsource-variable/raleway';
import '@fontsource-variable/raleway/wght-italic.css';
import { getRoute, getRoutes } from '../routes';
import { ElasticResponseContainer } from '../features/elastic-response/components/ElasticResponse';
import { RandometricsProvider } from '../features/randometrics/context';

const MainContent = styled.main`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.grey.A200};
  min-height: 100vh;
`;

const queryClient = new QueryClient();

type NavigationDrawerItem = Parameters<typeof PageContainer>[0]['navigationDrawerProps']['items'][0];

const navItems = [
  {
    icon: <HomeIcon />,
    text: 'Home',
    path: getRoute('home').path,
  },
  {
    icon: <HistoryEduIcon />,
    text: 'Blogs',
    path: getRoute('blogs').path,
  },
  {
    icon: <GroupIcon />,
    text: 'Team',
    path: getRoute('team').path,
  },
];

const useNavigationItems = () => {
  const navigate = useNavigate();
  const items: NavigationDrawerItem[] = useMemo(
    () => navItems.map(({
      icon,
      path,
      text
    }) => ({
      icon,
      onClick: () => navigate(path),
      text
    })),
    []
  );

  return items;
};

const App: React.FC = () => {
  const routes = getRoutes();
  const items = useNavigationItems();
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ElasticResponseContainer>
          <RandometricsProvider>
            <PageContainer
              appHeaderProps={{
                title: 'Gregory, Michael & Davies',
              }}
              navigationDrawerProps={{
                items,
              }}
            >
              <MainContent>
                <Routes>
                  {routes.map(({ props }) => <Route {...props} />)}
                </Routes>
              </MainContent>
            </PageContainer>
          </RandometricsProvider>
        </ElasticResponseContainer>
      </QueryClientProvider>
    </AppThemeProvider>
  );
};

export default App;
