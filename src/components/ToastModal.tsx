import { FaCirclePlus, FaPenToSquare, FaCircleXmark } from "react-icons/fa6";

export type ToastModal =
  | "Deleted Task succesfully"
  | "Updated task succesfully"
  | "Task created succesfully"
  | "Logged succesfully"
  | "Registered succesfully"
  | "Section created succesfully";

import { useEffect, useState } from "react";
import useContextHook from "../hooks/useContextHook";

function ToastModal() {
  const { toastModal } = useContextHook();
  const [showClass, setShowClass] = useState("hidden");

  useEffect(() => {
    if (toastModal) {
      setShowClass("showToast");

      const hide = setTimeout(() => {
        setShowClass("hideToast");
      }, 3000);

      const remove = setTimeout(() => {
        setShowClass("hidden");
      }, 3500);

      return () => {
        clearTimeout(hide);
        clearTimeout(remove);
      };
    }
  }, [toastModal]);

  return (
    <>
      <article
        className={`${
          toastModal === "Task created succesfully" ||
          toastModal === "Section created succesfully"
            ? "bg-green-400 border-green-500"
            : toastModal === "Deleted Task succesfully"
            ? "bg-red-400 border-red-500"
            : "bg-blue-400 border-blue-500"
        } ${showClass} fixed bottom-[50px] left-[50%] border translate-y-1/2 p-2 rounded-md text-white font-semibold flex flex-nowrap items-center gap-2`}
      >
        <p>{toastModal}</p>
        {toastModal === "Task created succesfully" ? (
          <FaCirclePlus />
        ) : toastModal === "Deleted Task succesfully" ? (
          <FaCircleXmark />
        ) : (
          <FaPenToSquare />
        )}
      </article>
    </>
  );
}

export default ToastModal;
