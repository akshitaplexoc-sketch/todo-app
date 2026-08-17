import Calendar from "../components/Calendar";

function CalendarPage() {

  return (

    <div>

      <div className="page-title">

        <div>
          <h1>Calendar 📅</h1>
          <p>View your tasks by date.</p>
        </div>

      </div>

      <Calendar />

    </div>

  );
}

export default CalendarPage;