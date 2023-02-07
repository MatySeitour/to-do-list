import { useState, createContext, useContext, useEffect } from "react";
import { getTasksRequest, createTaskRequest, deleteTaskRequest, getTaskRequest, editTaskRequest  } from "../api/tasks.api";

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
    const [taskIdEdit, setTaskIdEdit] = useState(0);
    const [taskEditData, setTaskEditData] = useState([]);
    
    
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

    const handleGetTask = async (taskId) => {
        try{
            const {data} = await getTaskRequest(taskId);
            setTaskIdEdit(taskId);
            setTaskEditData(data);
        }
        catch(error){
            console.error(error)
        }
    }

    const handleEdit = async(taskId, newTask) => {
        try{
            const {data} = await editTaskRequest(taskId, newTask);
            loadTasks();
            console.log(data);
        }
        catch(error){
            console.error(error)
        } 
    }
    
    async function loadTasks(){
        const {data} = await getTasksRequest();
        setTasks(data);
    }

    useEffect(() => {
        console.log(taskEditData)
    }, [taskEditData]);

    return (
        <TasksContext.Provider value={{tasks, loadTasks, handleDelete, handleCreate, newTaskState, setNewTaskState, messageTitleError, setMessageTitleError, handleGetTask, taskIdEdit, setTaskIdEdit, taskEditData, setTaskEditData, handleEdit}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContext;