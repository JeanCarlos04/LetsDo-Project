import { Router } from "express";
import {
  Register,
  Login,
  getProfile,
  updateProfile,
  logout,
  addFriends,
  getFriends,
  searchFriendsChat,
} from "../controllers/UserControllers.ts";
import { authAcess } from "../middlewares/authAcess.ts";
import {
  createTask,
  updateTask,
  filterTask,
  deleteTask,
} from "../controllers/TaskControllers.ts";
import {
  createNotification,
  deleteNotification,
  updateNotification,
  getNotification,
} from "../controllers/NotificationControllers.ts";
import multerConfig from "../controllers/multerConfig.ts";
import UserSchema from "../models/UserSchema.ts";
import {
  createSection,
  getSections,
  getTaskSection,
} from "../controllers/SectionTasksControllers.ts";
import { getChat } from "../controllers/ChatControllers.ts";

const routes = Router();

// SECTIONS APIs

routes.post("/createSection/:userId", createSection);
routes.get("/getSections/:userId", getSections);
routes.get("/getTaskSection/:sectionId", getTaskSection);

// NOTIFICATIONS APIs

routes.post("/createNotification/:userId", createNotification);
routes.delete("/deleteNotification/:notificationId", deleteNotification);
routes.patch("/updateNotification/:notificationId", updateNotification);
routes.get("/getNotification/:userId", getNotification);

// USER APIs

routes.post("/register", Register);
routes.post("/login", Login);
routes.get("/getProfile", authAcess, getProfile);
routes.patch("/updateProfile/:userId", authAcess, updateProfile);
routes.post("/logout", authAcess, logout);
routes.post("/addFriends/:user_id", authAcess, addFriends);
routes.get("/getAllFriends", authAcess, getFriends);
routes.get("/searchFriend", authAcess, searchFriendsChat);

// CHAT APIs

routes.post("/getChat/:user_id", authAcess, getChat);

// TASKS APIs

routes.post("/createTask/:sectionId", createTask);
routes.patch("/updateTasks/:taskId", updateTask);
routes.get("/filteredTasks", filterTask);
routes.delete("/deteleTask/:taskId", deleteTask);

// MULTER

routes.patch(
  "/uploadImg/:userId",
  multerConfig.single("avatar_url"),
  async (req, res) => {
    const { userId } = req.params;
    const imgUrl = `http://localhost:3000/uploads/${req.file?.filename}`;

    const foundedUser = await UserSchema.findByIdAndUpdate(
      userId,
      {
        avatar_url: imgUrl,
      },
      { new: true }
    );

    res.json({ message: "user updated", foundedUser });
  }
);

export default routes;
