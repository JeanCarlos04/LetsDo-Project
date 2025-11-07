import useContextHook from "../hooks/useContextHook";
import { FaRegFlag, FaAngleDown } from "react-icons/fa6";
import type { TasksType } from "../types/TasksType";

type SelectPriorityProps = {
  task: TasksType;
};

function SelectPriority({ task }: SelectPriorityProps) {
  const { setShowTableModals, showTableModals } = useContextHook();

  return (
    <>
      <button
        onClick={() =>
          setShowTableModals({
            ...showTableModals,
            taskID: task._id,
            priorityModal: !showTableModals.priorityModal,
          })
        }
        className={`border-1 px-2 py-1 rounded-lg flex items-center gap-2 font-semibold text-[14px] cursor-pointer capitalize ${
          task.priority === "low"
            ? "text-[#178341f3]  border-2 border-[#3cc671f3] bg-[#22e08722]"
            : task.priority === "medium"
            ? "text-[#ca8612] border-2 border-[#f0d330]  bg-[#e0a72211]"
            : "text-[#b40808] border-2 border-[#ff2020] bg-[#e0222218]"
        }`}
      >
        <FaRegFlag />
        {task.priority}
        <FaAngleDown
          className={`duration-200 text-[#292929] ${
            showTableModals.taskID === task._id &&
            showTableModals.priorityModal === true
              ? "rotate-180"
              : ""
          }`}
        />
      </button>
    </>
  );
}

export default SelectPriority;
