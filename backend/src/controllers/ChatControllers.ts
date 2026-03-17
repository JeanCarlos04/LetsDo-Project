import type { Request } from "express";
import type { Response } from "express";
import ChatSchema from "../models/ChatSchema.ts";

export const getChat = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { myId } = req.body;

  const chat = await ChatSchema.findOne({
    participants: { $all: [myId, user_id] },
  });

  if (!chat) {
    const chat = await ChatSchema.create({
      participants: [myId, user_id],
    });

    return res.json(chat);
  }

  return res.json(chat);
};
