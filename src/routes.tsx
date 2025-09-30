import { RouteProps } from "react-router-dom";
import { BlogPage, HomePage } from "./pages";

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
  },
  blog: {
    path: "/blogs/:slug",
    element: <BlogPage />,
  },
} as const;

type AppRoutes = RouteValidation<typeof routes>;
type RouteName = keyof AppRoutes;

export const getRoute = (name: RouteName) => routes[name];
