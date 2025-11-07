import type { Notification } from "./NotificationType";

export type UserType = {
  _id: string;
  user: string;
  user_alias: string;
  email: string;
  password: string;
  createdAt: Date;
  avatar_url: string;
  notifications: Notification[];
};
