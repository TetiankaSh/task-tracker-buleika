import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({
  columnKey,
  title,
  tasks,
  onDrop,
  onDragOver,
  onDragStart,
  onDelete,
  onMove,
  onAddTask,
}) => {
  return (
    <div
      className="task-column"
      onDrop={onDrop}  // Pass the onDrop handler from TaskBoard
      onDragOver={(e) => e.preventDefault()}  // Allow drop
    >
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={() => onDelete(columnKey, index)}
          onMove={onMove}
          columnKey={columnKey}
          onDragStart={(e) => onDragStart(e, task.id)}  // Start dragging
        />
      ))}
      {columnKey === 'To Do' && (
        <button className="add-task-button" onClick={onAddTask}>
          +
        </button>
      )}
    </div>
  );
};

const TaskBoard = ({ columns, setColumns, addTask, deleteTask, moveTask }) => {
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);  // Store task ID for later use
  };

  const handleDrop = (e, toColumn) => {
    e.preventDefault();
    e.stopPropagation();
  
    const taskId = e.dataTransfer.getData('taskId');  // Get the task ID
  
    console.log("Dropping task with ID:", taskId, "into column:", toColumn);
    handleMove(taskId, toColumn);  // Move the task to the new column
  };
  
  

  const handleMove = (taskId, toColumn) => {
    const allColumns = { ...columns };
    let taskToMove;
    let fromColumn;
    let taskIndex;
  
    // Find the task and the column from which it's being moved
    for (let columnKey in allColumns) {
      taskIndex = allColumns[columnKey].findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        taskToMove = allColumns[columnKey][taskIndex];
        fromColumn = columnKey;
        break;
      }
    }
  
    // Remove the task from the original column
    const updatedFromColumn = allColumns[fromColumn].filter(
      (task) => task.id !== taskId
    );
  
    // Add the task to the new column
    const updatedToColumn = [...allColumns[toColumn], taskToMove];
  
    // Update the columns state
    setColumns({
      ...allColumns,
      [fromColumn]: updatedFromColumn,
      [toColumn]: updatedToColumn,
    });
  };
  

  return (
    <div className="task-board">
      {Object.keys(columns).map((columnKey) => (
        <TaskColumn
          key={columnKey}
          columnKey={columnKey}
          title={columnKey}
          tasks={columns[columnKey]}
          onDrop={(e) => handleDrop(e, columnKey)}  // Pass columnKey to handleDrop
          onDragOver={(e) => e.preventDefault()}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
          onMove={moveTask}
          onAddTask={addTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
