import { FaListCheck } from "react-icons/fa6";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
import useContextHook from "../hooks/useContextHook";
import { useTranslation } from "react-i18next";
import SectionList from "../components/SectionList";

function Home() {
  const { showModal, getTaskId } = useContextHook();
  const { t } = useTranslation();

  return (
    <main className="pl-(--aside-width) flex max-w-screen h-screen">
      <div className="flex w-full h-screen flex-col gap-8">
        <Header
          headerLocation="home"
          title={t("header.myTasksTitle")}
          TitleIcon={FaListCheck}
        />
        <main className="2xl:px-12 xl:px-6 p-6 flex flex-col gap-10">
          <SectionList />
        </main>
      </div>

      {showModal.mode === "create" && <CreateTask modalLocation="home" />}
      {showModal.mode === "update" && (
        <CreateTask taskIdToUpdate={getTaskId!} isUpdating={true} />
      )}
    </main>
  );
}

export default Home;
