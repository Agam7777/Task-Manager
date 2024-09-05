import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import TaskItem from './TaskItem';
import './TaskManager.css';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<any>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null); 

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    comments: ''
  });

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };

    getTasks();
  }, []);

  const filteredTasks = tasks.filter((task: any) =>
    filter === 'All' ? true : task.status === filter
  );

  const handleCreateTask = async () => {
    const formattedDueDate = new Date(newTask.dueDate).toISOString().substring(0, 23);
    if (isEditing && editTask) {
      const updatedTask = await updateTask({ ...newTask, taskId: editTask.taskId, dueDate: formattedDueDate });
      setTasks(tasks.map(task => (task.taskId === updatedTask.taskId ? updatedTask : task)));
    } else {
      const createdTask = await createTask({ ...newTask, dueDate: formattedDueDate });
      setTasks([...tasks, createdTask]);
    }

    setShowModal(false);
    setNewTask({ title: '', description: '', dueDate: '', status: 'Pending', comments: '' });
    setIsEditing(false);
    setEditTask(null);
  };

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);
      setTasks(tasks.filter(task => task.taskId !== taskToDelete));
      setTaskToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleEditTask = (task: any) => {
    setIsEditing(true);
    setEditTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split('T')[0],
      status: task.status,
      comments: task.comments
    });
    setShowModal(true);
  };

  return (
    <div className="task-list-container">
      <h1>Task Manager</h1>
      <div className="header-actions">
        <button onClick={() => { setShowModal(true); setIsEditing(false); }} className="create-button">Create New Task</button>
        <div className="filter-buttons">
          <button onClick={() => setFilter('All')} className="filter-button">All</button>
          <button onClick={() => setFilter('Pending')} className="filter-button">Pending</button>
          <button onClick={() => setFilter('In Progress')} className="filter-button">In Progress</button>
          <button onClick={() => setFilter('Completed')} className="filter-button">Completed</button>
        </div>
      </div>
      <div>
        <h2>In Progress</h2>
        {filteredTasks
          .filter(task => task.status === 'In Progress')
          .map(task => <TaskItem key={task.taskId} task={task} onDelete={(taskId) => { setTaskToDelete(taskId); setShowDeleteModal(true); }} onEdit={handleEditTask} />)}
      </div>
      <div>
        <h2>Pending</h2>
        {filteredTasks
          .filter(task => task.status === 'Pending')
          .map(task => <TaskItem key={task.taskId} task={task} onDelete={(taskId) => { setTaskToDelete(taskId); setShowDeleteModal(true); }} onEdit={handleEditTask} />)}
      </div>
      <div>
        <h2>Completed</h2>
        {filteredTasks
          .filter(task => task.status === 'Completed')
          .map(task => <TaskItem key={task.taskId} task={task} onDelete={(taskId) => { setTaskToDelete(taskId); setShowDeleteModal(true); }} onEdit={handleEditTask} />)}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
            <div className="modal-field">
              <label className="task-label">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label className="task-label">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label className="task-label">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label className="task-label">Status</label>
              <div className="status-options">
                <button
                  className={`status-option ${newTask.status === 'Pending' ? 'active' : ''}`}
                  onClick={() => setNewTask({ ...newTask, status: 'Pending' })}
                >
                  Pending
                </button>
                <button
                  className={`status-option ${newTask.status === 'In Progress' ? 'active' : ''}`}
                  onClick={() => setNewTask({ ...newTask, status: 'In Progress' })}
                >
                  In Progress
                </button>
                <button
                  className={`status-option ${newTask.status === 'Completed' ? 'active' : ''}`}
                  onClick={() => setNewTask({ ...newTask, status: 'Completed' })}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className="modal-field">
              <label className="task-label">Comments</label>
              <textarea
                value={newTask.comments}
                onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleCreateTask}>{isEditing ? 'Update Task' : 'Create Task'}</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteTask}>Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
