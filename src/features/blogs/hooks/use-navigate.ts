import { useNavigate } from "react-router-dom";
import { getBlogUri } from "../utilities";

export const useBlogNavigate = () => {
  const navigate = useNavigate();
  return (slug: string) => navigate(getBlogUri(slug));
};
