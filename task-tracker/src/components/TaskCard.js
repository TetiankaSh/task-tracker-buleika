import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './TaskCard.css';

const TaskCard = ({ task, onDelete, onDragStart, columnKey, onMove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task?.title || '',  // Using optional chaining
    description: task?.description || '',  // Using optional chaining
  });

  if (!task) return null;

  const toggleEdit = () => {
    if (isEditing) {
      task.title = editedTask.title;
      task.description = editedTask.description;
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('fromColumn', columnKey);
      }}  
    >
      {isEditing ? (
        <>
          <input
            className="task-input"
            placeholder="Title"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            className="task-input"
            placeholder="Description"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <h3>{task?.title || 'Untitled Task'}</h3>  {/* Safe rendering of title */}
          <p>{task?.description || 'No description provided.'}</p>  {/* Safe rendering of description */}
        </>
      )}

      <div className="task-actions">
        <button className="pencil-wrapper" onClick={toggleEdit}>
          <FaEdit />
        </button>
        <button className="pencil-wrapper" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
