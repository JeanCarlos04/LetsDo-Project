import {
  FaBatteryQuarter,
  FaBatteryFull,
  FaBatteryHalf,
} from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import type { TasksType } from "../types/TasksType";

type UpdatePriority = {
  showModal: boolean;
  task: TasksType["_id"];
};

function UpdatePriority({ showModal, task }: UpdatePriority) {
  const { updateTask, setShowTableModals, showTableModals } = useContextHook();

  return (
    <>
      {showModal && (
        <article
          onClick={() =>
            setShowTableModals({
              ...showTableModals,
              priorityModal: false,
            })
          }
          className="z-[100] absolute bg-gray-50 shadow-xl border-2 border-gray-200 p-2 rounded-lg flex flex-col gap-3 translate-y-[5px] translate-x-[30px]"
        >
          <button
            onClick={() => updateTask(task, { priority: "low" })}
            className="text-[#178341f3] border-2 border-[#3cc671f3] bg-[#22e0872a] px-2 py-1 rounded-lg flex items-center gap-2 font-semibold text-[14px] cursor-pointer capitalize text-nowrap"
          >
            Low <FaBatteryQuarter className="text-[20px]" />
          </button>
          <button
            onClick={() => updateTask(task, { priority: "medium" })}
            className="text-[#ca8612] border-2 border-[#f0d330]  bg-[#e0a72211] px-2 py-1 rounded-lg flex items-center gap-2 font-semibold text-[14px] cursor-pointer capitalize text-nowrap"
          >
            Medium <FaBatteryHalf className="text-[20px]" />
          </button>
          <button
            onClick={() => updateTask(task, { priority: "high" })}
            className="text-[#b40808] border-2 border-[#ff2020] bg-[#e0222218]  px-2 py-1 rounded-lg flex items-center gap-2 font-semibold text-[14px] cursor-pointer capitalize text-nowrap"
          >
            High <FaBatteryFull className="text-[20px]" />
          </button>
        </article>
      )}
    </>
  );
}

export default UpdatePriority;
