import TasksSchema from "../models/TasksSchema.ts";
import UserSchema from "../models/UserSchema.ts";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, priority } = req.body;

    if (title.length < 3 || description.length < 3)
      return res.status(400).json({
        message: "Title and description must have more than 3 characters",
      });

    const foundedUser = await UserSchema.findById(userId);
    if (!foundedUser)
      return res.status(404).json({ message: "User not found" });

    const createdTask = await TasksSchema.create({
      title: title,
      description: description,
      priority: priority,
    });

    foundedUser?.tasks.push(createdTask._id);
    foundedUser?.save();

    res.json({ message: "Task created succesfully" });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { updates } = req.body;

    const foundedTask = await TasksSchema.findByIdAndUpdate(
      taskId,
      { $set: updates },
      {
        new: true,
      }
    );

    if (!foundedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json({ foundedTask });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await TasksSchema.findByIdAndDelete(taskId);

    await UserSchema.updateOne({ tasks: taskId }, { $pull: { tasks: taskId } });

    res.json({ message: "Deleted Task succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar la tarea", error: err });
  }
};

export const filterTask = async (req, res) => {
  const { query } = req.query;

  const filteredTask = await TasksSchema.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  });

  res.json(filteredTask);
};
