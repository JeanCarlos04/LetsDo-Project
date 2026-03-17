import Aside from "../components/Aside";
import { FaListCheck } from "react-icons/fa6";
import Header from "../components/Header";
import Table from "../components/Table";
import CreateTask from "../components/CreateTask";
import useContextHook from "../hooks/useContextHook";
import Kanban from "../components/Kanban";
import ToastModal from "../components/ToastModal";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SectionTasks() {
  const {
    showModal,
    getTaskId,
    viewMode,
    setCurrentSection,
    setSectionTasks,
    sectionTasks,
  } = useContextHook();

  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    setCurrentSection(id);
    fetch(`http://localhost:3000/getTaskSection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSectionTasks(data);
      });
  }, [id]);

  return (
    <>
      <div className="flex max-w-screen h-screen">
        <Aside />
        <div className="flex w-full flex-col gap-8">
          <Header
            headerLocation="section"
            title={t("header.myTasksTitle")}
            TitleIcon={FaListCheck}
          />
          <main className="2xl:px-12 xl:px-6 p-6 flex flex-col gap-10">
            {sectionTasks && (
              <>
                {viewMode === "table" ? (
                  <Table sectionData={sectionTasks!} />
                ) : (
                  <Kanban sectionData={sectionTasks!} />
                )}
              </>
            )}
          </main>
        </div>

        {showModal.mode === "create" && <CreateTask modalLocation="section" />}
        {showModal.mode === "update" && (
          <CreateTask
            taskIdToUpdate={getTaskId!}
            isUpdating={true}
            modalLocation="section"
          />
        )}
      </div>
      <ToastModal />
    </>
  );
}

export default SectionTasks;
