// Tasks Page
// TODO: Import useState, useEffect, and useCallback from React
// TODO: Import TaskForm and TaskList components
// TODO: Import the Task constructor from utils/Task.js
// TODO: Import saveTasks and loadTasks from utils/Task.js
//
// TODO: Create a Tasks component that:
//   - Manages the tasks array in state (useState)
//   - Loads tasks from localStorage on mount (useEffect)
//   - Saves tasks to localStorage when tasks change (useEffect)
//   - Defines handler functions: handleAddTask, handleDeleteTask, handleEditTask
//   - Wraps handler functions with useCallback for stable references
//   - Renders TaskForm (pass handleAddTask as prop)
//   - Renders TaskList (pass tasks, handlers, and filter as props)
//
// TODO: Display the number of tasks in each category above the task list
//   - Count how many tasks exist in each category (Work, Personal, Study)
//   - Display each category name with its count
//   - Counts must update automatically when tasks are added or removed
//
// TODO: Add a category filter
//   - Provide a way for users to select a category
//   - When a category is selected, only tasks in that category are shown
//   - An "All" option shows every task
//
// Reminder: localStorage stores strings only
// Use split() and join() with separators to convert between strings and arrays
// Field separator: |
// Task separator: ;
//
// TODO: Export the component as default

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  loadTasks,
  saveTasks,
} from "../utils/Task";

function Tasks() {
  const [tasks, setTasks] = useState(
    () => loadTasks()
  );

  const [filterCategory, setFilterCategory] =
    useState("All");

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [activeReminderTask, setActiveReminderTask] =
    useState(null);

  const [windowWidth, setWindowWidth] =
    useState(window.innerWidth);

  // =====================================================
  // Save Tasks
  // =====================================================

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // =====================================================
  // Cross-Tab Synchronization
  // =====================================================

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "tasks") {
        setTasks(loadTasks());
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =====================================================
  // Add Task
  // =====================================================

  const handleAddTask = useCallback(
    (newTask) => {
      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);
    },
    []
  );

  // =====================================================
  // Delete Task
  // =====================================================

  const handleDeleteTask = useCallback(
    (taskId) => {
      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task.id !== taskId
        )
      );
    },
    []
  );

  // =====================================================
  // Edit Task
  // =====================================================

  const handleEditTask = useCallback(
    (taskId, updatedTask) => {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      );
    },
    []
  );

  // =====================================================
  // Category Statistics using reduce()
  // =====================================================

  const categoryStats = tasks.reduce(
    (stats, task) => {
      if (stats[task.category] !== undefined) {
        stats[task.category]++;
      }

      return stats;
    },
    {
      Work: 0,
      Personal: 0,
      Study: 0,
    }
  );

  // =====================================================
  // Task Status
  // =====================================================

  const getTaskBadge = useCallback(
    (task) => {
      if (task.completed) {
        return {
          label: "Completed",
          bgClass: "bg-success",
        };
      }

      const now = currentTime;

      const taskTime =
        task.time?.trim() || "23:59";

      const taskDateTime = new Date(
        `${task.date}T${taskTime}`
      );

      if (taskDateTime < now) {
        return {
          label: "Pending",
          bgClass: "bg-danger",
        };
      }

      const todayString = getTodayString();

      if (task.date === todayString) {
        return {
          label: "Due Today",
          bgClass: "bg-warning text-dark",
        };
      }

      return {
        label: "Upcoming",
        bgClass: "bg-info text-dark",
      };
    },
    [currentTime]
  );

  // =====================================================
  // Current Time Tick
  // Keeps status colors updated automatically.
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // =====================================================
  // Reminder Every 30 Seconds
  // =====================================================

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();

      const todayString = getTodayString();

      const currentHours = String(
        now.getHours()
      ).padStart(2, "0");

      const currentMinutes = String(
        now.getMinutes()
      ).padStart(2, "0");

      const currentTimeString = `${currentHours}:${currentMinutes}`;

      tasks.forEach((task) => {
        const taskTime =
          task.time?.trim() || "";

        if (
          task.date === todayString &&
          taskTime === currentTimeString &&
          !task.alerted &&
          !task.completed
        ) {
          alert(
            `⏰ Reminder: Task "${task.title}" is due now!`
          );

          setActiveReminderTask(task);

          setTasks((previousTasks) =>
            previousTasks.map((currentTask) =>
              currentTask.id === task.id
                ? {
                    ...currentTask,
                    alerted: true,
                  }
                : currentTask
            )
          );
        }
      });
    };

    checkReminders();

    const interval = setInterval(
      checkReminders,
      30000
    );

    return () => {
      clearInterval(interval);
    };
  }, [tasks]);

  // =====================================================
  // Window Resize
  // =====================================================

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // =====================================================
  // Helper
  // =====================================================

  function getTodayString() {
    const now = new Date();

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary display-6">
          Task Dashboard
        </h2>

        <p className="text-muted">
          Manage your time, tasks, and daily routine easily.
        </p>

        <span className="badge bg-secondary rounded-pill">
          🖥️ Window Width: {windowWidth}px
        </span>
      </div>

      {/* Form */}
      <div className="mb-4">
        <TaskForm
          onAddTask={handleAddTask}
        />
      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4 text-center">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-primary bg-opacity-10 text-primary p-3 rounded-4">
            <span className="fw-bold">
              💼 Work
            </span>

            <span className="display-6 fw-bold">
              {categoryStats.Work}
            </span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-success bg-opacity-10 text-success p-3 rounded-4">
            <span className="fw-bold">
              👤 Personal
            </span>

            <span className="display-6 fw-bold">
              {categoryStats.Personal}
            </span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-warning bg-opacity-10 text-dark p-3 rounded-4">
            <span className="fw-bold">
              📚 Study
            </span>

            <span className="display-6 fw-bold">
              {categoryStats.Study}
            </span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
          <label
            htmlFor="filter"
            className="fw-bold text-secondary"
          >
            🔍 Filter Tasks by Category:
          </label>

          <select
            id="filter"
            className="form-select filter-select rounded-3"
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value)
            }
          >
            <option value="All">
              🌐 All Categories
            </option>

            <option value="Work">
              💼 Work
            </option>

            <option value="Personal">
              👤 Personal
            </option>

            <option value="Study">
              📚 Study
            </option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        filterCategory={filterCategory}
        getTaskBadge={getTaskBadge}
      />

      {/* Reminder Modal */}
      {activeReminderTask && (
        <div
          className="modal show d-block reminder-overlay"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-warning border-0">
                <h5 className="modal-title fw-bold">
                  ⏰ Task Reminder!
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setActiveReminderTask(null)
                  }
                />
              </div>

              <div className="modal-body text-center p-4">
                <div className="display-3 mb-3">
                  📢
                </div>

                <h4 className="fw-bold">
                  {activeReminderTask.title}
                </h4>

                <p className="text-muted">
                  {activeReminderTask.description ||
                    "No description provided."}
                </p>

                <div className="d-flex justify-content-center flex-wrap gap-2">
                  <span className="badge bg-primary rounded-pill px-3 py-2">
                    📁 {activeReminderTask.category}
                  </span>

                  <span className="badge bg-dark rounded-pill px-3 py-2">
                    ⏰ {activeReminderTask.time}
                  </span>
                </div>
              </div>

              <div className="modal-footer border-0 justify-content-center">
                <button
                  type="button"
                  className="btn btn-warning rounded-pill px-4 fw-bold"
                  onClick={() =>
                    setActiveReminderTask(null)
                  }
                >
                  Got it! 👍
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;