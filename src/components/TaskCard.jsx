// TaskCard Component
// TODO: Import React (for React.memo)
//
// Props: task (object), onDeleteTask (callback function), onEditTask (callback function)
//
// TODO: Create a TaskCard component that:
//   - Displays the task title, description, date, and time
//   - Displays the task category as a label
//   - Displays a status label (overdue, due today, or upcoming)
//   - Uses the task's getFormattedDate() method to display the date
//   - Applies dynamic inline styles based on task status:
//       Overdue tasks: light red background
//       Due today: light yellow background
//       Future tasks: default white background
//   - Has a Delete button that:
//       Shows a confirm() dialog before deleting
//       Calls onDeleteTask(task.id) if confirmed
//   - Has an Edit button that switches the card to editing mode
//   - Uses Bootstrap card classes for styling
//
// TODO: Implement inline editing that allows the user to edit:
//   - Title, description, date, time, and category
//   - Validate that date is not in the past during editing
//   - Validate that time is not in the past if today is selected during editing
//   - Use bracket notation (task[fieldName]) when applying updates
//   - Pressing Escape must cancel editing and restore original values
//   - Call onEditTask(task.id, updates) when the user saves
// TODO: Wrap the component with React.memo before exporting
// TODO: Export the component as default
import React, { memo, useEffect, useState } from "react";

function TaskCard({
  task,
  onDeleteTask,
  onEditTask,
  getTaskBadge,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editTask, setEditTask] = useState({
    ...task,
  });

  const [editError, setEditError] = useState("");

  // Keep editing data synchronized if task changes externally.
  useEffect(() => {
    if (!isEditing) {
      setEditTask({
        ...task,
      });
    }
  }, [task, isEditing]);

  const badge = getTaskBadge(task);

  // =====================================================
  // Dynamic Property Update - Bracket Notation
  // =====================================================

  const updateField = (fieldName, value) => {
    setEditTask((previousTask) => ({
      ...previousTask,

      [fieldName]: value,
    }));
  };

  // =====================================================
  // Start Editing
  // =====================================================

  const handleStartEditing = () => {
    setEditTask({
      ...task,
    });

    setEditError("");
    setIsEditing(true);
  };

  // =====================================================
  // Cancel Editing
  // =====================================================

  const handleCancelEditing = () => {
    setEditTask({
      ...task,
    });

    setEditError("");
    setIsEditing(false);
  };

  // =====================================================
  // Validate Editing
  // =====================================================

  const validateEdit = () => {
    const titleRegex = /^[A-Za-z0-9\s]{3,50}$/;

    const title = editTask.title.trim();

    if (!titleRegex.test(title)) {
      throw new Error(
        "Title must contain 3-50 letters, numbers, and spaces only."
      );
    }

    if (!editTask.date) {
      throw new Error("Date is required.");
    }

    const now = new Date();

    const selectedDate = new Date(
      `${editTask.date}T00:00:00`
    );

    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      throw new Error("Date cannot be in the past.");
    }

    if (editTask.date === getTodayString()) {
      if (!editTask.time) {
        throw new Error("Time is required for today.");
      }

      const selectedDateTime = new Date(
        `${editTask.date}T${editTask.time}`
      );

      if (selectedDateTime <= now) {
        throw new Error("Time cannot be in the past.");
      }
    }

    return true;
  };

  const getTodayString = () => {
    const now = new Date();

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  };

  // =====================================================
  // Save Editing
  // =====================================================

  const handleSave = () => {
    try {
      setEditError("");

      validateEdit();

      const updates = {
        ...task,
        title: editTask.title.trim(),
        description: editTask.description,
        date: editTask.date,
        time: editTask.time,
        category: editTask.category,
      };

      onEditTask(task.id, updates);

      setIsEditing(false);
    } catch (error) {
      setEditError(error.message);
    }
  };

  // =====================================================
  // Keyboard Events
  // =====================================================

  const handleKeyDown = (e) => {
    // Escape = Cancel
    if (e.key === "Escape") {
      e.preventDefault();

      handleCancelEditing();

      return;
    }

    // Ctrl + Enter = Save
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();

      handleSave();
    }
  };

  // =====================================================
  // Card Style
  // =====================================================

  const getCardStyle = () => {
    if (badge.label === "Pending") {
      return {
        backgroundColor: "#fff0f0",
      };
    }

    if (badge.label === "Due Today") {
      return {
        backgroundColor: "#fffbea",
      };
    }

    return {
      backgroundColor: "#ffffff",
    };
  };

  if (isEditing) {
    return (
      <div
        className="card border-0 shadow-sm rounded-4 p-4 mb-3"
        style={getCardStyle()}
        onKeyDown={handleKeyDown}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">
            ✏️ Edit Task
          </h5>

          <span className="badge bg-primary rounded-pill">
            Editing
          </span>
        </div>

        {editError && (
          <div className="alert alert-danger rounded-3">
            ❌ {editError}
          </div>
        )}

        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Title
          </label>

          <input
            type="text"
            className="form-control"
            value={editTask.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            autoFocus
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Description
          </label>

          <textarea
            className="form-control"
            rows="3"
            value={editTask.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
          />
        </div>

        {/* Date / Time / Category */}
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Date
            </label>

            <input
              type="date"
              className="form-control"
              min={getTodayString()}
              value={editTask.date}
              onChange={(e) =>
                updateField("date", e.target.value)
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Time
            </label>

            <input
              type="time"
              className="form-control"
              value={editTask.time}
              onChange={(e) =>
                updateField("time", e.target.value)
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select"
              value={editTask.category}
              onChange={(e) =>
                updateField(
                  "category",
                  e.target.value
                )
              }
            >
              <option value="Personal">
                👤 Personal
              </option>

              <option value="Work">
                💼 Work
              </option>

              <option value="Study">
                📚 Study
              </option>
            </select>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-success rounded-pill px-4"
            onClick={handleSave}
          >
            💾 Save
          </button>

          <button
            className="btn btn-secondary rounded-pill px-4"
            onClick={handleCancelEditing}
          >
            ✖ Cancel
          </button>
        </div>

        <p className="text-muted small mt-3 mb-0">
          Press <kbd>Esc</kbd> to cancel or{" "}
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to save.
        </p>
      </div>
    );
  }

  // =====================================================
  // Normal Card
  // =====================================================

  return (
    <div
      className={`card border-0 shadow-sm rounded-4 p-3 mb-3 ${
        badge.label === "Pending"
          ? "border-start border-danger border-4"
          : ""
      }`}
      style={getCardStyle()}
    >
      <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
        <h5 className="fw-bold mb-0 text-break">
          {task.title}
        </h5>

        <span
          className={`badge ${badge.bgClass} px-3 py-2 rounded-pill`}
        >
          {badge.label}
        </span>
      </div>

      <p className="text-muted small mb-2">
        {task.description || "No description provided."}
      </p>

      <div className="d-flex flex-wrap align-items-center gap-2 text-secondary small mb-3">
        <span>
          📅 {task.formattedDate || task.date}
        </span>

        {task.time && (
          <span>
            ⏰ {task.time}
          </span>
        )}

        <span className="badge bg-light text-dark border">
          📁 {task.category}
        </span>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          className={`btn btn-sm rounded-pill px-3 ${
            task.completed
              ? "btn-outline-secondary"
              : "btn-outline-success"
          }`}
          onClick={() =>
            onEditTask(task.id, {
              ...task,
              completed: !task.completed,
            })
          }
        >
          {task.completed
            ? "↩ Mark Pending"
            : "✓ Mark Done"}
        </button>

        <button
          className="btn btn-sm btn-outline-primary rounded-pill px-3"
          onClick={handleStartEditing}
        >
          ✏️ Edit
        </button>

        <button
          className="btn btn-sm btn-outline-danger rounded-pill px-3"
          data-delete-id={task.id}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default memo(TaskCard);