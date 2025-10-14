import { RouteProps } from "react-router-dom";
import { BlogListPage, BlogPage, HomePage, TeamPage } from "./pages";

type RouteTemplate = {
  [key: string]: RouteProps;
};
type RouteValidation<T extends RouteTemplate> = T;

const routes = {
  home: {
    path: "/",
    element: <HomePage />,
  },
  blogs: {
    path: "/blogs",
    element: <BlogListPage />,
  },
  blog: {
    path: "/blogs/:slug",
    element: <BlogPage />,
  },
  team: {
    path: "/team",
    element: <TeamPage />,
  },
} as const;

type AppRoutes = RouteValidation<typeof routes>;
type RouteName = keyof AppRoutes;

export const getRoute = (name: RouteName) => routes[name];
export const getRoutes = () => Object
  .entries(routes)
  .map(([
    key,
    props
  ]) => ({
    key,
    props,
  }));
