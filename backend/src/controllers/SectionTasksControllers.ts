import { populate } from "dotenv";
import SectionTasksSchema from "../models/SectionTasksSchema.ts";
import UserSchema from "../models/UserSchema.ts";
import express from "express";

type Request = express.Request;
type Response = express.Response;

export const createSection = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { userId } = req.params;

  const foundedUser = await UserSchema.findById(userId);

  if (!foundedUser)
    return res.status(404).json({ message: "User not founded" });

  const createSection = await SectionTasksSchema.create({
    title: title,
    description: description,
    user: userId,
  });

  if (!createSection)
    return res.status(400).json({ message: "Something went wrong" });

  foundedUser?.task_sections.push(createSection._id);
  foundedUser.save();

  return res.json(createSection);
};

export const getSections = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const foundedSection = await UserSchema.findById(userId).populate([
      { path: "task_sections", populate: { path: "tasks" } },
    ]);

    if (!foundedSection)
      return res.status(404).json({ message: "Sections not founded" });

    res.json(foundedSection?.task_sections);
  } catch (err) {
    console.error(err);
  }
};

export const getTaskSection = async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  try {
    const foundedSection = await SectionTasksSchema.findById(
      sectionId
    ).populate("tasks");

    if (!foundedSection)
      return res.status(404).json({ message: "Sections not founded" });

    res.json(foundedSection);
  } catch (err) {
    console.error(err);
  }
};
