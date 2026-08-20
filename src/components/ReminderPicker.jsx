import DatePicker from "./Datepicker";

function parseReminder(value) {
  if (!value) {
    return {
      date: "",
      hour: "12",
      minute: "00",
      period: "AM"
    };
  }

  const [date, time] = value.split("T");

  if (!time) {
    return {
      date: date || "",
      hour: "12",
      minute: "00",
      period: "AM"
    };
  }

  const [hour24, minute] =
    time.split(":");

  let hour = Number(hour24);

  const period =
    hour >= 12 ? "PM" : "AM";

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  return {
    date,
    hour: String(hour).padStart(2, "0"),
    minute: minute || "00",
    period
  };
}

function convertTo24Hour(
  hour,
  period
) {
  let value = Number(hour);

  if (period === "AM") {
    if (value === 12) {
      value = 0;
    }
  } else {
    if (value !== 12) {
      value += 12;
    }
  }

  return String(value).padStart(2, "0");
}

function ReminderPicker({
  value,
  onChange,
  maxDate
}) {
  const reminder = parseReminder(value);

  const updateReminder = (
    date,
    hour,
    minute,
    period
  ) => {
    if (!date) {
      onChange("");
      return;
    }

    const hour24 =
      convertTo24Hour(
        hour,
        period
      );

    onChange(
      `${date}T${hour24}:${minute}`
    );
  };

  const handleDateChange = (
    newDate
  ) => {
    updateReminder(
      newDate,
      reminder.hour,
      reminder.minute,
      reminder.period
    );
  };

  const handleHourChange = (
    event
  ) => {
    updateReminder(
      reminder.date,
      event.target.value,
      reminder.minute,
      reminder.period
    );
  };

  const handleMinuteChange = (
    event
  ) => {
    updateReminder(
      reminder.date,
      reminder.hour,
      event.target.value,
      reminder.period
    );
  };

  const handlePeriodChange = (
    event
  ) => {
    updateReminder(
      reminder.date,
      reminder.hour,
      reminder.minute,
      event.target.value
    );
  };

  const hours = Array.from(
    { length: 12 },
    (_, index) =>
      String(index + 1).padStart(
        2,
        "0"
      )
  );

  const minutes = Array.from(
    { length: 60 },
    (_, index) =>
      String(index).padStart(
        2,
        "0"
      )
  );

  return (
    <div className="reminder-picker">
      <DatePicker
        label="Reminder Date"
        value={reminder.date}
        onChange={handleDateChange}
        maxDate={maxDate}
        placeholder="Select reminder date"
      />

      <div className="reminder-time-section">
        <label>Reminder Time</label>

        <div className="time-picker-row">
          <div className="time-field">
            <span className="time-label">
              Hour
            </span>

            <div className="select-wrapper">
              <select
                value={reminder.hour}
                onChange={handleHourChange}
              >
                {hours.map(
                  (hour) => (
                    <option
                      value={hour}
                      key={hour}
                    >
                      {hour}
                    </option>
                  )
                )}
              </select>

              <span>▾</span>
            </div>
          </div>

          <div className="time-colon">
            :
          </div>

          <div className="time-field">
            <span className="time-label">
              Minute
            </span>

            <div className="select-wrapper">
              <select
                value={
                  reminder.minute
                }
                onChange={
                  handleMinuteChange
                }
              >
                {minutes.map(
                  (minute) => (
                    <option
                      value={minute}
                      key={minute}
                    >
                      {minute}
                    </option>
                  )
                )}
              </select>

              <span>▾</span>
            </div>
          </div>

          <div className="time-field period-field">
            <span className="time-label">
              AM / PM
            </span>

            <div className="select-wrapper">
              <select
                value={
                  reminder.period
                }
                onChange={
                  handlePeriodChange
                }
              >
                <option value="AM">
                  AM
                </option>

                <option value="PM">
                  PM
                </option>
              </select>

              <span>▾</span>
            </div>
          </div>

          <div className="clock-icon">
            🕐
          </div>
        </div>

        <p className="time-help">
          Set the hour, minute and AM/PM
          for your reminder.
        </p>
      </div>
    </div>
  );
}

export default ReminderPicker;