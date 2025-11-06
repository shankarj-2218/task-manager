import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tasks with optional filters
  const fetchTasks = useCallback(
    async (applyFilters = false) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (applyFilters) {
          if (filters.status.trim() !== "")
            params.append("status", filters.status);
          if (filters.search.trim() !== "")
            params.append("search", filters.search);
        }
        const res = await API.get(`/tasks?${params.toString()}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Load all tasks only once at start
  useEffect(() => {
    fetchTasks(false);
  }, [fetchTasks]); // 👈 only runs on mount

  const addTask = async (task) => {
    try {
      setLoading(true);
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, task);
        setEditTask(null);
      } else {
        await API.post("/tasks", task);
      }
      fetchTasks(true); // refresh filtered view after update
    } catch (err) {
      console.error("Error adding/updating task:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/tasks/${id}`);
      fetchTasks(true);
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Task Form */}
      <TaskForm
        onSubmit={addTask}
        editTask={editTask}
        clearEdit={() => setEditTask(null)}
      />

      {/* Filter Section */}
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

        <button onClick={() => fetchTasks(true)}>Filter</button>
        <button
          onClick={() => {
            setFilters({ status: "", search: "" });
            fetchTasks(false);
          }}
        >
          Reset
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              {task.tags?.length > 0 && (
                <p>
                  <strong>Tags:</strong> {task.tags.join(", ")}
                </p>
              )}
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
