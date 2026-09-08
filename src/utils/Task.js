// Task Constructor Function
//
// Regex pattern for title validation: /^[A-Za-z0-9\s]{3,50}$/
//
// TODO: Complete the constructor function /
// Use 'this' to assign the following properties:
//   - id: a unique identifier (you can use Date.now().toString())
//   - title: the task title
//   - description: the task description
//   - date: the task date
//   - time: the task time

// This method should return the date in a readable format
// Example: return new Date(this.date).toLocaleDateString()

// =====================================================
// BONUS: Add a setTitle method on Task.prototype
// This method should validate the new title before setting it
// Throw an Error if the title is invalid
// =====================================================

// =====================================================
// Storage Helper Functions
// localStorage stores strings only
// Use split() and join() with separators to convert data
// Field separator: |  (between properties of one task)
// Task separator: ;   (between different tasks)
// =====================================================

// TODO: Create a saveTasks function that:
//   - Takes an array of tasks
//   - Converts each task to a string using join("|") with its properties
//   - Joins all task strings using join(";")
//   - Saves the result to localStorage with the key "tasks"
// TODO: Create a loadTasks function that:
//   - Gets the stored string from localStorage using the key "tasks"
//   - If no data exists, return an empty array
//   - Splits the string by ";" to get individual task strings
//   - Splits each task string by "|" to get the properties
//   - Creates a new Task object for each using the constructor
//   - Returns the array of Task objects
// Task Constructor Function
// Task Constructor Function
// =====================================================
// Task Constructor
// =====================================================

function Task(
  title,
  description,
  date,
  time,
  category,
  id = Date.now().toString(),
  completed = false,
  alerted = false
) {
  this.id = id;

  // Use the prototype setter for validation.
  this.title = title;

  this.description = description;
  this.date = date;
  this.time = time;
  this.category = category;

  this.completed = completed;
  this.alerted = alerted;
}

// =====================================================
// Prototype Getter
// =====================================================

Object.defineProperty(Task.prototype, "formattedDate", {
  get: function () {
    if (!this.date) return "";

    const [year, month, day] = this.date.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  enumerable: true,
});

// =====================================================
// Prototype Setter
// =====================================================

Object.defineProperty(Task.prototype, "title", {
  get: function () {
    return this._title;
  },

  set: function (newTitle) {
    const titlePattern = /^[A-Za-z0-9\s]{3,50}$/;

    const value = String(newTitle ?? "").trim();

    if (!titlePattern.test(value)) {
      throw new Error(
        "Title must contain 3-50 letters, numbers, and spaces only."
      );
    }

    this._title = value;
  },

  enumerable: true,
});

// =====================================================
// Bonus setTitle method
// =====================================================

Task.prototype.setTitle = function (newTitle) {
  this.title = newTitle;
};

// =====================================================
// Storage Helpers
// =====================================================

function saveTasks(tasks) {
  const tasksArrayOfStrings = tasks.map((task) => {
    return [
      task.id,
      task.title,
      task.description,
      task.date,
      task.time,
      task.category,
      task.completed ? "true" : "false",
      task.alerted ? "true" : "false",
    ].join("|");
  });

  const finalString = tasksArrayOfStrings.join(";");

  localStorage.setItem("tasks", finalString);
}

function loadTasks() {
  const data = localStorage.getItem("tasks");

  if (!data) {
    return [];
  }

  return data
    .split(";")
    .filter((taskString) => taskString.trim() !== "")
    .map((taskString) => {
      const [
        id,
        title,
        description,
        date,
        time,
        category,
        completed,
        alerted,
      ] = taskString.split("|");

      try {
        return new Task(
          title,
          description,
          date,
          time,
          category,
          id,
          completed === "true",
          alerted === "true"
        );
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export {
  Task,
  saveTasks,
  loadTasks,
};