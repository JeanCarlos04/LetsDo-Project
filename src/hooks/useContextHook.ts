import { MainContext } from "../contexts/MainContext";
import { useContext } from "react";

const useContextHook = () => {
  const Context = useContext(MainContext);
  return Context;
};

export default useContextHook;
