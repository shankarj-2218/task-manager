import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, tags } = req.body;
    const task = await Task.create({ userId: req.user._id, title, description, status, tags });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, tag, page = 1, limit = 20 } = req.query;

    const filter = { userId: req.user._id };
    if (status) filter.status = status;
    if (tag) filter.tags = { $in: [tag] };

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


