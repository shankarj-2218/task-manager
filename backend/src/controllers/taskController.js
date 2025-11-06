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

    // Always filter by logged-in user
    const filter = { userId: req.user._id };

    // Add status condition
    if (status && status.trim() !== "") {
      filter.status = status.trim();
    }

    // Add search condition for title or tags
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: { $regex: regex } },
        { tags: { $elemMatch: { $regex: regex, $options: "i" } } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    if (!tasks.length) {
      return res.status(200).json({ message: "No matching tasks found", tasks: [] });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
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


