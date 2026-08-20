import { useEffect, useMemo, useRef, useState } from "react";

function parseDate(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function formatDate(date) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function displayDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-");

  return `${day}-${month}-${year}`;
}

function isSameDate(date1, date2) {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isBefore(date1, date2) {
  if (!date1 || !date2) return false;

  const first = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );

  const second = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  return first < second;
}

function DatePicker({
  label = "Task Date",
  value,
  onChange,
  maxDate,
  minDate,
  placeholder = "Select date"
}) {
  const [open, setOpen] = useState(false);

  const [viewDate, setViewDate] = useState(
    () => parseDate(value) || new Date()
  );

  const pickerRef = useRef(null);

  const selectedDate = useMemo(
    () => parseDate(value),
    [value]
  );

  const maximumDate = useMemo(
    () => parseDate(maxDate),
    [maxDate]
  );

  const minimumDate = useMemo(
    () => parseDate(minDate),
    [minDate]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthName = viewDate.toLocaleString(
    "default",
    {
      month: "long"
    }
  );

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

  const previousMonth = () => {
    setViewDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setViewDate(
      new Date(year, month + 1, 1)
    );
  };

  const handleOpen = () => {
    setOpen(true);

    if (selectedDate) {
      setViewDate(selectedDate);
    }
  };

  const handleSelectDate = (day) => {
    const date = new Date(
      year,
      month,
      day
    );

    if (
      minimumDate &&
      isBefore(date, minimumDate)
    ) {
      return;
    }

    if (
      maximumDate &&
      isBefore(maximumDate, date)
    ) {
      return;
    }

    onChange(formatDate(date));
    setOpen(false);
  };

  const handleToday = () => {
    const today = new Date();

    if (
      minimumDate &&
      isBefore(today, minimumDate)
    ) {
      return;
    }

    if (
      maximumDate &&
      isBefore(maximumDate, today)
    ) {
      return;
    }

    onChange(formatDate(today));
    setViewDate(today);
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setOpen(false);
  };

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(
      <div
        className="custom-calendar-day empty"
        key={`empty-${i}`}
      />
    );
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    const date = new Date(
      year,
      month,
      day
    );


    const disabled =
      (minimumDate &&
        isBefore(date, minimumDate)) ||
      (maximumDate &&
        isBefore(maximumDate, date));

    const selected =
      selectedDate &&
      isSameDate(date, selectedDate);

    const today = isSameDate(
      date,
      new Date()
    );

    cells.push(
      <button
        type="button"
        key={day}
        className={`custom-calendar-day ${
          selected ? "selected" : ""
        } ${today ? "today" : ""} ${
          disabled ? "disabled" : ""
        }`}
        disabled={disabled}
        onClick={() =>
          handleSelectDate(day)
        }
      >
        {day}
      </button>
    );
  }

  return (
    <div
      className="date-picker-wrapper"
      ref={pickerRef}
    >
      <label>{label}</label>

      <button
        type="button"
        className="date-input"
        onClick={handleOpen}
      >
        <span
          className={
            value
              ? "date-value"
              : "date-placeholder"
          }
        >
          {value
            ? displayDate(value)
            : placeholder}
        </span>

        <span className="date-icon">
          📅
        </span>
      </button>

      {open && (
        <div className="custom-calendar">
          <div className="custom-calendar-header">
            <button
              type="button"
              onClick={previousMonth}
              className="calendar-nav-btn"
            >
              ←
            </button>

            <h3>
              {monthName} {year}
            </h3>

            <button
              type="button"
              onClick={nextMonth}
              className="calendar-nav-btn"
            >
              →
            </button>
          </div>

          <div className="custom-weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="custom-calendar-grid">
            {cells}
          </div>

          <div className="calendar-footer">
            <button
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleToday}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;