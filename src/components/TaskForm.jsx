// TaskForm Component
// TODO: Import useState and useRef from React
// TODO: Import the Task constructor from utils/Task.js

//
// Props: onAddTask (callback function from parent)
//
// TODO: Create a TaskForm component that:
//   - Has useState for each input field: title, description, date, time

    //   - Has useState for validation error messages for each field
    //   - Uses useRef to auto-focus the title input on mount

// - Validates the title on every keystroke using the regex pattern
//   - Validates date and time to prevent past values
//   - Shows dynamic feedback below each input:
//       Red text for invalid input
//       Green text for valid input

//   - On submit:
//       Wraps validation in try/catch/finally
//       Throws custom errors if validation fails
//       Creates a new Task using the constructor if valid
//       Calls onAddTask(newTask) to pass the task to the parent
//       Resets all input fields in the finally block
//
// Regex pattern for title validation: /^[A-Za-z0-9\s]{3,50}$/
//
// TODO: Export the component as default

import { useEffect, useRef, useState } from "react";
import { Task } from "../utils/Task";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Personal");

  const [titleError, setTitleError] = useState("");
  const [titleValid, setTitleValid] = useState(false);

  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleInputRef = useRef(null);

  const titleRegex = /^[A-Za-z0-9\s]{3,50}$/;

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // =====================================================
  // Title Validation
  // =====================================================

  const validateTitle = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setTitleError("Title is required.");
      setTitleValid(false);
      return false;
    }

    if (trimmedValue.length < 3) {
      setTitleError("Title must be at least 3 characters.");
      setTitleValid(false);
      return false;
    }

    if (!titleRegex.test(trimmedValue)) {
      setTitleError(
        "Use only letters, numbers, and spaces (3-50 characters)."
      );
      setTitleValid(false);
      return false;
    }

    setTitleError("");
    setTitleValid(true);

    return true;
  };

  // =====================================================
  // Date & Time Validation
  // =====================================================

  const validateDateTime = (selectedDate, selectedTime) => {
    setDateError("");
    setTimeError("");

    if (!selectedDate) {
      setDateError("Date is required.");
      return false;
    }

    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDateObject = new Date(
      `${selectedDate}T00:00:00`
    );

    selectedDateObject.setHours(0, 0, 0, 0);

    if (selectedDateObject < today) {
      setDateError("Date cannot be in the past.");
      return false;
    }

    if (selectedDate === getTodayString()) {
      if (!selectedTime) {
        setTimeError("Time is required for today.");
        return false;
      }

      const selectedDateTime = new Date(
        `${selectedDate}T${selectedTime}`
      );

      if (selectedDateTime <= now) {
        setTimeError("Time cannot be in the past.");
        return false;
      }
    }

    return true;
  };

  const getTodayString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================================
  // Submit
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const isTitleValid = validateTitle(title);
      const isDateTimeValid = validateDateTime(date, time);

      if (!isTitleValid) {
        throw new Error("Please fix the title before submitting.");
      }

      if (!isDateTimeValid) {
        throw new Error(
          "Please choose a valid future date and time."
        );
      }

      const newTask = new Task(
        title,
        description,
        date,
        time,
        category
      );

      onAddTask(newTask);

      setSuccessMessage("Task added successfully! ✨");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setCategory("Personal");

      setTitleError("");
      setTitleValid(false);
      setDateError("");
      setTimeError("");

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 0);
    } catch (error) {
      setSuccessMessage("");

      if (error instanceof Error) {
        if (
          error.message.includes("title") ||
          error.message.includes("Title")
        ) {
          setTitleError(error.message);
          setTitleValid(false);
        } else if (
          error.message.includes("date") ||
          error.message.includes("time")
        ) {
          setDateError(error.message);
        } else {
          setDateError(error.message);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================================
  // Keyboard Events
  // =====================================================

  const handleKeyDown = (e) => {
    // Ctrl + Enter / Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();

      e.currentTarget.requestSubmit();
    }
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="mb-0 fw-bold">
          ➕ Add New Task
        </h4>
      </div>

      <div className="card-body p-4">
        {successMessage && (
          <div className="alert alert-success rounded-3">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Task Title
            </label>

            <input
              ref={titleInputRef}
              type="text"
              className={`form-control form-control-lg rounded-3 ${
                titleError
                  ? "is-invalid"
                  : titleValid
                  ? "is-valid"
                  : ""
              }`}
              placeholder="e.g. Review React Project"
              value={title}
              onChange={(e) => {
                const value = e.target.value;

                setTitle(value);
                validateTitle(value);
              }}
              required
            />

            {titleError && (
              <div className="invalid-feedback d-block fw-semibold">
                ❌ {titleError}
              </div>
            )}

            {titleValid && !titleError && (
              <div className="valid-feedback d-block fw-semibold">
                ✅ Title is valid.
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Description
            </label>

            <textarea
              className="form-control rounded-3"
              rows="3"
              placeholder="Enter task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Date / Time / Category */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Date
              </label>

              <input
                type="date"
                className={`form-control rounded-3 ${
                  dateError ? "is-invalid" : ""
                }`}
                value={date}
                min={getTodayString()}
                onChange={(e) => {
                  const value = e.target.value;

                  setDate(value);

                  validateDateTime(value, time);
                }}
                required
              />

              {dateError && (
                <div className="invalid-feedback d-block fw-semibold">
                  ❌ {dateError}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Time
              </label>

              <input
                type="time"
                className={`form-control rounded-3 ${
                  timeError ? "is-invalid" : ""
                }`}
                value={time}
                onChange={(e) => {
                  const value = e.target.value;

                  setTime(value);

                  validateDateTime(date, value);
                }}
                required
              />

              {timeError && (
                <div className="invalid-feedback d-block fw-semibold">
                  ❌ {timeError}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Category
              </label>

              <select
                className="form-select rounded-3"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg w-100 rounded-3 fw-bold"
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </button>

          <p className="text-muted small text-center mt-3 mb-0">
            💡 Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit.
          </p>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;