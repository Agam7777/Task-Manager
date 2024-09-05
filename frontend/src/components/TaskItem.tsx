import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './TaskItem.css';

interface Task {
  taskId: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  comments: string;
}

const TaskItem: React.FC<{ task: Task; onDelete: (taskId: string) => void; onEdit: (task: Task) => void }> = ({ task, onDelete, onEdit }) => {
  return (
    <div className={`task-item ${task.status.toLowerCase().replace(' ', '-')}`}>
      <h3>{task.title}</h3>
      <div className="task-detail">
        <span className="task-label">Description:</span>
        <span className="task-content">{task.description}</span>
      </div>
      <div className="task-detail">
        <span className="task-label">Status:</span>
        <span className="task-content">{task.status}</span>
      </div>
      <div className="task-detail">
        <span className="task-label">Due Date:</span>
        <span className="task-content">{task.dueDate}</span>
      </div>
      <div className="task-detail">
        <span className="task-label">Comments:</span>
        <span className="task-content">{task.comments}</span>
      </div>

      <div className="task-actions">
        <button className="edit-button" onClick={() => onEdit(task)}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button className="delete-button" onClick={() => onDelete(task.taskId)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
