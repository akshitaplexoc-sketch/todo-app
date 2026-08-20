import { useState } from "react";
import { useTodos } from "../context/TodoContext"; // ⚠️ adjust path if your TodoContext file lives elsewhere
import TodoItem from "../components/TodoItem"; // ⚠️ adjust path to match your project

function Important() {
  const { todos, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [search, setSearch] = useState("");

  const importantTodos = todos
    .filter((todo) => todo.important)
    .filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="important-page">

      <div className="page-title">
        <div>
          <h1>Important Tasks ⭐</h1>
          <p>Your priority tasks.</p>
        </div>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search important tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {importantTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3>No important tasks</h3>
          <p>
            {search
              ? "No tasks match your search."
              : "Mark tasks as important to see them here."}
          </p>
        </div>
      ) : (
        <div className="simple-list">
          {importantTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Important;