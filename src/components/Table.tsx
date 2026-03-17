import { useEffect, useState } from "react";
import TaskActions from "./TaskActions";
import UpdatePriority from "./UpdatePriority";
import UpdateStatus from "./UpdateStatus";
import useContextHook from "../hooks/useContextHook";
import type { TasksType } from "../types/TasksType";
import SelectPriority from "./SelectPrority";
import SelectStatus from "./SelectStatus";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";
import HeaderActions from "./HeaderActions";
import {
  FaCircleExclamation,
  FaEllipsis,
  FaPlus,
  FaCalendarXmark,
  FaCalendarDays,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import type { Sections } from "./SectionList";

type TableProps = {
  sectionData: Sections;
};

function Table({ sectionData }: TableProps) {
  const { tasks } = sectionData;
  const [task, setTask] = useState<TasksType[]>([]);
  const {
    setShowTableModals,
    showTableModals,
    filteredTasks,
    filter,
    filterByDate,
  } = useContextHook();
  const { t } = useTranslation();

  useEffect(() => {
    let baseTask = tasks;

    if (filteredTasks.length > 0) {
      baseTask = filteredTasks;
    }

    setTask(
      baseTask.filter((task) => {
        const isMatchPriority =
          (task.priority === "low" && filter.low) ||
          (task.priority === "medium" && filter.medium) ||
          (task.priority === "high" && filter.high) ||
          (!filter.low && !filter.medium && !filter.high);

        const statusMatch =
          (filter.open && task.status === "open") ||
          (filter.InProgress && task.status === "in progress") ||
          (filter.closed && task.status === "closed") ||
          (!filter.open && !filter.InProgress && !filter.closed);

        const isMatchExpireDate =
          new Date(task.expires).toLocaleDateString() ===
            new Date(filterByDate!).toLocaleDateString() || !filterByDate;

        return isMatchPriority && statusMatch && isMatchExpireDate;
      })
    );
  }, [filteredTasks, tasks, filter, filterByDate]);

  const {
    firstIndex,
    lastIndex,
    setCurrentPage,
    buttons,
    currentPage,
    setItemsPerPage,
    itemsPerPage,
  } = usePagination(filteredTasks.length > 0 ? filteredTasks : tasks);

  return (
    <>
      {task.length < 1 &&
      Object.values(filter).every((value) => value === false) ? (
        <section className="flex flex-col items-center gap-6 text-gray-500 h-[300px] justify-center">
          <p className="font-medium text-2xl">
            You don't have task for this section yet.
          </p>
          <FaCalendarXmark className="text-gray-500 text-[50px]" />
        </section>
      ) : (
        <>
          {" "}
          <section className="flex flex-col gap-6 pb-8 w-full">
            <header className="flex flex-col gap-2">
              <h2 className="font-bold text-xl">{sectionData.title}</h2>
              <hr className="text-[#f0f0f0] border" />
            </header>

            <div>
              <HeaderActions />
              {(Object.values(filter).some((value) => value === true) ||
                task.length > 0) && (
                <div className="overflow-x-auto md:overflow-visible">
                  <table
                    role="table"
                    className="md:w-full shadow-md border border-gray-200"
                  >
                    <thead className=" bg-gray-100 h-10 border-b border-gray-300">
                      <tr className="text-start  h-[45px]">
                        <th className="font-medium text-start pl-5 ">
                          {t("tableHeader.subject")}
                        </th>
                        <th className="font-medium text-start">
                          {" "}
                          {t("tableHeader.description")}
                        </th>
                        <th className="font-medium text-start">
                          <div className="h-full flex items-center gap-2">
                            {t("tableHeader.priority")}{" "}
                            <FaCircleExclamation className="text-gray-500" />
                          </div>
                        </th>
                        <th className="font-medium text-start">
                          {" "}
                          {t("tableHeader.status")}
                        </th>
                        <th className="font-medium text-start">
                          <div className="h-full flex items-center gap-2">
                            Expires in{" "}
                            <FaCalendarDays className="text-gray-500" />
                          </div>
                        </th>
                        <th className="font-medium pr-1">
                          <FaPlus className="text-gray-500 text-sm" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.slice(firstIndex, lastIndex).map((task) => {
                        return (
                          <tr
                            key={task._id}
                            className="bg-white overflow-hidden h-[55px] border-b hover:bg-gray-100 border-gray-300 cursor-pointer duration-75"
                          >
                            <td className="pl-5 text-[14px] text-nowrap 2xl:text-[16px]">
                              {task.title}
                            </td>
                            <td className="overflow-ellipsis text-[14px] px-4 min-w-[200px] 2xl:text-[16px]">
                              {task.description}
                            </td>
                            <td className="relative md:p-0 pr-4">
                              <SelectPriority task={task} />
                              {showTableModals.taskID === task._id && (
                                <UpdatePriority
                                  task={task._id}
                                  showModal={showTableModals.priorityModal}
                                />
                              )}
                            </td>
                            <td className="relative md:p-0 pr-4">
                              <SelectStatus task={task} />
                              {showTableModals.taskID === task._id && (
                                <UpdateStatus
                                  task={task._id}
                                  showModal={showTableModals.statusModal}
                                />
                              )}
                            </td>
                            <td className="relative md:p-0 pr-4 text-start font-medium">
                              {
                                new Date(task.expires)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </td>
                            <td
                              onClick={() =>
                                setShowTableModals({
                                  ...showTableModals,
                                  taskID: task._id,
                                  moreActionsModal:
                                    !showTableModals.moreActionsModal,
                                })
                              }
                            >
                              <button>
                                <FaEllipsis className="text-gray-500 cursor-pointer" />
                              </button>
                              {showTableModals.taskID === task._id &&
                                showTableModals.moreActionsModal === true && (
                                  <TaskActions
                                    taskId={task._id}
                                    showActionModal={
                                      showTableModals.moreActionsModal
                                    }
                                  />
                                )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
          <Pagination
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            allTasks={tasks}
            pages={buttons}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}

export default Table;
