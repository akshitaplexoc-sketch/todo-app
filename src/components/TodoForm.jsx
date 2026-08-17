import { useEffect, useState } from "react";

function TodoForm({
  addTodo,
  editingTodo,
  updateTodo,
  cancelEdit
}) {

  const [text, setText] = useState("");
  const [important, setImportant] = useState(false);
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState("");

  useEffect(() => {

    if (editingTodo) {

      setText(editingTodo.text || "");
      setImportant(editingTodo.important || false);
      setDate(editingTodo.date || "");
      setReminder(editingTodo.reminder || "");

    } else {

      setText("");
      setImportant(false);
      setDate("");
      setReminder("");

    }

  }, [editingTodo]);


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!text.trim()) {
      return;
    }


    if (editingTodo) {

      updateTodo(
        editingTodo.id,
        text,
        important,
        date,
        reminder
      );

    } else {

      addTodo(
        text,
        important,
        date,
        reminder
      );

    }


    setText("");
    setImportant(false);
    setDate("");
    setReminder("");

  };


  return (

    <form
      className="todo-form"
      onSubmit={handleSubmit}
    >

      <h2>
        {editingTodo
          ? "Edit Task"
          : "Create New Task"}
      </h2>


      <label>Task</label>

      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />


      <label>Date</label>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />


      <label>Reminder</label>

      <input
        type="datetime-local"
        value={reminder}
        onChange={(e) =>
          setReminder(e.target.value)
        }
      />


      <label className="checkbox-label">

        <input
          type="checkbox"
          checked={important}
          onChange={(e) =>
            setImportant(e.target.checked)
          }
        />

        Mark as Important ⭐

      </label>


      <button
        type="submit"
        className="primary-btn full-btn"
      >

        {editingTodo
          ? "Update Task"
          : "Add Task"}

      </button>


      {editingTodo && (

        <button
          type="button"
          className="secondary-btn full-btn"
          onClick={cancelEdit}
        >
          Cancel
        </button>

      )}

    </form>

  );
}

export default TodoForm;