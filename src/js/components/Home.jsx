import React, { useState } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]); 
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <Input input={input} setInput={setInput} addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

const Input = ({ input, setInput, addTask }) => {
  const enterPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={enterPress}
        placeholder="Add a task..."
        aria-label="Task input"
        className="border rounded p-2 flex-grow"
      />
      <button
        onClick={addTask}
        aria-label="Add task"
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add
      </button>
    </div>
  );
};

const TaskList = ({ tasks, deleteTask }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks</p>;
  }

  return (
    <ul className="list-none space-y-2">
      {tasks.map(({ id, text }) => (
        <TaskItem key={id} id={id} text={text} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

const TaskItem = ({ id, text, deleteTask }) => {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-2">
      <span>{text}</span>
      <button
        onClick={() => deleteTask(id)}
        aria-label="Delete task"
        className="text-red-500"
      >
        Delete
      </button>
    </li>
  );
};

export default Home;