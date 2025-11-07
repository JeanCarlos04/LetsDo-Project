import useContextHook from "../hooks/useContextHook";
import type { TasksType } from "../types/TasksType";
import {
  FaLockOpen,
  FaHammer,
  FaCircleCheck,
  FaAngleDown,
} from "react-icons/fa6";

type SelectStatusProps = {
  task: TasksType;
};

function SelectStatus({ task }: SelectStatusProps) {
  const { setShowTableModals, showTableModals } = useContextHook();

  return (
    <>
      <button
        onClick={() =>
          setShowTableModals({
            ...showTableModals,
            taskID: task._id,
            statusModal: !showTableModals.statusModal,
          })
        }
        className={`border-1 px-2 py-1  flex items-center gap-2 rounded-lg font-semibold capitalize text-[14px] cursor-pointer text-nowrap ${
          task.status === "closed"
            ? "text-[#178341f3] font-semibold border-2 border-[#3cc671f3] bg-[#22e08722]"
            : task.status === "in progress"
            ? "text-[#ca8612] font-semibold border-2 border-[#f0d330]  bg-[#e0a72211]"
            : "text-[#0f6195] font-semibold border-2 border-[#2084ff] bg-[#2284e026]"
        }`}
      >
        {task.status === "open" ? (
          <FaLockOpen />
        ) : task.status === "in progress" ? (
          <FaHammer />
        ) : (
          <FaCircleCheck />
        )}
        {task.status}

        <FaAngleDown
          className={`text-[#292929] duration-200 ${
            showTableModals.taskID === task._id &&
            showTableModals.statusModal === true
              ? "rotate-180"
              : ""
          }`}
        />
      </button>
    </>
  );
}

export default SelectStatus;
