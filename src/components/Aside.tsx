import { Link } from "react-router-dom";
import { LanguagesModal } from "./LanguagesModal";
import useContextHook from "../hooks/useContextHook";
import useWidtHook from "../hooks/useWidthHook";
import { useTranslation } from "react-i18next";
import {
  FaImage,
  FaBars,
  FaRegUser,
  FaListCheck,
  FaSquareCheck,
  FaAngleRight,
  FaMagnifyingGlass,
  FaChartColumn,
  FaLanguage,
  FaAngleDown,
} from "react-icons/fa6";

function Aside() {
  const {
    myProfile,
    showAside,
    setShowAside,
    setShowTableModals,
    showTableModals,
  } = useContextHook();
  const { t } = useTranslation();

  const sendProfileImg = async (file: File) => {
    const formData = new FormData();
    if (file) formData.append("avatar_url", file);

    fetch(`http://localhost:3000/uploadImg/${myProfile?._id}`, {
      method: "PATCH",
      body: formData,
    });
  };

  const width = useWidtHook();

  return (
    <>
      <div
        className={`${width < 1279 ? "fixed" : "static"} ${
          showAside ? "showAside" : "hideAside"
        } h-full w-[240px] min-w-[240px] max-w-[240px] z-[999]`}
      >
        <aside
          className={` min-w-[240px]  w-[240px] fixed h-screen bg-white shadow-xl border-r-1 border-gray-100 flex flex-col justify-between top-0`}
        >
          {width < 1279 && (
            <button
              className="absolute p-4"
              onClick={() => setShowAside(!showAside)}
            >
              <FaBars className="size-[18px]" />
            </button>
          )}
          <div className="flex flex-col items-center gap-12 w-full">
            <header className="pt-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                Let's Do <FaSquareCheck className="text-blue-600" />
              </h2>
            </header>
            <div className="w-full flex flex-col gap-4 relative">
              <input
                placeholder={t("inputPlaceholder")}
                className="focus:border-blue-400 focus:border-2 border-1 shadow-sm border-gray-300 mx-4 rounded-md focus:outline-none pl-2 h-[30px] placeholder:text-[14px] placeholder:font-medium text-[14px]"
              />
              <FaMagnifyingGlass className="absolute right-6 top-[7px] text-[14px]" />
              <h2 className="pl-6 font-[400] text-[#808080]">Menu</h2>
              <ul className="flex flex-col gap-5 text-[17px]">
                <li className="group font-[500] mx-4 rounded-md py-[6px] hover:bg-[#3d7dde3a] duration-200 cursor-pointer">
                  <Link
                    to="/"
                    className="flex gap-3 items-center pl-4 group-hover:translate-x-4 duration-200"
                  >
                    <FaListCheck className="text-[18px]" /> {t("aside.myTasks")}
                  </Link>
                </li>
                <li className="group font-[500] mx-4 rounded-md py-[6px] hover:bg-[#3d7dde3a] duration-200 cursor-pointer">
                  <Link
                    to="/a"
                    className="flex gap-3 items-center pl-4 group-hover:translate-x-4 duration-200"
                  >
                    <FaChartColumn className="text-[18px]" />{" "}
                    {t("aside.estadistics")}
                  </Link>
                </li>
                {/* <li className="group font-[500] mx-4 rounded-md py-[6px] hover:bg-[#3d7dde3a] duration-200 cursor-pointer">
                  <Link
                    to="/notifications"
                    className="flex gap-3 items-center pl-4 group-hover:translate-x-4 duration-200"
                  >
                    <FaBell className="text-[18px]" />{" "}
                    {t("aside.notifications")}
                  </Link>
                </li> */}
                <li className="group font-[500] mx-4 rounded-md py-[6px] hover:bg-[#3d7dde3a] duration-200 cursor-pointer">
                  <Link
                    to="/e"
                    className="flex gap-3 items-center pl-4 group-hover:translate-x-4 duration-200"
                  >
                    {" "}
                    <FaRegUser className="text-[18px]" /> {t("aside.profile")}
                  </Link>
                </li>
                <li
                  onClick={() =>
                    setShowTableModals({
                      ...showTableModals,
                      asideLanguageModal: !showTableModals.asideLanguageModal,
                    })
                  }
                  className="flex flex-col gap-6 group font-[500] mx-4 rounded-md py-[6px] hover:bg-[#3d7dde3a] duration-200 cursor-pointer"
                >
                  <div className="flex gap-3 items-center pl-4 group-hover:translate-x-4 duration-200">
                    {" "}
                    <FaLanguage className="text-[22px]" />{" "}
                    {t("aside.languages")}{" "}
                    <FaAngleDown
                      className={`text-[16px] ${
                        showTableModals.asideLanguageModal
                          ? "rotate-180"
                          : "rotate-0"
                      } duration-200`}
                    />
                  </div>
                </li>
              </ul>
              {showTableModals.asideLanguageModal && (
                <div
                  className={`${
                    showTableModals.asideLanguageModal
                      ? "showLanguageModal"
                      : "hideLanguageModal"
                  } w-full flex justify-center`}
                >
                  <LanguagesModal />
                </div>
              )}
            </div>
          </div>
          <div className="flex px-6  items-center justify-between py-4 hover:bg-gray-200 duration-300 cursor-pointer">
            <div className="flex gap-2">
              <input
                onChange={(e) => {
                  const file = e.target.files![0];
                  if (file) sendProfileImg(file);
                }}
                id="inputImg"
                type="file"
                className="hidden"
              />
              <label htmlFor="inputImg" className="group relative">
                <img
                  className="size-[50px] rounded-full group-hover:brightness-75 duration-200 cursor-pointer"
                  src={myProfile!.avatar_url}
                />
                <FaImage className="cursor-pointer text-white absolute hidden duration-200 group-hover:block top-[20px] left-[15px]" />
              </label>
              <div className="flex flex-col justify-center">
                <h2 className="text-[16px] font-medium">
                  {myProfile!.user_alias}
                </h2>
                <h3 className="text-[14px] text-gray-500">
                  @{myProfile!.user}
                </h3>
              </div>
            </div>
            <FaAngleRight className="text-gray-400 text-sm" />
          </div>
        </aside>
      </div>
    </>
  );
}

export default Aside;
