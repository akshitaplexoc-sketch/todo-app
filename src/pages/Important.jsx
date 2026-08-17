import { useEffect, useState } from "react";

function Important() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos =
      JSON.parse(localStorage.getItem("todos")) || [];

    setTodos(
      savedTodos.filter((todo) => todo.important)
    );
  }, []);

  return (
    <div>
      <div className="page-title">
        <div>
          <h1>Important Tasks ⭐</h1>
          <p>Your priority tasks.</p>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <div>⭐</div>

          <h3>No important tasks</h3>

          <p>
            Mark tasks as important to see them here.
          </p>
        </div>
      ) : (
        <div className="simple-list">
          {todos.map((todo) => (
            <div
              className="simple-task"
              key={todo.id}
            >
              <span>⭐</span>

              <div>
                <h3>{todo.text}</h3>

                <p>
                  {todo.completed
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Important;