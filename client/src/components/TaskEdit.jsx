import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { useTasks } from "../Context/TasksContext";
import { useEffect, useState } from "react";


function TaskEdit({taskIdEdit, setTaskIdEdit}){
    const {taskEditData, handleEdit} = useTasks();
    const [newEditTask, setNewEditTask] = useState({
        title: taskEditData.title,
        description: taskEditData.description,
    })



    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex justify-center items-center">
            <div className="relative min-w-[300px] max-w-[300px] h-[500px] background-task m-4 rounded-xl p-4 flex flex-col items-center pt-3 custom-scroll shadow-2xl break-words">
                <span className="absolute left-4 top-4 cursor-pointer"><FontAwesomeIcon className="hover:scale-125 text-white transition-all text-3xl" icon={faArrowLeft} /></span>
                <h3 className="text-white font-bold tracking-wide text-lg pt-10">Edit task</h3>
                <div className="w-full h-full flex flex-col">
                    <label>title</label>
                    <input type="text" name="title" placeholder={`${taskEditData.title}`} onChange={(e) => {
                        setNewEditTask({
                            title: e.target.value,
                            description: newEditTask.description
                            })
                        }} 
                    />
                    <label>description</label>
                    <input type="text" name="description" placeholder={`${taskEditData.description}`}  onChange={(e) => {
                        setNewEditTask({
                            title: newEditTask.title,
                            description: e.target.value,
                            })
                        }} 
                    />

                    <button className="btn w-28" onClick={() => {
                        handleEdit(taskEditData.id, newEditTask)
                        setTaskIdEdit(0);
                        }}>save</button>
                </div>
            </div>
        </div>
    )
}

export {TaskEdit}