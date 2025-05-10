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
          onDragStart={(e) => {
            e.dataTransfer.setData('taskId', task.id);
            e.dataTransfer.setData('fromColumn', columnKey);
          }}  
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
    const taskId = Number(e.dataTransfer.getData('taskId'));
    const fromColumn = e.dataTransfer.getData('fromColumn');
  
    if (!taskId || !fromColumn || fromColumn === toColumn) return;
  
    handleMove(taskId, fromColumn, toColumn);
  };
  
  const handleMove = (taskId, fromColumn, toColumn) => {
    if (!columns[fromColumn] || !columns[toColumn]) {
      console.error('Invalid fromColumn or toColumn:', fromColumn, toColumn);
      return;
    }
  
    const taskToMove = columns[fromColumn].find(task => task.id === taskId);
    if (!taskToMove) return;
  
    const updatedFrom = columns[fromColumn].filter(task => task.id !== taskId);
    const updatedTo = [...columns[toColumn], taskToMove];
  
    setColumns({
      ...columns,
      [fromColumn]: updatedFrom,
      [toColumn]: updatedTo,
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
