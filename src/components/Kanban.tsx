import useContextHook from "../hooks/useContextHook";
import UpdateStatus from "./UpdateStatus";
import UpdatePriority from "./UpdatePriority";
import type { Status } from "../types/TasksType";
import HeaderActions from "./HeaderActions";
import SelectPriority from "./SelectPrority";
import SelectStatus from "./SelectStatus";
import { useTranslation } from "react-i18next";
import type { Sections } from "./SectionList";

type KanbanProps = {
  sectionData: Sections;
};

function Kanban({ sectionData }: KanbanProps) {
  const { tasks } = sectionData;
  const { showTableModals } = useContextHook();
  const { t } = useTranslation();

  const renderKanbanColumn = (
    status: Status,
    bg_color: string,
    border_color: string,
    title: string
  ) => (
    <section
      style={{ backgroundColor: bg_color }}
      className={`flex flex-col 2xl:min-w-[350px] min-w-[300px] gap-4 p-4 rounded-xl self-start`}
    >
      <header>
        <h2 className="font-semibold text-md">{title}</h2>
      </header>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <article
            key={task._id}
            className={`cursor-pointer p-4 border-[${border_color}] flex flex-col gap-4 bg-[#ffffff] hover:bg-[#f9f9f9] duration-200 rounded-md`}
          >
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>

            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <SelectPriority task={task} />
                {showTableModals.taskID === task._id && (
                  <UpdatePriority
                    task={task._id}
                    showModal={showTableModals.priorityModal}
                  />
                )}
              </div>

              <div className="relative">
                <SelectStatus task={task} />
                {showTableModals.taskID === task._id && (
                  <UpdateStatus
                    task={task._id}
                    showModal={showTableModals.statusModal}
                  />
                )}
              </div>
            </div>
            <h3 className="text-sm font-medium">
              {new Date(task.expires).toLocaleDateString()}
            </h3>
          </article>
        ))}
    </section>
  );

  return (
    <>
      <header className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Organizar proyecto FlowUp</h2>
        <hr className="text-[#f0f0f0] border" />
      </header>
      <div>
        <HeaderActions />

        <div className="flex  2xl:gap-24 xl:gap-4 gap-6 2xl:px-8 px-4 2xl:justify-center bg-white py-6">
          {renderKanbanColumn(
            "open",
            "#d6ebff",
            "#2084ff",
            `${t("kanban.toDoTitle")}`
          )}
          {renderKanbanColumn(
            "in progress",
            "#fff7c6",
            "#f7d93b",
            `${t("kanban.inProgressTitle")}`
          )}
          {renderKanbanColumn(
            "closed",
            "#def7eb",
            "#f25b5b",
            `${t("kanban.ClosedTitle")}`
          )}
        </div>
      </div>
    </>
  );
}

export default Kanban;
