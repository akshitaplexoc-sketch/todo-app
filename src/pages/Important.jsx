import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import TodoItem from "../components/TodoItem";

function Important() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();

  // Only pending + important tasks
  const importantTodos = todos.filter(
    (todo) => todo.important && !todo.completed
  );

  const handleEdit = (todo) => {
    navigate("/create-task", {
      state: {
        todo,
      },
    });
  };

  return (
    <div className="todos-page">

      <div className="page-title task-page-header">
        <div>
          <h1>Important Tasks ⭐</h1>
          <p>
            Your important pending tasks.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/create-task")}
        >
          + Create New Task
        </button>
      </div>

      <div className="task-stats">

        <div className="stat-card">
          <span>Important</span>
          <strong>{importantTodos.length}</strong>
        </div>

      </div>

      <div className="todo-list">

        {importantTodos.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ⭐
            </div>

            <h3>
              No important tasks
            </h3>

            <p>
              You have no pending important tasks.
            </p>

          </div>

        ) : (

          importantTodos.map((todo) => (
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

export default Important;