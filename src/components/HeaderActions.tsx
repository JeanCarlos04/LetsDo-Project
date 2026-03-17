import { FaAngleDown, FaRegEye } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import SelectViewMode from "./SelectViewMode";
import useContextHook from "../hooks/useContextHook";
import FilterTask from "./FilterTask";
import { useTranslation } from "react-i18next";

function HeaderActions() {
  const { setShowTableModals, showTableModals, setFilterByDate } =
    useContextHook();
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full bg-white p-4 px-6 flex items-center gap-6 shadow-md border border-gray-100 rounded-t-2xl flex-wrap">
        <input
          onChange={(e) => setFilterByDate(new Date(e.target.value))}
          type="date"
          className="border border-gray-100 rounded-md px-2 py-1 shadow"
        />

        <div className="relative">
          {" "}
          <button
            onClick={() =>
              setShowTableModals({
                ...showTableModals,
                headerActionsModal: !showTableModals.headerActionsModal,
              })
            }
            className="bg-white px-2 py-1 rounded-md border border-gray-200 shadow flex items-center gap-2 cursor-pointer"
          >
            <FaRegEye className="text-gray-500 text-lg" />{" "}
            {t("tableHeaderActions.viewButton")}
            <FaAngleDown className="text-sm text-gray-400" />
          </button>{" "}
          <SelectViewMode />
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setShowTableModals({
                ...showTableModals,
                headerFilterModal: !showTableModals.headerFilterModal,
              })
            }
            className="bg-white px-2 py-1 rounded-md border border-gray-200 shadow flex items-center gap-2 cursor-pointer"
          >
            <FiFilter className=" text-gray-500" />
            {t("tableHeaderActions.filterButton")}{" "}
            <FaAngleDown className="text-sm text-gray-400" />
          </button>
          <FilterTask />
        </div>
      </div>
    </>
  );
}

export default HeaderActions;
