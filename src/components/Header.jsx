function Header() {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="header">

      <div>
        <h1>Welcome back, Akshita 👋</h1>
        <p>Let's organize your tasks for today.</p>
      </div>

      <div className="header-date">
        <span>📅</span>
        <div>
          <strong>{date}</strong>
          <small>Stay productive!</small>
        </div>
      </div>

    </header>
  );
}

export default Header;