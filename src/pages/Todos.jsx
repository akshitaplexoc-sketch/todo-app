import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

import TodoItem from "../components/TodoItem";

function Todos() {
  const {
    todos,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter") || "all";

  const [search, setSearch] = useState("");

  // =========================
  // EDIT TASK
  // =========================

  const handleEdit = (todo) => {
    navigate("/create-task", {
      state: {
        todo,
      },
    });
  };

  // =========================
  // FILTER TASKS
  // =========================

  const statusFilteredTodos = todos.filter((todo) => {
    if (filter === "pending") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    if (filter === "important") {
      return todo.important;
    }

    return true;
  });

  // =========================
  // SEARCH TASKS
  // =========================

  const filteredTodos = statusFilteredTodos.filter((todo) =>
    todo.text
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // PAGE TITLE
  // =========================

  const getTitle = () => {
    switch (filter) {
      case "pending":
        return "Pending Tasks";

      case "completed":
        return "Completed Tasks";

      case "important":
        return "Important Tasks";

      default:
        return "My Tasks";
    }
  };

  // =========================
  // PAGE DESCRIPTION
  // =========================

  const getDescription = () => {
    switch (filter) {
      case "pending":
        return "Tasks that are still waiting to be completed.";

      case "completed":
        return "Tasks that you have successfully completed.";

      case "important":
        return "Tasks that you marked as important.";

      default:
        return "Manage your daily tasks and stay organized.";
    }
  };

// =========================
// COUNTS
// =========================

const total = todos.length;

const completed = todos.filter(
  (todo) => todo.completed
).length;

const pending = todos.filter(
  (todo) => !todo.completed
).length;

  return (
    <div className="todos-page">

      {/* ================= HEADER ================= */}

      <div className="page-title task-page-header">

        <div>
          <h1>{getTitle()}</h1>

          <p>
            {getDescription()}
          </p>
        </div>

        <button
          className="primary-btn create-task-btn"
          onClick={() => navigate("/create-task")}
        >
          + Create New Task
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search your tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {search && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setSearch("")}
          >
            ✕
          </button>
        )}

        <button
          type="button"
          className="search-btn"
        >
          🔍
        </button>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="task-stats">

        <div
          className="task-stat-card"
          onClick={() =>
            navigate("/tasks?filter=all")
          }
        >
          <span>Total</span>
          <strong>{total}</strong>
        </div>


        <div
          className="task-stat-card completed-stat"
          onClick={() =>
            navigate("/tasks?filter=completed")
          }
        >
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>


        <div
          className="task-stat-card pending-stat"
          onClick={() =>
            navigate("/tasks?filter=pending")
          }
        >
          <span>Pending</span>
          <strong>{pending}</strong>
        </div>


       <div className="stat-card">
          <span>Important</span>

          <strong>
            {
              todos.filter(
                (todo) => todo.important && !todo.completed
              ).length
            }
        </strong>
      </div>

      </div>


      {/* ================= ACTIVE FILTER ================= */}

      {filter !== "all" && (
        <div className="active-filter">

          <span>
            Showing: <strong>{getTitle()}</strong>
          </span>

          <button
            onClick={() =>
              navigate("/tasks")
            }
          >
            View All
          </button>

        </div>
      )}


      {/* ================= TASK LIST ================= */}

      <div className="todo-list">

        {filteredTodos.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              {search
                ? "🔍"
                : filter === "completed"
                ? "✓"
                : filter === "pending"
                ? "⏳"
                : filter === "important"
                ? "⭐"
                : "📝"}
            </div>


            <h3>

              {search
                ? "No tasks found"
                : filter === "pending"
                ? "No pending tasks"
                : filter === "completed"
                ? "No completed tasks"
                : filter === "important"
                ? "No important tasks"
                : "No tasks yet"}

            </h3>


            <p>

              {search
                ? "Try searching with a different keyword."
                : filter === "pending"
                ? "All your tasks are completed."
                : filter === "completed"
                ? "You haven't completed any tasks yet."
                : filter === "important"
                ? "You haven't marked any task as important."
                : "Create your first task to get started."}

            </p>

          </div>

        ) : (

          filteredTodos.map((todo) => (

            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={handleEdit}
            />

          ))

        )}

      </div>

    </div>
  );
}

export default Todos;