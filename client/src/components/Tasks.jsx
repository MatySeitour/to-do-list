import { useState, useEffect, useContext } from "react";
import { TaskEdit } from "./TaskEdit";
import { useTasks } from "../Context/TasksContext";
import { NewTask } from "./NewTask";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import "../styles.css"

function Tasks(){
    const {tasks, loadTasks, handleDelete, newTaskState ,setNewTaskState, handleGetTask, taskIdEdit ,setTaskIdEdit} = useTasks();

    useEffect(() =>{
        loadTasks();
    }, [])


    return(
        <main className="relative w-full h-full flex justify-center items-center p-4 bg-white">
            <div className="w-full h-full rounded-lg background-main overflow-hidden shadow-xl overflow-y-scroll custom-scroll">
                <h1 className="text-white text-center mt-5 mb-5 text-2xl tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] to-[#a0f]">WELCOME TO THE TO DO LIST!</h1>
                <div className="w-full flex h-auto justify-center">
                    <button onClick={() => setNewTaskState(prevState => !prevState)} className="bg-white shadow-lg hover:animate-wiggle hover:bg-[#a0f] hover:text-white transition-all p-2 rounded-md font-extrabold text-[#a0f]">CREATE A NEW TASK!</button>
                </div>
                {newTaskState ? 
                    <>
                        <div className="fixed top-[50%] left-[50%] overflow-hidden -translate-x-[50%] -translate-y-[50%] min-w-[auto] h-3/4 z-20 bg-white rounded-lg">
                            <div className="absolute w-32 h-32 -bottom-10 -left-10 bg-[#a0f] rounded-full"></div>
                            <div className="absolute w-32 h-32 -top-10 -right-10 bg-[#00f] rounded-full -z-10"></div>
                            <div className="w-full h-full">
                                <NewTask newTaskState={newTaskState}/>
                            </div>
                        </div>
                    </> 
            
                    : 
                        
                    <div></div>
                }
                    
                <ul className="w-full flex justify-center items-center flex-wrap pt-4">
                    {tasks.length === 0 ? <h2 className="text-white font-bold tracking-wider">NOT TASK CREATED YET...</h2> : <div></div>}
                    {tasks.map((task) => (
                        <li className="relative min-w-[300px] max-w-[300px] h-[200px] background-task m-4 rounded-xl flex flex-col items-center pt-3 custom-scroll shadow-2xl break-words" key={task.id}>
                            <h3 className="text-white text-xl tracking-wider mb-4 font-extrabold shadow-text">{task.title}</h3>
                            <h4 className="text-white font-extrabold inline-block shadow-text">Created on <p className="inline-block shadow-text">{task.createdAt.split("T")[0]}</p></h4>
                            <div className="w-full flex justify-center items-center p-4">
                                <p className="w-full text-left text-white font-bold tracking-wider">{task.description.length > 60 ? `${task.description.slice(0, 60)}...` : task.description}</p>
                            </div>
                            <div onClick={() => handleDelete(task.id)} className="absolute w-12 h-12 background-main cursor-pointer hover:scale-110 transition-all -right-2 -top-4 rounded-full flex justify-center items-center">
                                <span className="text-white text-xl font-extrabold">X</span>
                            </div>
                            <div onClick={() => handleGetTask(task.id)} className="absolute w-12 h-12 background-task cursor-pointer hover:scale-110 transition-all -left-2 -top-4 rounded-full flex justify-center items-center">
                                <FontAwesomeIcon icon={faPenToSquare} className="text-white text-xl font-extrabold" />
                            </div>
                        </li>
                    ))}
                    {taskIdEdit ? 
                        <TaskEdit taskIdEdit={taskIdEdit} setTaskIdEdit={setTaskIdEdit} />
                        :
                        <></>
                    }
                </ul>
            </div>
        </main>
    )
}

export {Tasks}