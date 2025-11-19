import type { IconType } from "react-icons";
import useContextHook from "../hooks/useContextHook";
import useWidtHook from "../hooks/useWidthHook";
import Notifications from "../components/Notifications";
import { useTranslation } from "react-i18next";
import {
  FaMagnifyingGlass,
  FaBars,
  FaCirclePlus,
  FaRegBell,
} from "react-icons/fa6";

type HeaderProps = {
  TitleIcon: IconType;
  title: string;
  headerLocation: "home" | "section";
};

const Header = ({ title, TitleIcon, headerLocation }: HeaderProps) => {
  const {
    setShowModal,
    handleFilterTasks,
    showModal,
    setShowAside,
    showAside,
    myProfile,
    setShowTableModals,
    showTableModals,
  } = useContextHook();
  const width = useWidtHook();
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="min-h-[90px]">
          <header
            className={`bg-white border-b xl:w-[calc(100vw-240px)] border-[#e8e8e8] p-4 xl:p-6 flex items-center w-full justify-between  gap-4 xl:gap-6 fixed top-0 z-500`}
          >
            {width < 1279 && (
              <button onClick={() => setShowAside(!showAside)}>
                <FaBars className="size-[18px] z-100 cursor-pointer" />
              </button>
            )}

            <h1 className="flex items-center gap-3 xl:gap-4 whitespace-nowrap text-lg xl:text-2xl font-semibold">
              {title} <TitleIcon className="xl:text-[22px] text-lg" />
            </h1>
            {width > 767 && (
              <div className="relative w-full">
                <input
                  onChange={(e) => handleFilterTasks(e.target.value)}
                  placeholder={t("inputPlaceholder")}
                  className="focus:border-blue-400 focus:border-2 w-full h-9 border shadow-sm border-gray-300 rounded-lg focus:outline-none pl-4 py-[3px] placeholder:text-[14px] text-[14px] placeholder:font-medium"
                />
                <FaMagnifyingGlass className="absolute right-[15px] top-2.5" />
              </div>
            )}

            <div
              onClick={() =>
                setShowTableModals({
                  ...showTableModals,
                  notificationModal: !showTableModals.notificationModal,
                })
              }
              className="relative p-2 hover:translate-y-[-5px] duration-200 cursor-pointer"
            >
              <button className="cursor-pointer">
                {myProfile!.notifications.length > 0 && (
                  <h2 className="absolute top-0 right-0 bg-red-500 rounded-full text-white font-medium text-[12px] size-[18px]">
                    {" "}
                    {myProfile?.notifications.length}
                  </h2>
                )}
                <FaRegBell className="text-xl" />{" "}
              </button>
            </div>
            <button
              onClick={() =>
                setShowModal({ ...showModal, mode: "create", show: true })
              }
              className="whitespace-nowrap flex items-center gap-2 rounded-lg bg-[#2764ba] text-white font-semibold py-1.5 px-3 cursor-pointer  hover:bg-[#3576d0] duration-100"
            >
              <FaCirclePlus />{" "}
              {headerLocation === "section"
                ? t("header.createTaskButton")
                : t("header.createSection")}{" "}
            </button>
          </header>
        </div>
        <Notifications />
      </div>
    </>
  );
};

export default Header;
