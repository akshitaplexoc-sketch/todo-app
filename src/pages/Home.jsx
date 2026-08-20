import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTodos } from "../context/TodoContext";

function Home() {
  const navigate = useNavigate();
  const { todos } = useTodos();

  // ================= TASK COUNTS =================

  const total = todos.length;

  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const pending = todos.filter(
    (todo) => !todo.completed
  ).length;

  const important = todos.filter(
    (todo) => todo.important
  ).length;

  // ================= PERCENTAGES =================

  const completedPercentage =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;


  return (
    <div className="home-page">

      <Header />

      {/* ================= STAT CARDS ================= */}

      <div className="dashboard-grid">

        {/* TOTAL */}

        <div
          className="stat-card clickable-card"
          onClick={() => navigate("/tasks")}
        >
          <div className="stat-icon">✓</div>

          <div>
            <p>Total Tasks</p>
            <h2>{total}</h2>
          </div>
        </div>


        {/* PENDING */}

        <div
          className="stat-card clickable-card"
          onClick={() =>
            navigate("/tasks?filter=pending")
          }
        >
          <div className="stat-icon">⏳</div>

          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>
        </div>


        {/* COMPLETED */}

        <div
          className="stat-card clickable-card"
          onClick={() =>
            navigate("/tasks?filter=completed")
          }
        >
          <div className="stat-icon">✓</div>

          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
          </div>
        </div>


        {/* IMPORTANT */}

        <div
          className="stat-card clickable-card"
          onClick={() => navigate("/important")}
        >
          <div className="stat-icon">★</div>

          <div>
            <p>Important</p>
            <h2>{important}</h2>
          </div>
        </div>

      </div>


      {/* ================= MAIN DASHBOARD ================= */}

      <div className="dashboard-main">


        {/* ================= TODAY'S TASKS ================= */}

        <section className="task-section">

          <div className="section-header">

            <div>
              <h2>Today's Tasks</h2>

              <p>
                Your latest tasks
              </p>
            </div>

            <button
              onClick={() => navigate("/tasks")}
              className="primary-btn"
            >
              + Add Task
            </button>

          </div>


          {/* NO TASKS */}

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

            /* TASK LIST */

            <div className="home-tasks">

              {todos.slice(0, 5).map((todo) => (

                <div
                  className={`home-task ${
                    todo.completed
                      ? "completed"
                      : ""
                  }`}
                  key={todo.id}
                >

                  {/* Task Information */}

                 <div className="home-task-info">

                  <h3>{todo.text}</h3>

                  {todo.date && (
                    <p className="home-task-date">
                      📅 {todo.date}
                    </p>
                  )}

                </div>

                  {/* IMPORTANT */}

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


        {/* ================= TASK PROGRESS ================= */}

        <section className="progress-card">

          <h2>Task Progress</h2>


          {/* DONUT */}

          <div
            className={`progress-donut ${
              total === 0
                ? "empty-progress"
                : ""
            }`}
            style={{
              "--progress":
                `${completedPercentage * 3.6}deg`,
            }}
          >

            <div className="donut-inner">

              <strong>
                {completedPercentage}%
              </strong>

              <span>
                Completed
              </span>

            </div>

          </div>


          {/* MESSAGE */}

          <p className="progress-message">

            {total === 0
              ? "No tasks yet."
              : completed === total
              ? "All tasks completed! 🎉"
              : "Keep going! Complete your remaining tasks."
            }

          </p>


          {/* PROGRESS DETAILS */}

          <div className="progress-info">


            {/* COMPLETED */}

            <div className="progress-stat">

              <span className="progress-dot completed-dot" />

              <div>

                <strong>
                  {completed}
                </strong>

                <small>
                  Completed
                </small>

              </div>

            </div>


            {/* PENDING */}

            <div className="progress-stat">

              <span className="progress-dot pending-dot" />

              <div>

                <strong>
                  {pending}
                </strong>

                <small>
                  Pending
                </small>

              </div>

            </div>


          </div>

        </section>

      </div>

    </div>
  );
}

export default Home;