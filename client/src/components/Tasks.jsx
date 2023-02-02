import { useState, useEffect, useContext } from "react";
import { useTasks } from "../Context/TasksContext";
import { NewTask } from "./NewTask";
import "../styles.css"

function Tasks(){
    const [newTaskState, setNewTaskState] = useState(false);
    const {tasks, loadTasks, handleDelete} = useTasks();

    useEffect(() =>{
        loadTasks();
    }, [])


    return(
        <main className="relative w-full h-full flex justify-center items-center p-4">
            <div className="w-full h-full rounded-lg background-main  shadow-xl">
                <h1 className="text-white text-center mt-5 mb-5 text-2xl tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] to-[#a0f]">WELCOME TO THE TO DO LIST!</h1>
                <div className="w-full flex h-auto justify-center">
                    <button onClick={() => setNewTaskState(prevState => !prevState)} className="bg-white shadow-lg hover:animate-wiggle hover:bg-[#a0f] hover:text-white transition-all p-2 rounded-md font-extrabold text-[#a0f]">CREATE A NEW TASK!</button>
                </div>
                {newTaskState ? 
                    <>
                        <div className="fixed top-[50%] left-[50%] overflow-hidden -translate-x-[50%] -translate-y-[50%] w-1/2 min-w-[300px] h-3/4 z-20 bg-white rounded-lg">
                            <div className="absolute w-40 h-40 -bottom-5 -left-6 bg-[#a0f] rounded-full"></div>
                            <div className="absolute w-40 h-40 -top-5 -right-6 bg-[#00f] rounded-full -z-10"></div>
                            <NewTask newTaskState={newTaskState}/>
                        </div>
                    </> 
            
                    : 
                        
                    <div></div>
                }
                    
                <ul className="w-full h-full max-h-[500px] flex justify-center items-center flex-wrap overflow-y-scroll custom-scroll pt-4">
                    {tasks.length === 0 ? <h2 className="text-white font-bold tracking-wider">NOT TASK CREATED YET...</h2> : <div></div>}
                    {tasks.map((task) => (
                        <li className="relative w-[400px] h-[200px] background-task backdrop:backdrop-blur-sm m-4 rounded-xl flex flex-col items-center pt-3 custom-scroll shadow-2xl" key={task.id}>
                            <h3 className="text-white text-xl tracking-wider mb-4 font-extrabold shadow-text">{task.title}</h3>
                            <h4 className="text-white font-extrabold inline-block shadow-text">Created on <p className="inline-block shadow-text">{task.createdAt.split("T")[0]}</p></h4>
                            <div className="h-full w-full flex justify-center items-center p-4">
                                <p className="w-full h-full text-left text-white font-bold tracking-wider">{task.description.length > 60 ? `${task.description.slice(0, 60)}...` : task.description}</p>
                            </div>
                            <div onClick={() => handleDelete(task.id)} className="absolute w-12 h-12 background-main cursor-pointer hover:scale-110 transition-all -right-2 -top-4 rounded-full flex justify-center items-center">
                                <span className="text-white text-xl font-extrabold">X</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export {Tasks}