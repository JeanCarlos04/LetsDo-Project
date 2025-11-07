import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user_owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    priority: { type: String, required: true, trim: true },
    status: { type: String, default: "open", trim: true },
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("task", TaskSchema);
