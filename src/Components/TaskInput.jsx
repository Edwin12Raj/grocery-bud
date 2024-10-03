// src/components/TaskInput.js
import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue(''); // Clear the input field
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter grocery item..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleAddTask}>Add Item</button>
    </div>
  );
};

export default TaskInput;
