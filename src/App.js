// src/App.js
import React, { useState, useEffect } from 'react';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState(''); // For animated messages
  const [showMessage, setShowMessage] = useState(false); // To show/hide message

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to show an animated message
  const displayMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false); // Hide after 2 seconds
    }, 2000);
  };

  const addTask = (name) => {
    setTasks([...tasks, { id: Date.now(), name, completed: false }]);
    displayMessage('Item Added!'); // Display the add message
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    displayMessage('Item Deleted!'); // Display the delete message
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="App">
      <h1>Grocery Bucket List</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
      <button onClick={clearCompleted}>Clear Completed Items</button>
      
      {/* Animated message */}
      {showMessage && <div className="message animated">{message}</div>}
    </div>
  );
};

export default App;
