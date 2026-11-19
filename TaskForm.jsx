import { useState } from "react";
import Card from "./Card";


const initialForm = { title: "", description: "", priority: "Low" };

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); 
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (formData.title.trim() === "") {
      setError("Task title cannot be empty.");
      return;
    }

    onAddTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    });

    setFormData(initialForm); 
    setError("");
  };

  return (
    <Card title="Add New Task">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <label>
          Task Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Finish React assignment"
            className={error ? "input-error" : ""}
          />
        </label>
        {error && <p className="error">{error}</p>}

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Optional details"
          />
        </label>

        <label>
          Priority
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </Card>
  );
}

export default TaskForm;
