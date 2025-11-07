import { FaTableList, FaTableColumns } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useTranslation } from "react-i18next";

function SelectViewMode() {
  const { showTableModals, setViewMode, setShowTableModals } = useContextHook();
  const { t } = useTranslation();

  return (
    <>
      {showTableModals.headerActionsModal && (
        <article className="absolute w-full bg-white border-1 border-gray-100 shadow flex flex-col rounded-md">
          <button
            onClick={() => {
              setViewMode("table");
              setShowTableModals({
                ...showTableModals,
                headerActionsModal: false,
              });
            }}
            className="py-2 hover:bg-gray-100 duration-200 font-medium flex gap-2 items-center justify-center"
          >
            {t("tableHeaderActions.viewButtonModal.tableView")}{" "}
            <FaTableList className="text-gray-500" />
          </button>
          <button
            onClick={() => {
              setViewMode("kanban");
              setShowTableModals({
                ...showTableModals,
                headerActionsModal: false,
              });
            }}
            className="py-2 hover:bg-gray-100 duration-200 font-medium flex gap-2 items-center justify-center"
          >
            Kanban <FaTableColumns className="text-gray-500" />
          </button>
        </article>
      )}
    </>
  );
}

export default SelectViewMode;
