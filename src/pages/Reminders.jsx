import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

function Reminders() {
  const { todos, deleteTodo } = useTodos();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Only tasks having a reminder
  const reminderTodos = todos
    .filter((todo) => todo.reminder)
    .filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(a.reminder) - new Date(b.reminder)
    );

  // Format reminder date and time
  const formatReminder = (reminder) => {
    if (!reminder) return "";

    const date = new Date(reminder);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="reminders-page">

      {/* Header */}
      <div className="page-title reminders-header">

        <div>
          <h1>Reminders 🔔</h1>

          <p>
            Keep track of your upcoming task reminders.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/create-task")}
        >
          + Create Task
        </button>

      </div>

      {/* Search */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Search reminders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button type="button">
          🔍
        </button>

      </div>

      {/* Reminder Count */}
      <div className="reminder-count">
        {reminderTodos.length}{" "}
        {reminderTodos.length === 1
          ? "Reminder"
          : "Reminders"}
      </div>

      {/* Reminder List */}
      <div className="reminder-list">

        {reminderTodos.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🔔
            </div>

            <h3>
              {search
                ? "No reminders found"
                : "No reminders set"}
            </h3>

            <p>
              {search
                ? "Try searching for another task."
                : "Create a task and set a reminder for it."}
            </p>

            {!search && (
              <button
                className="primary-btn"
                onClick={() =>
                  navigate("/create-task")
                }
              >
                + Create Task
              </button>
            )}

          </div>

        ) : (

          reminderTodos.map((todo) => (

            <div
              className={`reminder-card ${
                todo.completed
                  ? "reminder-completed"
                  : ""
              }`}
              key={todo.id}
            >

              {/* Reminder Icon */}
              <div className="reminder-icon">
                🔔
              </div>

              {/* Content */}
              <div className="reminder-content">

                <h3>
                  {todo.text}
                </h3>

                <div className="reminder-meta">

                  <span>
                    📅 {formatReminder(todo.reminder)}
                  </span>

                  {todo.important && (
                    <span className="important-label">
                      ⭐ Important
                    </span>
                  )}

                  <span
                    className={
                      todo.completed
                        ? "status-completed"
                        : "status-pending"
                    }
                  >
                    {todo.completed
                      ? "✓ Completed"
                      : "⏳ Pending"}
                  </span>

                </div>

              </div>

              {/* Actions */}
              <div className="reminder-actions">

                <button
                  className="icon-btn"
                  title="Edit"
                  onClick={() =>
                    navigate("/create-task", {
                      state: { todo },
                    })
                  }
                >
                  ✏️
                </button>

                <button
                  className="icon-btn delete-btn"
                  title="Delete"
                  onClick={() =>
                    deleteTodo(todo.id)
                  }
                >
                  🗑️
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Reminders;