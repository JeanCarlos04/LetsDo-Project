import { FaRegEye, FaRegEyeSlash, FaXmark } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useState, useEffect, useRef } from "react";
import type { Notification } from "../types/NotificationType";
import { FaBellSlash } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function Notifications() {
  const { myProfile, showTableModals, refreshUI } = useContextHook();
  const [toggleClass, setToggleClass] = useState("removeModal");
  const firstRender = useRef(true);
  const { t } = useTranslation();

  const handleMarkRead = async (notificationId: Notification["_id"]) => {
    const res = await fetch(
      `http://localhost:3000/updateNotification/${notificationId}`,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    );

    refreshUI();
    await res.json();
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (showTableModals.notificationModal) {
      setToggleClass("showNotiModal");
    } else if (
      showTableModals.notificationModal === false &&
      toggleClass === "showNotiModal"
    ) {
      setToggleClass("hideNotiModal");

      const timerRemove = setTimeout(() => {
        setToggleClass("removeModal");
      }, 500);

      return () => clearTimeout(timerRemove);
    }
  }, [showTableModals.notificationModal]);

  const handleDeleteNotifications = async (notiId: Notification["_id"]) => {
    try {
      const res = await fetch(
        `http://localhost:3000/deleteNotification/${notiId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );
      await res.json();
      refreshUI();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`${toggleClass} relative top-0 right-0 z-400`}>
        <section className="h-[340px] w-[340px] overflow-y-auto rounded-lg shadow-md absolute top-0 right-0 gap-2 bg-white flex flex-col self-start">
          <header className="py-2 pt-3 px-4 flex items-center justify-between">
            <h1 className="font-semibold text-lg">
              {t("notificationModal.title")}
            </h1>
            <button className="font-medium text-gray-500">
              {t("notificationModal.markAllAsRead")}
            </button>
          </header>
          <div className="flex flex-col h-full">
            {myProfile?.notifications && myProfile.notifications.length > 0 ? (
              <>
                {" "}
                {myProfile?.notifications.map((noti) => {
                  return (
                    <article
                      className={`${
                        noti.read === true
                          ? "backdrop-brightness-90 hover:bg-gray-300"
                          : ""
                      } hover:bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-4`}
                      key={noti._id}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <img
                            className="size-[45px] rounded-full"
                            src={myProfile.avatar_url}
                          />
                          <h2 className="font-semibold text-gray-600">
                            @{myProfile.user}
                          </h2>
                        </div>
                        <div className="flex  flex-col">
                          <h2 className="font-semibold text-[16px]">
                            {noti.title}
                          </h2>
                          <p className="font-medium text-gray-500">
                            {noti.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center gap-6">
                        <button onClick={() => handleMarkRead(noti._id)}>
                          {noti.read ? (
                            <FaRegEye className="text-lg text-gray-600" />
                          ) : (
                            <FaRegEyeSlash className="text-lg text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteNotifications(noti._id)}
                        >
                          <FaXmark className="text-lg text-gray-600" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2 h-full">
                <FaBellSlash className="size-20 text-gray-400" />
                <p className="font-medium text-gray-600">
                  {t("notificationModal.nullNotification")}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Notifications;
