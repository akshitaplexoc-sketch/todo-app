import { useState } from "react";

import DatePicker from "./Datepicker";
import ReminderPicker from "./ReminderPicker";

function TodoForm({
  addTodo,
  editingTodo,
  updateTodo,
  cancelEdit
}) {
  const [text, setText] = useState(
    editingTodo?.text || ""
  );

  const [important, setImportant] =
    useState(
      editingTodo?.important || false
    );

  const [date, setDate] = useState(
    editingTodo?.date || ""
  );

  const [reminder, setReminder] =
    useState(
      editingTodo?.reminder || ""
    );

  const handleDateChange = (
    newDate
  ) => {
    setDate(newDate);

    /*
      If reminder date is after
      the new task date, remove it.
    */

    if (
      reminder &&
      newDate &&
      reminder.slice(0, 10) > newDate
    ) {
      setReminder("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    /*
      Extra safety:
      Reminder cannot be after task date.
    */

    if (
      reminder &&
      date &&
      reminder.slice(0, 10) > date
    ) {
      alert(
        "Reminder date cannot be after the task date."
      );

      return;
    }

    if (editingTodo) {
      updateTodo(
        editingTodo.id,
        text.trim(),
        important,
        date,
        reminder
      );
    } else {
      addTodo(
        text.trim(),
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
      <div className="form-heading">
        <h2>
          {editingTodo
            ? "Edit Task"
            : "Create New Task"}
        </h2>

        <p>
          {editingTodo
            ? "Update your task details."
            : "Add details to organize your task."}
        </p>
      </div>

      {/* TASK */}

      <div className="form-group">
        <label htmlFor="task">
          Task
        </label>

        <input
          id="task"
          type="text"
          placeholder="What do you need to do?"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />
      </div>

      {/* TASK DATE */}

      <DatePicker
        label="Task Date"
        value={date}
        onChange={handleDateChange}
        placeholder="Select task date"
      />

      {/* REMINDER */}

      <div className="reminder-box">
        <div className="reminder-heading">
          <span className="reminder-icon">
            🔔
          </span>

          <div>
            <h3>Set Reminder</h3>

            <p>
              Choose when you want to be
              reminded.
            </p>
          </div>
        </div>

        <ReminderPicker
          value={reminder}
          onChange={setReminder}
          maxDate={date}
        />
      </div>

      {/* IMPORTANT */}

      <label className="important-checkbox">
        <input
          type="checkbox"
          checked={important}
          onChange={(e) =>
            setImportant(
              e.target.checked
            )
          }
        />

        <span className="custom-checkbox">
          {important ? "✓" : ""}
        </span>

        <span>
          Mark as Important
        </span>

        <span className="star">
          ★
        </span>
      </label>

      {/* BUTTONS */}

      <div className="form-buttons">
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
      </div>
    </form>
  );
}

export default TodoForm;