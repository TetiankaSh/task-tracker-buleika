import './App.css';
import React, { useState } from 'react';
import TaskBoard from './components/TaskBoard';
import './components/TaskBoard.css';

function App() {
  const [columns, setColumns] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': [],
  });

  const [task, setTask] = useState('');

  // Add a task to the 'To Do' column with a default title and description
  const addTask = () => {
    const newTask = { id: Date.now(), title: 'New Task', description: 'Task Description' };
    setColumns((prev) => ({
      ...prev,
      'To Do': [...prev['To Do'], newTask],
    }));
  };

  // Delete a task by index
  const deleteTask = (columnKey, index) => {
    if (!columns[columnKey] || !columns[columnKey][index]) {
      console.error(`Task not found in column ${columnKey} at index ${index}`);
      return;
    }
    const updatedTasks = columns[columnKey].filter((_, i) => i !== index);
    setColumns({
      ...columns,
      [columnKey]: updatedTasks,
    });
  };

  // Move a task from one column to another
  const moveTask = (fromColumn, toColumn, index) => {
    if (!columns[fromColumn] || !columns[fromColumn][index]) {
      console.error(`Task not found in column ${fromColumn} at index ${index}`);
      return;
    }
    
    const taskToMove = columns[fromColumn][index];
    deleteTask(fromColumn, index); // First delete the task from the 'from' column
    setColumns((prev) => ({
      ...prev,
      [toColumn]: [...prev[toColumn], taskToMove], // Add the task to the 'to' column
    }));
  };

  return (
    <div className="App">
      <h1>Buleika's Task Tracker</h1>

      {/* Task Input */}
      <div className="input-row">
        <div className="pencil-wrapper-square input-wrapper">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a board ID here..."
          />
        </div>

        <div className="pencil-wrapper-square button-wrapper">
          <button onClick={addTask}>Load</button>
        </div>
      </div>

      {/* Task Board: Columns */}
      <div className="task-board-container">
        <TaskBoard
          columns={columns}
          setColumns={setColumns}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      </div>
    </div>
  );
}

export default App;
