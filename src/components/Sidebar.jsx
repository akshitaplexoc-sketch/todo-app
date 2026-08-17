import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <span>Task</span>Flow
      </div>

      <div className="profile">
        <div className="profile-avatar">A</div>

        <h3>Akshu</h3>
        <p>Student</p>
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/" className="menu-item">
          🏠 <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tasks" className="menu-item">
          ✓ <span>My Tasks</span>
        </NavLink>

        <NavLink to="/important" className="menu-item">
          ★ <span>Important</span>
        </NavLink>

        <NavLink to="/calendar" className="menu-item">
          📅 <span>Calendar</span>
        </NavLink>

        <NavLink to="/reminders" className="menu-item">
          🔔 <span>Reminders</span>
        </NavLink>

        <NavLink to="/settings" className="menu-item">
          ⚙ <span>Settings</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">
        <button className="logout-btn">
          ⇥ Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;