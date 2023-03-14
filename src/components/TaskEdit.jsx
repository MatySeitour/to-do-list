import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { useTasks } from "../Context/TasksContext";
import { useEffect, useState } from "react";
import "../styles.css"


function TaskEdit({taskIdEdit, setTaskIdEdit}){
    const {taskEditData, handleEdit, messageTitleError, setMessageTitleError} = useTasks();
    const [newEditTask, setNewEditTask] = useState({
        title: taskEditData.title,
        description: taskEditData.description,
    })



    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex justify-center items-center">
            <div className="relative min-w-[300px] max-w-[300px] h-[500px] background-task m-4 rounded-xl p-2 flex flex-col justify-center items-center pt-2 custom-scroll shadow-2xl break-words">
                <span onClick={() => {
                    setTaskIdEdit(0)
                    setMessageTitleError(false)
                }}  className="absolute right-4 top-4 cursor-pointer"><FontAwesomeIcon className="hover:scale-125 text-white transition-all text-3xl" icon={faArrowLeft} /></span>
                <div className="w-full min-h-[400px] p-10 flex flex-col items-start">
                    <h3 className="text-white -translate-y-3 font-bold tracking-wide pt-5 text-center w-full mb-4 text-lg">EDIT TASK</h3>
                    <div className="w-full h-full flex flex-col">
                        <label className="text-white font-semibold text-lg tracking-wide">title</label>
                        <input className="bg-white rounded-md outline-none p-2 text-[#a0f] focus:bg-slate-300 placeholder:text-[#a0f]" type="text"  name="title" placeholder={`write a new title`} value={`${newEditTask.title}`} onChange={(e) => {
                            setNewEditTask({
                                title: e.target.value,
                                description: newEditTask.description
                                })
                            }}
                        />
                        <span className="text-red-600 text-sm translate-x-1">{messageTitleError ? "This task must have title." : ""}</span>
                    </div>

                    <div className="w-full h-full flex flex-col">
                        <label className="text-white font-semibold text-lg tracking-wide">description</label>
                        <textarea className="resize-none custom-scroll bg-white rounded-md outline-none p-2 text-[#a0f] focus:bg-slate-300 placeholder:text-[#a0f]" type="text" name="description" value={`${newEditTask.description}`} placeholder={`write a new description`}  onChange={(e) => {
                            setNewEditTask({
                                title: newEditTask.title,
                                description: e.target.value,
                                })
                            }} 
                        />
                    </div>

                    <div className="w-full flex justify-center translate-y-4">
                        <button className="btn w-28 bg-white outline-none border-none text-[#a0f] hover:bg-white shadow-button__editTask" onClick={() => {
                            handleEdit(taskEditData.id, newEditTask)
                            }}>save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {TaskEdit}