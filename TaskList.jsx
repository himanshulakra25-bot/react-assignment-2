import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete, onToggleStatus }) {
  // Empty state (Task 5)
  if (tasks.length === 0) {
    return <p className="empty">No tasks found. Add a task to get started!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // unique key = task.id
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}

export default TaskList;
