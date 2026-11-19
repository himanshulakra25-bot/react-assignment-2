function TaskCard({ task, onDelete, onToggleStatus }) {
  const isCompleted = task.status === "completed";

  return (
    <li className={`task-card ${isCompleted ? "done" : ""}`}>
      <div className="task-info">
        <h3 className={isCompleted ? "strike" : ""}>{task.title}</h3>

        {task.description && <p>{task.description}</p>}

        <div className="badges">
          <span className={`badge priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          {isCompleted ? (
            <span className="badge status-completed">Completed</span>
          ) : (
            <span className="badge status-pending">Pending</span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-success"
          onClick={() => onToggleStatus(task.id)}
        >
          {isCompleted ? "Mark Pending" : "Mark Completed"}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
