import { useState } from "react";

function Settings() {

  const [darkMode, setDarkMode] =
    useState(false);

  const clearTasks = () => {

    localStorage.removeItem("todos");

    alert("All tasks deleted!");

  };


  return (

    <div>

      <div className="page-title">

        <div>
          <h1>Settings ⚙</h1>
          <p>Manage your application.</p>
        </div>

      </div>


      <div className="settings-card">

        <div className="setting-row">

          <div>
            <h3>Dark Mode</h3>
            <p>
              Change the appearance of the app.
            </p>
          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) =>
              setDarkMode(e.target.checked)
            }
          />

        </div>


        <div className="setting-row">

          <div>
            <h3>Delete All Tasks</h3>
            <p>
              Permanently remove all saved tasks.
            </p>
          </div>

          <button
            className="danger-btn"
            onClick={clearTasks}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );
}

export default Settings;