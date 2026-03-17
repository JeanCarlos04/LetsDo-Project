import { useForm } from "react-hook-form";
import useContextHook from "../hooks/useContextHook";
import { useState } from "react";
import type { Priority, TasksType } from "../types/TasksType";
import { useTranslation } from "react-i18next";
import {
  FaPenToSquare,
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaRegFlag,
  FaClipboardList,
} from "react-icons/fa6";

type CreateTaskProps = {
  isUpdating?: boolean;
  taskIdToUpdate?: TasksType["_id"];
  modalLocation?: "home" | "section";
};

type FormType = {
  title: string;
  description: string;
  expires: Date;
};

function CreateTask({
  isUpdating,
  taskIdToUpdate,
  modalLocation,
}: CreateTaskProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const [priority, setPriority] = useState<Priority>("low");
  const {
    setShowModal,
    showModal,
    addTask,
    updateTask,
    currentSection,
    handleCreateSections,
  } = useContextHook();
  const { t } = useTranslation();

  const onSubmit = async (data: FormType) => {
    const { title, description, expires } = data;
    const sendUpdates = { title, description, priority, expires };

    if (modalLocation === "section") {
      if (isUpdating === true && taskIdToUpdate) {
        updateTask(taskIdToUpdate, sendUpdates);
      } else if (currentSection) {
        addTask(sendUpdates, currentSection);
      }
    } else {
      handleCreateSections(title, description);
    }
  };

  return (
    <>
      {showModal.show && (
        <div
          onClick={() => setShowModal({ ...showModal, show: !showModal.show })}
          className="w-screen z-999 h-screen fixed backdrop-brightness-75"
        >
          <article
            onClick={(e) => e.stopPropagation()}
            className={`${
              showModal ? "showCreateModal" : "hideCreateModal"
            } bg-white border border-gray-200 md:w-[400px] rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow flex flex-col gap-4 p-4`}
          >
            <h2 className="flex items-center gap-2 justify-center font-semibold text-xl">
              {isUpdating === true
                ? t("createTaskModal.TitleUpdate")
                : `${t("createTaskModal.title")}`}{" "}
              {isUpdating === true ? (
                <FaPenToSquare className="text-2xl text-[#355fcb]" />
              ) : (
                <FaClipboardList className="text-2xl text-[#355fcb]" />
              )}
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <h3 className="font-medium">
                {isUpdating === true
                  ? "Edit Title"
                  : `${t("createTaskModal.addTitle")}`}
              </h3>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must have minimum 3 characters",
                  },
                })}
                className="placeholder:font-semibold pl-3 h-10 border rounded-md border-gray-300 focus:border-2 focus:border-[#366cb3] outline-none"
                placeholder={t("createTaskModal.titleInpuPlaceholder")}
              />
              <span className="text-red-500">{errors.title?.message}</span>
              <h3 className="font-medium">
                {isUpdating === true
                  ? "Edit Description "
                  : `${t("createTaskModal.addDescription")}`}
              </h3>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 3,
                    message: "Description must have minimum 3 characters",
                  },
                })}
                className="placeholder:font-semibold p-2 border h-16 rounded-md border-gray-300 focus:border-2 focus:border-[#366cb3] outline-none"
                placeholder={t("createTaskModal.descriptionInpuPlaceholder")}
              />
              <span className="text-red-500">
                {errors.description?.message}
              </span>
              {modalLocation === "home" ? null : (
                <>
                  {" "}
                  <h3 className="font-medium flex items-center gap-2">
                    {t("createTaskModal.selectPriority")} <FaRegFlag />
                  </h3>
                  <div className="flex gap-6 justify-center">
                    {" "}
                    <button
                      type="button"
                      onClick={() => setPriority("low")}
                      value={"low"}
                      className={`${
                        priority === "low" ? "bg-[#0080006c]" : ""
                      } cursor-pointer flex items-center gap-2 text-center font-semibold px-3 py-1 rounded-lg border border-gray-300 duration-200`}
                    >
                      Low <FaBatteryQuarter />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority("medium")}
                      value={"medium"}
                      className={`${
                        priority === "medium" ? "bg-[#ff9d00b5]" : ""
                      } cursor-pointer  text-center flex items-center gap-2 font-semibold px-3 py-1 rounded-lg border border-gray-300 duration-200`}
                    >
                      Medium <FaBatteryHalf />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority("high")}
                      value={"high"}
                      className={`${
                        priority === "high" ? "bg-[#ff000072]" : ""
                      } cursor-pointer  text-center flex items-center gap-2 font-semibold px-3 py-1 rounded-lg border border-gray-300 duration-200`}
                    >
                      High <FaBatteryFull />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium">Expires in:</h3>
                    <input
                      {...register("expires")}
                      type="date"
                      className="outline-none shadow border border-gray-200 p-1 rounded-md"
                    />
                  </div>
                </>
              )}

              <button className="mt-6 whitespace-nowrap rounded bg-[#2764ba] text-white font-semibold py-1.5 px-3 cursor-pointer  hover:bg-[#3576d0] duration-100">
                {isUpdating === true
                  ? t("createTaskModal.buttonEdit")
                  : t("createTaskModal.createButton")}
              </button>
            </form>
          </article>
        </div>
      )}
    </>
  );
}

export default CreateTask;
