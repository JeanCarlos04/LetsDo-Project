export type Priority = "low" | "medium" | "high";
export type Status = "open" | "in progress" | "closed";

export type TasksType = {
  _id: string;
  title: string;
  description: string;
  tags?: string[];
  priority: Priority;
  status?: Status;
  completed?: boolean;
};
