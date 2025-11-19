import { FaBatteryHalf, FaRegFlag } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useTranslation } from "react-i18next";

function FilterTask() {
  const { setFilter, filter, showTableModals } = useContextHook();
  const { t } = useTranslation();

  return (
    <>
      {showTableModals.headerFilterModal && (
        <article className="flex absolute gap-8 p-6 bg-white rounded-lg z-300">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium flex items-center gap-3">
              {t("tableHeaderActions.filterButtonModal.priority")}{" "}
              <FaBatteryHalf />
            </h2>
            <div className="flex items-center gap-2">
              <input
                checked={filter.low}
                onChange={() => setFilter({ ...filter, low: !filter.low })}
                type="checkbox"
                className="appearance-none checked:bg-green-400 checked:size-4 rounded-[5px] border-2 border-gray-500 size-4"
              />
              <p className="font-medium text-nowrap">Low</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                onChange={() =>
                  setFilter({ ...filter, medium: !filter.medium })
                }
                checked={filter.medium}
                type="checkbox"
                className="appearance-none checked:bg-green-400 checked:size-4 rounded-[5px] border-2 border-gray-500 size-4"
              />
              <p className="font-medium text-nowrap">Medium</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={() => setFilter({ ...filter, high: !filter.high })}
                checked={filter.high}
                type="checkbox"
                className="appearance-none checked:bg-green-400 checked:size-4 rounded-[5px] border-2 border-gray-500 size-4"
              />
              <p className="font-medium text-nowrap">High</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium checked:bg-green-400 checked:border-white flex items-center gap-3">
              {t("tableHeaderActions.filterButtonModal.status")} <FaRegFlag />
            </h2>
            <div className="flex items-center gap-2">
              <input
                onChange={() => setFilter({ ...filter, open: !filter.open })}
                checked={filter.open}
                type="checkbox"
                className="appearance-none checked:bg-green-400 checked:size-4 rounded-[5px] border-2 border-gray-500 size-4"
              />
              <p className="font-medium text-nowrap">Open</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={() =>
                  setFilter({ ...filter, InProgress: !filter.InProgress })
                }
                checked={filter.InProgress}
                type="checkbox"
                className="appearance-none checked:bg-green-400 checked:size-4 rounded-[5px] border-2 border-gray-500 size-4"
              />
              <p className="font-medium text-nowrap">In progress</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={() =>
                  setFilter({ ...filter, closed: !filter.closed })
                }
                checked={filter.closed}
                type="checkbox"
                className="appearance-none checked:bg-green-400 checked:size-4 rounded-[5px] border-2 border-gray-500 size-4"
              />
              <p className="font-medium text-nowrap">Closed</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default FilterTask;
