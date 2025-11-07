import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import type { TasksType } from "../types/TasksType";
import { useTranslation } from "react-i18next";

type PaginationProps = {
  pages: number[];
  allTasks: TasksType[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
};

function Pagination({
  pages,
  setCurrentPage,
  currentPage,
  allTasks,
  setItemsPerPage,
  itemsPerPage,
}: PaginationProps) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="flex justify-between
       items-center flex-col gap-8"
      >
        <div className="flex items-center gap-4 w-full justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{t("pagination.showPerPage")}</p>
            <input
              placeholder={String(itemsPerPage)}
              min={1}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));

                const value = Number(e.target.value);
                if (!value || value <= 0) {
                  setItemsPerPage(1);
                } else {
                  setItemsPerPage(value);
                }
              }}
              type="number"
              className="w-16 rounded-[5px] placeholder:text-gray-700 text-[14px] h-7 text-center font-semibold outline-none border shadow border-[#e2e2e2] "
            />
          </div>
          <p className="font-semibold flex items-center gap-2">
            {t("pagination.totalTask")}:
            <span className="md:text-[16px] text-sm"> {allTasks.length}</span>
          </p>
        </div>
        <div
          className="flex gap-6 justify-between
       items-center"
        >
          <button
            onClick={() =>
              currentPage <= 1 ? null : setCurrentPage(currentPage - 1)
            }
            className="cursor-pointer p-2"
          >
            <FaAngleLeft className="text-lg" />
          </button>
          {pages.map((page) => {
            return (
              <button
                key={page}
                className={`${
                  currentPage === page
                    ? "bg-[#3576d0] border-white text-white"
                    : "bg-white"
                } size-[45px] border-2 border-[#e6e6e6] rounded-lg font-semibold cursor-pointer`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() =>
              currentPage >= 3 ? null : setCurrentPage(currentPage + 1)
            }
            className="cursor-pointer p-2"
          >
            <FaAngleRight className="text-lg" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Pagination;
