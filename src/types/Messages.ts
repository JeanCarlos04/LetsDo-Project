import type { ChatType } from "./ChatType";
import type { UserType } from "./UsersType";

export type MessagesType = {
  _id: string;
  user: UserType["_id"];
  text: string;
  chat: ChatType;
};
