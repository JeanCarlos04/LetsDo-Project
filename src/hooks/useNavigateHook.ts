import { useNavigate } from "react-router-dom";

export const useCustomNavigateTo = () => {
  const navigate = useNavigate();

  const navigateTo = (url: string) => {
    navigate(`/${url}`);
  };

  return { navigateTo };
};
