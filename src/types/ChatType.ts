import type { UserType } from "./UsersType";
import type { MessagesType } from "./Messages";

export type ChatType = {
  _id: string;
  participants: UserType;
  last_message: string;
  chatType: "singular" | "group";
  messages: MessagesType;
};
