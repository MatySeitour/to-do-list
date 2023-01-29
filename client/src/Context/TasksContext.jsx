import { useState, useEffect, createContext, useContext } from "react";
import { getTasksRequest } from "../api/tasks.api";
import { deleteTaskRequest } from "../api/tasks.api";
import { createTaskRequest } from "../api/tasks.api";

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
            console.log(response)
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
        <TasksContext.Provider value={{tasks, loadTasks, handleDelete, handleCreate}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContext;