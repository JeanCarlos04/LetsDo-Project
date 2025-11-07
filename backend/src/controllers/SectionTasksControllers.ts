import SectionTasksSchema from "../models/SectionTasksSchema.ts";
import UserSchema from "../models/UserSchema.ts";

export const createSection = async (req, res) => {
  const { title } = req.body;
  const { userId } = req.params;

  const foundedUser = await UserSchema.findById(userId);

  if (!foundedUser)
    return res.status(404).json({ message: "User not founded" });

  const createSection = await SectionTasksSchema.create({
    title: title,
    user: userId,
  });

  if (!createSection)
    return res.status(400).json({ message: "Something went wrong" });

  foundedUser?.task_sections.push(createSection._id);
  foundedUser.save();

  return res.json(createSection);
};

export const getSections = async (req, res) => {
  const { userId } = req.params;

  const foundedSection = await UserSchema.findById(userId).populate(
    "task_sections"
  );

  res.json(foundedSection?.task_sections);
};
