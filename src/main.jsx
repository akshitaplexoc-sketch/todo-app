import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { TodoProvider } from "./context/TodoContext";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/todo-app/">
    <TodoProvider>
      <App />
    </TodoProvider>
    </BrowserRouter>
  </React.StrictMode>
);