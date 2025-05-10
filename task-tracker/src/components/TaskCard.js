import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './TaskCard.css';


const TaskCard = ({ task, onDelete, onDragStart, columnKey, onMove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title || '');
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSave = () => {
    // if (typeof onUpdate !== 'function') {
    //   alert('onUpdate is NOT a function!');
    //   return;
    // } else {
    //   alert('onUpdate IS a function');
    // }
    const updatedTask = {
      ...task,
      title: editedTitle || 'Untitled Task',
      description: editedDescription || 'No description provided.',
    };
  
    onUpdate(task.id, updatedTask.title, updatedTask.description);
  
    setIsEditing(false);
  };
  

  const handleCancel = () => {
    setEditedTitle(task.title || '');
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  


  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      {isEditing ? (
        <div className="edit-form">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="button-group">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-content">
            <h3>{task.title || 'Untitled Task'}</h3>
            <p>{task.description || 'No description provided.'}</p>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>
            <button onClick={() => onDelete(task.id, columnKey)}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
