import React from 'react';
import TaskCard from './TaskCard';

// TaskColumn.js
const TaskColumn = ({ columnKey, title, tasks, onDrop, onDragStart, onDelete, onMove }) => {
    const handleDragOver = (e) => {
      e.preventDefault();  // This allows the drop to occur
    };
  
    return (
      <div
        className="task-column"
        onDrop={(e) => onDrop(e, columnKey)}  // Handle the drop event
        onDragOver={handleDragOver}  // Enable dragging over this column
      >
        <h3>{title}</h3>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onMove={onMove}
            columnKey={columnKey}
            onDragStart={onDragStart}  // Pass handleDragStart as prop
          />
        ))}
      </div>
    );
  };
  

export default TaskColumn;
