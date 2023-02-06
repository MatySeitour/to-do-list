import { useState, createContext, useContext } from "react";
import { getTasksRequest, createTaskRequest, deleteTaskRequest, getTaskRequest  } from "../api/tasks.api";

const TasksContext = createContext({});

export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context){
        throw new Error("the useTask must be used inside the TasksContextProvider")
    }
    return context;
}

export function TasksContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [newTaskState, setNewTaskState] = useState(false);
    const [messageTitleError, setMessageTitleError] = useState(false);
    const [taskEditState, setTaskEditState] = useState(false);
    
    
    const handleDelete = async (id) => {
        try{
            const response = await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task.id !== id));
            console.log(response);
        }
        catch(error){
            console.error(error)
        }
    }

    const handleCreate = async (task) => {
        try{
            const response = await createTaskRequest(task);
            loadTasks();
            setNewTaskState(false);
            setMessageTitleError(false);
        }
        catch(error){
            setMessageTitleError(true);
            console.error(error)
        }
    }

    const handleEdit = async (taskId) => {
        try{
            const response = await getTaskRequest(taskId);
            setTaskEditState(true);
            console.log(response);
        }
        catch(error){
            console.error(error)
        }
    }
    
    async function loadTasks(){
        const {data} = await getTasksRequest();
        setTasks(data);
    }

    return (
        <TasksContext.Provider value={{tasks, loadTasks, handleDelete, handleCreate, newTaskState, setNewTaskState, messageTitleError, setMessageTitleError, handleEdit, taskEditState, setTaskEditState}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContext;