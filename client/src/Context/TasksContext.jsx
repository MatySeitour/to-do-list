import { useState, createContext, useContext, useEffect } from "react";
import { getTasksRequest, createTaskRequest, deleteTaskRequest, getTaskRequest, editTaskRequest, toggleDoneRequest  } from "../api/tasks.api";

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
    const [messageTitleError, setMessageTitleError] = useState(0);
    const [taskIdEdit, setTaskIdEdit] = useState(0);
    const [taskIdDetail, setTaskIdDetail] = useState(0);
    const [taskEditData, setTaskEditData] = useState([]);
    const [taskDetails, setTaskDetails] = useState([]);
    
    const handleDelete = async (id) => {
        try{
            const response = await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task.id !== id));
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
            setMessageTitleError(0);
        }
        catch(error){
            if(task.title.length > 20){
                console.error(error)
                return setMessageTitleError(1);
            }
            console.error(error)
            setMessageTitleError(2);
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

    const handleTask = async(taskId) =>{
        try{
            const {data} = await getTaskRequest(taskId);
            setTaskIdDetail(taskId);
            setTaskDetails(data);
        }
        catch(error){
            console.error(error);
        }
    }

    const handleEdit = async(taskId, newTask) => {
        try{
            if(newTask.title === ""){
                setMessageTitleError(true);
                throw new Error;
            }
            else{
                const {data} = await editTaskRequest(taskId, newTask);
                setMessageTitleError(false);
                loadTasks();
                setTaskIdEdit(0);
            }
        }
        catch(error){
            console.error(error)
        } 
    }

    const toggleDone = async(taskId, newDoneState) =>{
        try{
            const {data} = await toggleDoneRequest(taskId, newDoneState);
            loadTasks();
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
        <TasksContext.Provider value={{tasks, loadTasks, handleDelete, handleCreate, newTaskState, setNewTaskState, messageTitleError, setMessageTitleError, handleGetTask, taskIdEdit, setTaskIdEdit, taskEditData, setTaskEditData, handleEdit, toggleDone, handleTask, taskDetails, setTaskDetails, taskIdDetail,setTaskIdDetail}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContext;