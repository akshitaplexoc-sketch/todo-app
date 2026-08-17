import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

function Home() {

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  useEffect(() => {

    const savedTodos = JSON.parse(
      localStorage.getItem("todos")
    ) || [];

    setTodos(savedTodos);

  }, []);

  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const pending = todos.length - completed;

  const important = todos.filter(
    (todo) => todo.important
  ).length;

  return (
    <div>

      <Header />

      <div className="dashboard-grid">

        <div className="stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <p>Total Tasks</p>
            <h2>{todos.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>

          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">★</div>

          <div>
            <p>Important</p>
            <h2>{important}</h2>
          </div>
        </div>

      </div>


      <div className="dashboard-main">

        <section className="task-section">

          <div className="section-header">
            <div>
              <h2>Today's Tasks</h2>
              <p>Your latest tasks</p>
            </div>

            <button
              onClick={() => navigate("/tasks")}
              className="primary-btn"
            >
              + Add Task
            </button>
          </div>


          {todos.length === 0 ? (

            <div className="empty-state">

              <div>📝</div>

              <h3>No tasks yet</h3>

              <p>
                Start by adding your first task.
              </p>

              <button
                onClick={() => navigate("/tasks")}
                className="primary-btn"
              >
                Create Task
              </button>

            </div>

          ) : (

            <div className="home-tasks">

              {todos.slice(0, 5).map((todo) => (

                <div
                  className={`home-task ${
                    todo.completed ? "completed" : ""
                  }`}
                  key={todo.id}
                >

                  <div className="task-circle">
                    {todo.completed ? "✓" : ""}
                  </div>

                  <div className="home-task-info">

                    <h3>{todo.text}</h3>

                    <p>
                      {todo.date || "Today"}
                    </p>

                  </div>

                  {todo.important && (
                    <span className="important-star">
                      ★
                    </span>
                  )}

                </div>

              ))}

            </div>

          )}

        </section>


        <section className="progress-card">

          <h2>Task Progress</h2>

          <div className="progress-circle">

            <span>
              {todos.length
                ? Math.round(
                    (completed / todos.length) * 100
                  )
                : 0}
              %
            </span>

          </div>

          <p>
            Keep going! Complete your remaining tasks.
          </p>

          <div className="progress-info">

            <span>
              <b>{completed}</b> Completed
            </span>

            <span>
              <b>{pending}</b> Pending
            </span>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Home;