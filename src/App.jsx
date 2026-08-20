import {  Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Important from "./pages/Important";
import CalendarPage from "./pages/CalendarPage";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import CreateTask from "./pages/CreateTask";
import "./App.css";

function App() {
  return (
    
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Todos />} />
            <Route path="/create-task"element={<CreateTask />}/>
            <Route path="/important" element={<Important />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/settings" element={<Settings />} />
            
          </Routes>
        </main>
      </div>

  );
}

export default App;