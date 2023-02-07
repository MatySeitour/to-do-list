import axios from "axios"

export const getTasksRequest = async (tasks) => await axios.get("http://localhost:3000/tasks");

export const createTaskRequest = async (task) => await axios.post("http://localhost:3000/tasks", task);

export const deleteTaskRequest = async (taskId) => await axios.delete(`http://localhost:3000/tasks/${taskId}`);

export const getTaskRequest = async (taskId) => await axios.get(`http://localhost:3000/tasks/${taskId}`);

export const editTaskRequest = async (taskId, newTask) => await axios.put(`http://localhost:3000/tasks/${taskId}`, newTask);

export const toggleDoneRequest = async (taskId, doneState) => await axios.put(`http://localhost:3000/tasks/${taskId}`, {
    done: doneState,
});

