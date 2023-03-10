import { useState, useEffect } from "react";
import { TaskEdit } from "./TaskEdit";
import { Nav } from "./Nav";
import { useTasks } from "../Context/TasksContext";
import { NewTask } from "./NewTask";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faCheck, faXmark, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import "../styles.css"
import { useUsers } from "../Context/UsersContext";
import { TaskDetail } from "./TaskDetail";

function Tasks(){
    const {tasks, loadTasks, handleDelete, newTaskState ,setNewTaskState, handleGetTask, taskIdEdit ,setTaskIdEdit, toggleDone, handleTask, taskDetails, setTaskDetails, taskIdDetail, setTaskIdDetail} = useTasks();
  const {session, handleLogout} = useUsers();

    useEffect(() =>{
        loadTasks();
    }, [])

    const handleDone = (task) =>{
        if(task === 0){
            return true;
        }
        else{
            return false;
        }
    } 

        return(
            <>
                <Nav />
                <main className="relative w-full min-h-full h-auto flex justify-center items-start p-4 pl-5 pt-20 bg-slate-300 overflow-hidden overflow-y-scroll custom-scroll">
                {newTaskState ? <div className="w-full h-full absolute bg-black z-10 top-0 left-0 right-0 bg-opacity-70"></div> : <div></div>}
                <div className="w-full h-full min-h-[80vh] rounded-lg bg-white">
                    <h1 className="text-[#a0f] pl-2 pr-2 text-center mt-5 mb-5 text-2xl tracking-wider font-extrabold">WELCOME TO TASKSKER!</h1>
                    <div className="w-full flex h-auto justify-center">
                        <button onClick={() => setNewTaskState(prevState => !prevState)} className="background-main shadow-lg hover:animate-wiggle transition-all p-2 rounded-md font-extrabold text-[#fff]">CREATE A NEW TASK!</button>
                    </div>
                        <>
                            <div className={newTaskState ? "scale-100 transition-all fixed top-[50%] left-[50%] overflow-hidden -translate-x-[50%] -translate-y-[50%] min-w-[auto] h-[500px] z-10 bg-white rounded-lg" : "scale-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all absolute"}>
                                {newTaskState ? 
                                    <>
                                        <div className="w-full h-full">
                                                <NewTask newTaskState={newTaskState}/>
                                        </div>
                                    </>
                                    
                                    :
                                    
                                    <div></div>
                                }
                            </div>
                        </>    
                        
                    <ul className="w-full flex justify-center items-center flex-wrap pt-4">
                        {tasks.length === 0 ? <h2 className="text-[#a0f] font-bold tracking-wider">NOT TASK CREATED YET...</h2> : <div></div>}
                        {tasks.map((task) => (
                            <li className="relative min-w-[300px] max-w-[300px] h-[200px] background-task m-4 rounded-xl flex flex-col items-center pt-6 custom-scroll shadow-2xl break-words" key={task.id}>
                                <h3 className="text-white text-xl tracking-wider mb-4 font-extrabold shadow-text">{task.title.length > 20 ? `${task.title.slice(0, 17)}...` : task.title}</h3>
                                <h4 className="text-white font-extrabold inline-block shadow-text">Created on <p className="inline-block shadow-text">{task.createdAt.split("T")[0]}</p></h4>
                                <div onClick={() => handleTask(task.id)} className="w-full flex justify-center items-center p-4">
                                    <p className="w-full text-left text-white font-bold tracking-wider">{task.description.length > 60 ? `${task.description.slice(0, 60)}...` : task.description}</p>
                                </div>
                                <div onClick={() => handleDelete(task.id)} className="absolute w-12 h-12 background-main cursor-pointer hover:scale-110 transition-all -right-2 -top-4 rounded-full flex justify-center items-center">
                                    <span className="text-white text-xl font-extrabold"><FontAwesomeIcon className="text-2xl" icon={faTrashCan}/></span>
                                </div>
                                <div onClick={() => handleGetTask(task.id)} className="absolute w-12 h-12 background-task cursor-pointer hover:scale-110 transition-all -left-2 -top-4 rounded-full flex justify-center items-center">
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-white text-xl font-extrabold" />
                                </div>
                                {task.done === 0 ? 
                                    <div onClick={() => toggleDone(task.id, handleDone(task.done))} className="hover:scale-110 transition-all select-none w-10 h-10 bg-red-600 absolute rounded-md -right-2 -bottom-2 flex justify-center items-center text-white cursor-pointer"><FontAwesomeIcon className="text-2xl" icon={faXmark}/></div>
                                    :
                                    <div onClick={() => toggleDone(task.id, handleDone(task.done))} className="hover:scale-110 transition-all select-none w-10 h-10 bg-green-600 absolute -right-2 -bottom-2 rounded-md flex justify-center items-center text-white cursor-pointer"><FontAwesomeIcon className="text-2xl" icon={faCheck}/></div>
                                }
                            </li>
                        ))}
                        {taskIdEdit ? 
                            <TaskEdit taskIdEdit={taskIdEdit} setTaskIdEdit={setTaskIdEdit} />
                            :
                            <></>
                        }
                        {taskIdDetail ? 
                            <TaskDetail taskDetails={taskDetails} setTaskIdDetail={setTaskIdDetail} toggleDone={toggleDone} handleDone={handleDone}/>
                            :
                            <></>    
                        }
                    </ul>
                </div>
            </main>
            </>
        )       
}

export {Tasks}