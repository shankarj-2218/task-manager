import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title: "", description: "", status: "pending", tags: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()) };
    onSubmit(payload);
    setForm({ title: "", description: "", status: "pending", tags: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} value={form.title} />
      <input name="description" placeholder="Description" onChange={handleChange} value={form.description} />
      <select name="status" onChange={handleChange} value={form.status}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} value={form.tags} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
