import mongoose from "mongoose";

const SectionTaskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  completed: { type: Boolean, default: false },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export default mongoose.model("task_section", SectionTaskSchema);
