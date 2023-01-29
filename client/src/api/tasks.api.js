import axios from "axios"

export const getTasksRequest = async (tasks) => await axios.get("http://localhost:3000/tasks");

export const createTaskRequest = async (task) => await axios.post("http://localhost:3000/task", task);

export const deleteTaskRequest = async (taskId) => await axios.delete(`http://localhost:3000/tasks/${taskId}`);
