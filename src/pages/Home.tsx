import Aside from "../components/Aside";
import { FaListCheck } from "react-icons/fa6";
import Header from "../components/Header";
import Table from "../components/Table";
import CreateTask from "../components/CreateTask";
import useContextHook from "../hooks/useContextHook";
import Kanban from "../components/Kanban";
import ToastModal from "../components/ToastModal";
import { useTranslation } from "react-i18next";

function Home() {
  const { showModal, getTaskId, viewMode } = useContextHook();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex max-w-screen h-screen">
        <Aside />
        <div className="flex w-full flex-col gap-8">
          <Header title={t("header.myTasksTitle")} TitleIcon={FaListCheck} />
          <main className="2xl:px-12 xl:px-6 p-6 flex flex-col gap-10">
            {viewMode === "table" ? <Table /> : <Kanban />}
          </main>
        </div>

        {showModal.mode === "create" && <CreateTask />}
        {showModal.mode === "update" && (
          <CreateTask taskIdToUpdate={getTaskId!} isUpdating={true} />
        )}
      </div>
      <ToastModal />
    </>
  );
}

export default Home;
