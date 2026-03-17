import {
  FaRegCommentDots,
  FaRegPaperPlane,
  FaRocketchat,
} from "react-icons/fa6";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
import useContextHook from "../hooks/useContextHook";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import type { UserType } from "../types/UsersType";
import socket from "../config/socket.io";
import { useForm } from "react-hook-form";
import type { ChatType } from "../types/ChatType";
import type { MessagesType } from "../types/Messages";

type FormType = {
  text: string;
};

function Connections() {
  const { showModal, getTaskId, myProfile } = useContextHook();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [getChatData, setGetChatData] = useState<ChatType>();
  const [friends, setFriends] = useState<UserType[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<UserType>();
  const [filterFriend, setFilterFriend] = useState<UserType[]>([]);
  const timerRef = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  // CARGAR AMIGOS

  useEffect(() => {
    socket.auth = {
      token: localStorage.getItem("token"),
    };
    socket.connect();
    fetch("http://localhost:3000/getAllFriends", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setFriends(data.friends));
  }, []);

  // CONSEGUIR DATOS DE LOS CHATS

  const getDataChat = async (selectedFriend: UserType) => {
    const res = await fetch(
      `http://localhost:3000/getChat/${selectedFriend._id}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ myId: myProfile?._id }),
        credentials: "include",
      },
    );

    const data = await res.json();
    if (!data) return;
    setGetChatData(data);
    getMessages(data);
  };

  const getMessages = (chatData: ChatType) => {
    socket.emit("getAllMessages", chatData);
    socket.on("recieve message", (allMessages) => {
      setMessages(allMessages);
    });
  };

  const handleOnSubmit = (data: FormType) => {
    const values = {
      text: data.text,
      chat: getChatData?._id,
    };
    socket.emit("send message", values);
    socket.on("individual message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
  };

  const filter = friends.filter((friend) =>
    filterFriend.some((f) => friend._id === f._id),
  );

  const handleSearchFriend = (searchFriend: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetch(`http://localhost:3000/searchFriend/?friendName=${searchFriend}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setFilterFriend(data));
    }, 300);
  };

  return (
    <main className="pl-(--aside-width) flex max-w-screen h-screen">
      <div className="flex w-full flex-col ">
        <Header
          headerLocation="home"
          title={t("header.connectionsTitle")}
          TitleIcon={FaRegCommentDots}
        />
        <main className="flex">
          <section className="h-[calc(100vh-90px)] flex flex-col  overflow-y-auto w-[400px] bg-white shadow border-r border-gray-200 p-4">
            <header className="pb-4 flex flex-col gap-3">
              <h2 className="text-xl font-semibold rounded-md">Contacts</h2>
              <input
                onChange={(e) => handleSearchFriend(e.target.value)}
                placeholder="Search your contacts"
                className="w-full pl-3 outline-none py-1 border border-gray-200 shadow rounded-md"
              />
            </header>
            {(filter.length >= 1 ? filter : friends).map((friend) => {
              return (
                <article
                  onClick={() => {
                    getDataChat(friend);
                    setSelectedFriend(friend);
                  }}
                  key={friend._id}
                  className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
                >
                  <img
                    className="size-[50px] rounded-full"
                    src={friend.avatar_url}
                  />
                  <h2 className="font-medium">{friend.user_alias}</h2>
                </article>
              );
            })}
          </section>
          <section className="relative h-[calc(100vh-90px)] w-full flex flex-col bg-gray-50 ">
            {selectedFriend && (
              <header className="px-6 gap-3 w-full h-24 border-b border-gray-200 flex items-center">
                <img
                  className="size-11 rounded-full"
                  src={selectedFriend?.avatar_url}
                />
                <div className="flex flex-col">
                  <h2 className="font-medium text-2xl">
                    {selectedFriend?.user_alias}
                  </h2>
                  <h3 className="text-gray-500 font-medium">
                    @{selectedFriend?.user}
                  </h3>
                </div>
              </header>
            )}

            <div className="w-full h-full bg-gray-100 p-6 flex flex-col gap-3 px-[100px] overflow-y-auto">
              {selectedFriend ? (
                <>
                  {messages.map((msg) => {
                    return (
                      <h2
                        className={`${
                          myProfile?._id === msg.user
                            ? "self-end bg-blue-400 text-white"
                            : "text-black bg-white self-start "
                        } p-2 px-3 font-medium text-lg rounded-md w-auto inline-block`}
                        key={msg._id}
                      >
                        {msg.text}
                      </h2>
                    );
                  })}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                  {" "}
                  <FaRocketchat className="rotate-[-15deg] text-[100px] text-gray-400" />
                  <div className="flex flex-col items-center">
                    <h2 className="font-semibold text-lg text-gray-500">
                      Your chat box
                    </h2>
                    <h3 className="text-xl text-gray-500">
                      Here is where you can see your chats
                    </h3>
                  </div>
                </div>
              )}
            </div>
            {selectedFriend && (
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="flex gap-2 items-center p-8 py-6 border-t border-gray-200"
              >
                <input
                  {...register("text", { required: "Message is requiered" })}
                  className="pl-6 h-9 border border-gray-300 shadow rounded-full w-full outline-blue-400"
                  placeholder="Escribe un mensaje"
                />
                <span className="text-red-400">{errors.text?.message}</span>
                <button className=" hover:bg-gray-200 duration-150 cursor-pointer font-medium text-white p-2 px-3 rounded-md text-2xl">
                  <FaRegPaperPlane className="text-gray-700" />
                </button>
              </form>
            )}
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

export default Connections;
