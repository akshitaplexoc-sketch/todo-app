import { useEffect, useState } from "react";

function Calendar() {

  const [todos, setTodos] = useState([]);

  const [currentDate, setCurrentDate] =
    useState(new Date());


  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("todos")) || [];

    setTodos(saved);

  }, []);


  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();


  const firstDay =
    new Date(year, month, 1).getDay();

  const daysInMonth =
    new Date(year, month + 1, 0).getDate();


  const monthName =
    currentDate.toLocaleString("default", {
      month: "long"
    });


  const previousMonth = () => {

    setCurrentDate(
      new Date(year, month - 1, 1)
    );

  };


  const nextMonth = () => {

    setCurrentDate(
      new Date(year, month + 1, 1)
    );

  };


  const getTasksForDate = (day) => {

    return todos.filter((todo) => {

      if (!todo.date) return false;

      const taskDate =
        new Date(todo.date);

      return (
        taskDate.getFullYear() === year &&
        taskDate.getMonth() === month &&
        taskDate.getDate() === day
      );

    });

  };


  const cells = [];


  for (let i = 0; i < firstDay; i++) {
    cells.push(
      <div
        className="calendar-day empty"
        key={`empty-${i}`}
      />
    );
  }


  for (let day = 1; day <= daysInMonth; day++) {

    const tasks =
      getTasksForDate(day);

    cells.push(

      <div
        className="calendar-day"
        key={day}
      >

        <strong>{day}</strong>

        {tasks.map((task) => (

          <div
            className="calendar-task"
            key={task.id}
          >
            {task.text}
          </div>

        ))}

      </div>

    );

  }


  return (

    <div className="calendar-card">

      <div className="calendar-header">

        <button onClick={previousMonth}>
          ←
        </button>

        <h2>
          {monthName} {year}
        </h2>

        <button onClick={nextMonth}>
          →
        </button>

      </div>


      <div className="weekdays">

        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>

      </div>


      <div className="calendar-grid">

        {cells}

      </div>

    </div>

  );
}

export default Calendar;