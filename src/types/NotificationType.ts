import type { UserType } from "./UsersType";
import type { TasksType } from "./TasksType";

export type Notification = {
  _id: string;
  title: string;
  description: string;
  toUser: UserType;
  read: boolean;
  task: TasksType["_id"];
  createdAt: Date;
};
