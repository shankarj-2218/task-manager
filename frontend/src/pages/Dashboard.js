import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", tag: "" });
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks (memoized so ESLint won't complain)
  const fetchTasks = useCallback(async (applyFilters = false) => {
    try {
      let query = "";
      if (applyFilters) {
        const params = [];
        if (filters.status) params.push(`status=${filters.status}`);
        if (filters.tag) params.push(`tag=${filters.tag}`);
        query = params.length ? `?${params.join("&")}` : "";
      }

      const res = await API.get(`/tasks${query}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [filters]);

  useEffect(() => {
    // Load all tasks on page load
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task) => {
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, task);
        setEditTask(null);
      } else {
        await API.post("/tasks", task);
      }
      fetchTasks();
    } catch (err) {
      console.error("Error adding/updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleFilter = () => {
    // Explicit trigger — ensures manual filter works
    fetchTasks(true);
  };

  const clearFilters = () => {
    setFilters({ status: "", tag: "" });
    fetchTasks();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="filter-bar">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          placeholder="Filter by tag"
          value={filters.tag}
          onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
        />

        <button onClick={handleFilter}>Filter</button>
        <button onClick={clearFilters}>Reset</button>
      </div>

      <TaskForm onSubmit={addTask} editTask={editTask} clearEdit={() => setEditTask(null)} />

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Tags:</strong> {task.tags.join(", ")}</p>
              <div className="task-actions">
                <button onClick={() => setEditTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
