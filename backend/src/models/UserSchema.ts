import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, trim: true, unique: true },
    user_alias: { type: String, required: true, trim: true },
    avatar_url: {
      type: String,
      default: "http://localhost:3000/uploads/UsuarioNulo.webp",
    },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    task_sections: [
      { type: mongoose.Schema.Types.ObjectId, ref: "task_section" },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notification",
        default: [],
      },
    ],
    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
