import { FaGear } from "react-icons/fa6";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
import useContextHook from "../hooks/useContextHook";
import { useTranslation } from "react-i18next";

function Home() {
  const { showModal, getTaskId } = useContextHook();

  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <main className="flex max-w-screen h-screen">
      <div className="flex w-full flex-col gap-8">
        <Header headerLocation="home" title="Settings" TitleIcon={FaGear} />
        <main className="dark:bg-black 2xl:px-12 xl:px-6 p-6 flex flex-col gap-10">
          <section className="p-4 bg-white flex flex-col self-start rounded-md">
            <div>
              <p className="font-semibold">Light mode</p>
              <button></button>
            </div>
            <button
              onClick={() => {
                if (i18n.language === "en") {
                  handleChangeLanguage("es");
                } else {
                  handleChangeLanguage("en");
                }
              }}
              className="font-semibold"
            >
              Language
            </button>
          </section>
        </main>
      </div>
      {showModal.mode === "create" && <CreateTask />}
      {showModal.mode === "update" && (
        <CreateTask taskIdToUpdate={getTaskId!} isUpdating={true} />
      )}
    </main>
  );
}

export default Home;
