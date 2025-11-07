import { FaHammer, FaLockOpen, FaCircleCheck } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import type { TasksType } from "../types/TasksType";

type UpdateStatusProps = {
  showModal: boolean;
  task: TasksType["_id"];
};

function UpdateStatus({ showModal, task }: UpdateStatusProps) {
  const { updateTask, setShowTableModals, showTableModals } = useContextHook();

  return (
    <>
      {showModal && (
        <article
          onClick={() =>
            setShowTableModals({
              ...showTableModals,
              statusModal: false,
            })
          }
          className="z-[100] absolute bg-gray-50 shadow-xl border-2 border-gray-200 p-2 rounded-lg flex  flex-col gap-3 translate-y-[5px]  translate-x-[30px]"
        >
          <button
            onClick={() => updateTask(task, { status: "open" })}
            className="text-center text-[#0f6195] border-2 border-[#2084ff] bg-[#2284e026]  px-2 py-1 flex items-center gap-2 rounded-lg font-semibold capitalize text-[14px] cursor-pointer text-nowrap"
          >
            Open <FaLockOpen />
          </button>
          <button
            onClick={() => updateTask(task, { status: "in progress" })}
            className="text-center text-[#ca8612] border-2 border-[#f0d330]  bg-[#e0a72211] px-2 py-1 rounded-lg flex items-center gap-2 font-semibold text-[14px] cursor-pointer capitalize text-nowrap"
          >
            In progress <FaHammer />
          </button>
          <button
            onClick={() => updateTask(task, { status: "closed" })}
            className="text-center text-[#178341f3] border-2 border-[#3cc671f3] bg-[#22e08722] px-2 py-1 rounded-lg flex items-center gap-2 font-semibold text-[14px] cursor-pointer capitalize text-nowrap"
          >
            Closed <FaCircleCheck />
          </button>
        </article>
      )}
    </>
  );
}

export default UpdateStatus;
