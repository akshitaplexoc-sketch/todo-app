import { useTodos } from "../context/TodoContext";

function Settings() {
  const { deleteAllTodos, todos } = useTodos();

  const handleDeleteAll = () => {
    if (todos.length === 0) {
      alert("There are no tasks to delete.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmed) {
      deleteAllTodos();
    }
  };

  return (
    <div className="settings-page">

      <div className="page-title">
        <div>
          <h1>Settings</h1>
          <p>Manage your TaskFlow settings.</p>
        </div>
      </div>

      <div className="settings-card">

        <div className="settings-section">
          <h2>Task Management</h2>

          <p>
            Remove all tasks from your TaskFlow application.
          </p>

          <button
            className="delete-all-btn"
            onClick={handleDeleteAll}
          >
            🗑 Delete All Tasks
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;