import { useLocation, useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

import TodoForm from "../components/TodoForm";

function CreateTask() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    addTodo,
    updateTodo,
  } = useTodos();

  const editingTodo = location.state?.todo || null;

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

    navigate("/tasks");
  };

  const handleAdd = (
    text,
    important,
    date,
    reminder
  ) => {
    addTodo(
      text,
      important,
      date,
      reminder
    );

    navigate("/tasks");
  };

  return (
    <div className="create-task-page">

      {/* HEADER */}

      <div className="create-task-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div>
          <h1>
            {editingTodo
              ? "Edit Task"
              : "Create New Task"}
          </h1>

          <p>
            {editingTodo
              ? "Update your task details."
              : "Add a new task and stay organized."}
          </p>
        </div>

      </div>


      {/* FORM */}

      <TodoForm
        addTodo={handleAdd}
        editingTodo={editingTodo}
        updateTodo={handleUpdate}
        cancelEdit={() => navigate("/tasks")}
      />

    </div>
  );
}

export default CreateTask;