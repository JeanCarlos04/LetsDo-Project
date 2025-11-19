import { FaXmark, FaPenToSquare } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import type { TasksType } from "../types/TasksType";
import { useTranslation } from "react-i18next";

type MoreActionsProps = {
  showActionModal: boolean;
  taskId: TasksType["_id"];
};

function TaskActions({ showActionModal, taskId }: MoreActionsProps) {
  const { deleteTasks, setShowModal, showModal, setGetTaskId } =
    useContextHook();
  const { t } = useTranslation();
  return (
    <>
      {showActionModal && (
        <article className="z-100 absolute bg-gray-50 shadow-xl border-2 border-gray-200 p-2 rounded-lg flex flex-col gap-2  translate-x-[-120px]">
          <button
            onClick={() => deleteTasks(taskId)}
            className="group hover:bg-gray-200 rounded-lg px-2 py-1 cursor-pointer font-semibold flex items-center gap-2 text-nowrap duration-200"
          >
            {t("taskActions.deleteButton")}
            <FaXmark className="group-hover:text-[red] duration-200" />
          </button>
          <button
            onClick={() => {
              setGetTaskId(taskId);
              setShowModal({
                ...showModal,
                mode: "update",
                show: !showModal.show,
              });
            }}
            className="group px-2 py-1 rounded-lg hover:bg-gray-200 duration-200 cursor-pointer font-semibold flex items-center gap-2"
          >
            {t("taskActions.editTask")}{" "}
            <FaPenToSquare className="group-hover:text-blue-500" />
          </button>
        </article>
      )}
    </>
  );
}

export default TaskActions;
