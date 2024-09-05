import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (task: any) => {
    const response = await axios.post(API_URL, task);
    return response.data;
};

export const updateTask = async (task: any) => {
    const response = await axios.put(`${API_URL}/${task.taskId}`, task);
    return response.data;
};
  
export const deleteTask = async (taskId: string) => {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
};
