import axios from "axios"

export const getTasksRequest = async (tasks) => await axios.get("https://tasker-backend-production.up.railway.app/api/tasks");

export const createTaskRequest = async (task) => await axios.post("https://tasker-backend-production.up.railway.app/api/tasks", task);

export const deleteTaskRequest = async (taskId) => await axios.delete(`https://tasker-backend-production.up.railway.app/api/tasks/${taskId}`);

export const getTaskRequest = async (taskId) => await axios.get(`https://tasker-backend-production.up.railway.app/api/tasks/${taskId}`);

export const editTaskRequest = async (taskId, newTask) => await axios.put(`https://tasker-backend-production.up.railway.app/api/tasks/${taskId}`, newTask);

export const toggleDoneRequest = async (taskId, doneState) => await axios.put(`https://tasker-backend-production.up.railway.app/api/tasks/${taskId}`, {
    done: doneState,
});

