import React, { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const userName = "jacksons";
  const URL = `https://playground.4geeks.com/todo/`;

  useEffect(() => {
    createUser();
  }, []);

  const createUser = async () => {
    try {
      const response = await fetch(URL + userName, { method: "PUT" });

      if (!response.ok) {
        if (response.status === 400) {
          console.log("User already exists");
        } else {
          throw new Error("Failed to create user");
        }
      }

      getTodos();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(URL + userName, { method: "GET" });
      if (!response.ok) throw new Error("Failed to fetch todos");

      const data = await response.json();
      setTasks(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;

    const newTask = { label: input, done: false };
    const updatedTasks = [...tasks, newTask];

    try {
      const response = await fetch(URL + userName, {
        method: "POST",
        body: JSON.stringify(updatedTasks),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error updating tasks");
      setTasks(updatedTasks);
      setInput("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskLabel) => {
    const updatedTasks = tasks.filter((task) => task.label !== taskLabel);

    try {
      const response = await fetch(URL + userName, {
        method: "DELETE",
        body: JSON.stringify(updatedTasks),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error deleting task");
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app p-4 mx-auto">
      <h1 className="mb-4">To-Do List</h1>
      <Input input={input} setInput={setInput} addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

const Input = ({ input, setInput, addTask }) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
        className="border p-2 flex"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add
      </button>
    </div>
  );
};

const TaskList = ({ tasks, deleteTask }) => {
  return tasks.length === 0 ? (
    <p className="text-gray-500">None</p>
  ) : (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.label} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

const TaskItem = ({ task, deleteTask }) => {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-2">
      <span>{task.label}</span>
      <button onClick={() => deleteTask(task.label)} className="ms-3">
        Delete
      </button>
    </li>
  );
};

export default Home;