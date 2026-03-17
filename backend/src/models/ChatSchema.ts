import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    chatType: { type: String, default: "single" },
    last_message: { type: String, default: null },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
  },
  { timestamps: true }
);

export default mongoose.model("chat", chatSchema);
