import UserSchema from "../models/UserSchema.ts";
import NotificationSchema from "../models/NotificationSchema.ts";

export const createNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    const createNotification = await NotificationSchema.create({
      title: title,
      description: description,
      toUser: userId,
    });

    const foundedUser = await UserSchema.findById(userId);

    if (!foundedUser)
      return res.status(404).json({ message: "User not founded" });

    foundedUser?.notifications.push(createNotification._id);
    foundedUser?.save();

    res.json({ message: "Notification created" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const foundedNoti = await NotificationSchema.findByIdAndDelete(
      notificationId
    );

    if (!foundedNoti)
      return res.status(404).json({ message: "Notification not founded" });

    const foundedUser = await UserSchema.findById(foundedNoti.toUser);

    if (!foundedUser)
      return res.status(404).json({ message: "Notification not founded" });

    foundedUser.notifications = foundedUser?.notifications.filter(
      (noti) => noti._id.toString() !== notificationId
    );
    foundedUser?.save();

    res.json({
      message: "Notification elimintated: " + foundedNoti.description,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateNotification = async (req, res) => {
  const { notificationId } = req.params;

  const foundedNoti = await NotificationSchema.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true }
  );

  foundedNoti?.save();
};

export const getNotification = async (req, res) => {
  const { userId } = req.params;

  const foundedUser = await UserSchema.findById(userId).populate({
    path: "notifications",
    populate: { path: "toUser", select: "user user_alias avatar_url" },
  });

  res.json(foundedUser?.notifications);
};
