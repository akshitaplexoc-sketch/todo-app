import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

function Calendar() {
  const { todos } = useTodos();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  // =========================
  // PREVIOUS MONTH
  // =========================

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  // =========================
  // NEXT MONTH
  // =========================

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  // =========================
  // TODAY
  // =========================

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // =========================
  // TASKS FOR DATE
  // =========================

  const getTasksForDate = (day) => {
    return todos.filter((todo) => {
      if (!todo.date) return false;

      const [taskYear, taskMonth, taskDay] =
        todo.date.split("-").map(Number);

      return (
        taskYear === year &&
        taskMonth - 1 === month &&
        taskDay === day
      );
    });
  };

  // =========================
  // CHECK TODAY
  // =========================

  const isToday = (day) => {
    const today = new Date();

    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  // =========================
  // CALENDAR CELLS
  // =========================

  const cells = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cells.push(
      <div
        className="calendar-day empty"
        key={`empty-${i}`}
      />
    );
  }

  // Days
  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    const tasks = getTasksForDate(day);

    cells.push(
      <div
        className={`calendar-day ${
          isToday(day) ? "today" : ""
        }`}
        key={day}
      >

        <div className="calendar-date">
          <span>{day}</span>

          {tasks.length > 0 && (
            <small>
              {tasks.length}
            </small>
          )}
        </div>

        <div className="calendar-tasks">

          {tasks.map((task) => (
            <button
              className={`calendar-task ${
                task.completed
                  ? "calendar-task-completed"
                  : ""
              }`}
              key={task.id}
              onClick={() =>
                navigate("/create-task", {
                  state: {
                    todo: task,
                  },
                })
              }
              title="Edit task"
            >
              <span className="calendar-task-dot">
                {task.completed ? "✓" : ""}
              </span>

              <span className="calendar-task-text">
                {task.text}
              </span>

              {task.important && (
                <span className="calendar-task-star">
                  ★
                </span>
              )}
            </button>
          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="calendar-card">

      {/* ================= HEADER ================= */}

      <div className="calendar-header">

        <button
          className="calendar-nav-btn"
          onClick={previousMonth}
        >
          ←
        </button>

        <div className="calendar-month-title">

          <h2>
            {monthName} {year}
          </h2>

          <button
            className="today-btn"
            onClick={goToToday}
          >
            Today
          </button>

        </div>

        <button
          className="calendar-nav-btn"
          onClick={nextMonth}
        >
          →
        </button>

      </div>


      {/* ================= WEEKDAYS ================= */}

      <div className="weekdays">

        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>

      </div>


      {/* ================= CALENDAR ================= */}

      <div className="calendar-grid">
        {cells}
      </div>

    </div>
  );
}

export default Calendar;