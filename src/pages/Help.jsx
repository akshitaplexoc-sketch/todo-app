import {
  HelpCircle,
  Plus,
  Bell,
  CalendarDays,
  CheckSquare,
} from "lucide-react";

function Help() {

  return (
    <div className="help-page">

      <div className="page-heading">

        <div>
          <h1>Help & Guide</h1>

          <p>
            Learn how to use TaskFlow.
          </p>
        </div>

        <HelpCircle size={30} />

      </div>

      <div className="help-grid">

        <div className="help-card">
          <Plus size={25} />

          <h3>Add Task</h3>

          <p>
            Enter your task and optionally
            select a reminder date and time.
          </p>
        </div>

        <div className="help-card">
          <CheckSquare size={25} />

          <h3>Complete Task</h3>

          <p>
            Click the circle beside a task
            to mark it completed.
          </p>
        </div>

        <div className="help-card">
          <Bell size={25} />

          <h3>Reminders</h3>

          <p>
            Add a date and time to receive
            a browser reminder.
          </p>
        </div>

        <div className="help-card">
          <CalendarDays size={25} />

          <h3>Calendar</h3>

          <p>
            Open Calendar to see tasks
            scheduled for each day.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Help;