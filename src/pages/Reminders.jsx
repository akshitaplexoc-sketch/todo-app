import { useEffect, useState } from "react";

function Reminders() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("todos")) || [];

    setTodos(
      saved.filter((todo) => todo.reminder)
    );

  }, []);


  return (

    <div>

      <div className="page-title">

        <div>
          <h1>Reminders 🔔</h1>
          <p>Don't miss your important tasks.</p>
        </div>

      </div>


      {todos.length === 0 ? (

        <div className="empty-state">

          <div>🔔</div>

          <h3>No reminders</h3>

          <p>
            Add a reminder while creating a task.
          </p>

        </div>

      ) : (

        <div className="simple-list">

          {todos.map((todo) => (

            <div
              className="simple-task"
              key={todo.id}
            >

              <span>🔔</span>

              <div>

                <h3>{todo.text}</h3>

                <p>
                  Reminder:{" "}
                  {new Date(
                    todo.reminder
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Reminders;