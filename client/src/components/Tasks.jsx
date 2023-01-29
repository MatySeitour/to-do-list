import { useState, useEffect, useContext } from "react";
import { useTasks } from "../Context/TasksContext";

function Tasks(){

    const {tasks, loadTasks, handleDelete} = useTasks();

    useEffect(() =>{
        loadTasks();
    }, [])


    return(
        <main className="w-full h-full flex justify-center items-center bg-slate-500 p-4">
            <div className="w-full h-full bg-slate-900 rounded-lg">
                <h1 className="text-white text-center mt-5 mb-5 text-2xl font-bold">WELCOME TO THE TO DO LIST!</h1>

                {tasks.length === 0 ? 
                    <ul className="w-full h-full max-h-[500px] flex justify-center items-center flex-wrap overflow-y-scroll custom-scroll pt-4">
                        <h2>There aren´t any task</h2>
                    </ul>
                    :
                    
                    <ul className="w-full h-full max-h-[500px] flex justify-center items-center flex-wrap overflow-y-scroll custom-scroll pt-4">
                        {tasks.map((task) => (
                            <li className="relative w-[400px] h-[200px] background-task backdrop:backdrop-blur-sm m-4 rounded-xl flex flex-col items-center pt-3 custom-scroll" key={task.id}>
                                <h3 className="text-white text-xl font-bold tracking-wider mb-4">{task.title}</h3>
                                <h4 className="text-white">Created on {task.createdAt.split("T")[0]}</h4>
                                <div className="h-full w-full flex justify-center items-center p-4">
                                    <p className="w-full h-full text-left text-white">{task.description.length > 60 ? `${task.description.slice(0, 60)}...` : task.description}</p>
                                </div>
                                <div onClick={() => handleDelete(task.id)} className="absolute w-12 h-12 bg-black -right-2 -top-4 rounded-full flex justify-center items-center">
                                    <span className="text-orange-400 text-xl font-extrabold">X</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                }

            </div>
        </main>
    )
}

export {Tasks}