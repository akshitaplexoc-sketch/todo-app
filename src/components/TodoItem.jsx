function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo
}) {

  return (

    <div
      className={`todo-item ${
        todo.completed ? "completed" : ""
      }`}
    >

      <button
        className="check-btn"
        onClick={() =>
          toggleTodo(todo.id)
        }
      >
        {todo.completed ? "✓" : ""}
      </button>


      <div className="todo-content">

        <h3>{todo.text}</h3>

        <div className="todo-meta">

          {todo.date && (
            <span>📅 {todo.date}</span>
          )}

          {todo.reminder && (
            <span>🔔 Reminder set</span>
          )}

          {todo.important && (
            <span className="important-label">
              ⭐ Important
            </span>
          )}

        </div>

      </div>


      <div className="todo-actions">

        <button
          type="button"
          onClick={() =>
            editTodo(todo)
          }
          className="icon-btn"
          title="Edit"
        >
          ✏️
        </button>

        <button
          type="button"
          onClick={() =>
            deleteTodo(todo.id)
          }
          className="icon-btn delete-btn"
          title="Delete"
        >
          🗑️
        </button>

      </div>

    </div>

  );
}

export default TodoItem;