import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = (text, important, date, reminder) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      important,
      date,
      reminder,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  // Complete / Incomplete
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  // Delete
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };
  const deleteAllTodos = () => {
  setTodos([]);
  // localStorage.removeItem("todos");
  };

  // update todo
  const updateTodo = (
    id,
    text,
    important,
    date,
    reminder
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text,
              important,
              date,
              reminder,
            }
          : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        deleteAllTodos,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Custom Hook
// This context file intentionally exports both the provider component and its hook.
// eslint-disable-next-line react-refresh/only-export-components
export function useTodos() {
  return useContext(TodoContext);
}