import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    read: { type: Boolean, default: false },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "task" },
  },
  { timestamps: true }
);

export default mongoose.model("notification", notificationSchema);
