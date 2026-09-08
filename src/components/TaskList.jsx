// TaskList Component
// TODO: Import TaskCard component
//
// Props: tasks (array), onDeleteTask (callback function),
//        onEditTask (callback function), filterCategory (string)
//
// TODO: Create a TaskList component that:
//   - Filters the tasks array based on the selected category
//       If filterCategory is "All", show every task
//       Otherwise, show only tasks matching the selected category
//   - Checks if the filtered array is empty
//       If empty: render a "No tasks yet" message
//       If not empty: render the list of tasks
//   - Uses .map() to render a TaskCard for each task
//   - Passes a unique key prop to each TaskCard
//   - Passes task data, onDeleteTask, and onEditTask to each TaskCard
//   - Uses Bootstrap grid classes (row, col) for layout
//
// TODO: Implement event delegation for delete actions
//   - Attach a single click handler to the task list container
//   - Use event.target to identify which delete button was clicked
//   - Read the task id from the button's data attribute
//   - Show a confirm() dialog before calling onDeleteTask
//
// TODO: Export the component as default
import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onDeleteTask,
  onEditTask,
  filterCategory,
  getTaskBadge,
}) {
  const filteredTasks = tasks.filter((task) => {
    if (
      !filterCategory ||
      filterCategory === "All"
    ) {
      return true;
    }

    return task.category === filterCategory;
  });

  // =====================================================
  // Event Delegation
  // =====================================================

  const handleContainerClick = (e) => {
    const deleteButton = e.target.closest(
      "[data-delete-id]"
    );

    if (!deleteButton) {
      return;
    }

    const taskId =
      deleteButton.getAttribute("data-delete-id");

    if (
      window.confirm(
        "Are you sure you want to delete this task?"
      )
    ) {
      onDeleteTask(taskId);
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <div className="display-4 mb-3">📋</div>

        <h4 className="fw-bold">
          No tasks found
        </h4>

        <p className="text-muted mb-0">
          Add a task or choose another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="row"
      onClick={handleContainerClick}
    >
      {filteredTasks.map((task) => (
        <div
          className="col-12 col-md-6"
          key={task.id}
        >
          <TaskCard
            task={task}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            getTaskBadge={getTaskBadge}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;