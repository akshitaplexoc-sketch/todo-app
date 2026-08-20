import { useLocation, useNavigate } from "react-router-dom";

import TodoForm from "../components/TodoForm";
import { useTodos } from "../context/TodoContext";

function CreateTask() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    addTodo,
    updateTodo,
  } = useTodos();

  const editingTodo = location.state?.todo || null;

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

  const handleCancel = () => {
    navigate("/tasks");
  };

  return (
    <div className="create-task-page">

      <div className="page-title">

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

      <div className="create-task-container">

        <TodoForm
          addTodo={handleAdd}
          editingTodo={editingTodo}
          updateTodo={handleUpdate}
          cancelEdit={handleCancel}
        />

      </div>

    </div>
  );
}

export default CreateTask;