import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Card from "./components/Card";

function App() {
  // Array of objects state (Task 2)
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | completed | pending

  // ADD: naya array banao (spread) - original mutate nahi karte
  const handleAddTask = (taskData) => {
    const newTask = { id: Date.now(), ...taskData, status: "pending" };
    setTasks((prev) => [newTask, ...prev]);
  };

  // DELETE: filter se wo task hata do
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // UPDATE STATUS: map se ek object ka copy banake status badlo
  const handleToggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
          : task
      )
    );
  };

  // Derived data: search + filter (alag state ki zarurat nahi)
  const visibleTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (filter === "all" ? true : task.status === filter));

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <>
      <Navbar
        total={tasks.length}
        completed={completedCount}
        pending={tasks.length - completedCount}
      />

      <main className="container">
        <TaskForm onAddTask={handleAddTask} />

        <Card title="Your Tasks">
          <div className="controls">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filters">
              {["all", "completed", "pending"].map((f) => (
                <button
                  key={f}
                  className={`btn filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <TaskList
            tasks={visibleTasks}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </Card>
      </main>
    </>
  );
}

export default App;
