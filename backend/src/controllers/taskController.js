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
    const { status, search } = req.query;
    const query = { userId: req.user._id }; // only current user's tasks

    // If specific status is selected (not "All")
    if (status && status.trim() !== "") {
      query.status = status.trim();
    }

    // If search term is entered
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      // Title OR tag must match — combined inside AND with status
      query.$or = [
        { title: { $regex: regex } },
        { tags: { $elemMatch: { $regex: regex, $options: "i" } } },
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
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


