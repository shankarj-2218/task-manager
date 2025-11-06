import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editTask, clearEdit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    tags: "",
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        tags: editTask.tags.join(", "),
      });
    } else {
      setForm({ title: "", description: "", status: "pending", tags: "" });
    }
  }, [editTask]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()) };
    onSubmit(payload);
    setForm({ title: "", description: "", status: "pending", tags: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input name="title" placeholder="Title" onChange={handleChange} value={form.title} />
      <input name="description" placeholder="Description" onChange={handleChange} value={form.description} />
      <select name="status" onChange={handleChange} value={form.status}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} value={form.tags} />
      <div className="task-form-buttons">
        <button type="submit">{editTask ? "Update Task" : "Add Task"}</button>
        {editTask && <button type="button" onClick={clearEdit}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;
