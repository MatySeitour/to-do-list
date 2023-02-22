import axios from "axios"

export const getTasksRequest = async (tasks) => await axios.get("/api/tasks");

export const createTaskRequest = async (task) => await axios.post("/api/tasks", task);

export const deleteTaskRequest = async (taskId) => await axios.delete(`/api/tasks/${taskId}`);

export const getTaskRequest = async (taskId) => await axios.get(`/api/tasks/${taskId}`);

export const editTaskRequest = async (taskId, newTask) => await axios.put(`/api/tasks/${taskId}`, newTask);

export const toggleDoneRequest = async (taskId, doneState) => await axios.put(`/api/tasks/${taskId}`, {
    done: doneState,
});

