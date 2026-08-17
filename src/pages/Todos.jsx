import { useState } from "react";
import { useTodos } from "../context/TodoContext";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

function Todos() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState(null);
  const [search, setSearch] = useState("");

  // Search Filter
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  // Start Editing
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Update Todo
  const handleUpdate = (
    id,
    text,
    important,
    date,
    reminder
  ) => {
    updateTodo(
      id,
      text,
      important,
      date,
      reminder
    );

    setEditingTodo(null);
  };

  return (
    <div className="todos-page">

      {/* Page Header */}
      <div className="page-title">
        <div>
          <h1>My Tasks</h1>
          <p>
            Manage your daily tasks and stay organized.
          </p>
        </div>

        <div className="task-count">
          {todos.length} Tasks
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
            type="text"
            placeholder="Search your tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <button type="button">
            🔍
        </button>
      </div>

      {/* Add / Edit Form */}
      <TodoForm
        addTodo={addTodo}
        editingTodo={editingTodo}
        updateTodo={handleUpdate}
        cancelEdit={handleCancelEdit}
      />

      {/* Task Statistics */}
      <div className="task-stats">

        <div className="stat-card">
          <span>Total</span>
          <strong>{todos.length}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>
            {
              todos.filter(
                (todo) => todo.completed
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>
            {
              todos.filter(
                (todo) => !todo.completed
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Important</span>
          <strong>
            {
              todos.filter(
                (todo) => todo.important
              ).length
            }
          </strong>
        </div>

      </div>

      {/* Todo List */}
      <div className="todo-list">

        {filteredTodos.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              📝
            </div>

            <h3>
              {search
                ? "No tasks found"
                : "No tasks yet"}
            </h3>

            <p>
              {search
                ? "Try searching for something else."
                : "Add your first task to get started."}
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