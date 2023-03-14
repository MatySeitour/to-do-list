import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles.css"

function TaskDetail({taskDetails, setTaskIdDetail, toggleDone, handleDone}){
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex justify-center items-center">
            <div className="relative min-w-[300px] max-w-[300px] min-h-[300px] max-h-[400px] h-[auto] bg-slate-200 rounded-md flex items-start flex-col pt-9">
                <span onClick={() => setTaskIdDetail(0)} className="absolute top-4 right-4"><FontAwesomeIcon className="text-2xl text-[#a0f]" icon={faXmark}/></span>
                <div className="w-full h-auto flex justify-center mb-10 rounded-md">
                    <h3 className="text-2xl text-[#a0f] font-bold">{taskDetails.title}</h3>
                </div>
                <div className="w-auto h-auto flex justify-start pl-4 mb-10 text-[#a0f] font-semibold">
                    <h4 className="bg-white rounded-md pl-2 pr-2">created on {taskDetails.createdAt.split("T")[0]}</h4>
                </div>
                <div className="w-full h-auto flex justify-start custom-scroll overflow-y-scroll pl-2 pr-2 mb-10 text-[#a0f] font-semibold">
                    <p className="h-full bg-white rounded-md pl-2 pr-2">
                        {taskDetails.description}
                    </p>
                </div>
                <div className="w-full h-auto flex justify-start pl-2 mb-10">
                    <button onClick={() => {
                        toggleDone(taskDetails.id, handleDone(taskDetails.done)) 
                        setTaskIdDetail(0)
                        }} className={taskDetails.done === 0 ? "h-auto w-auto bg-red-600 text-[#fff] font-semibold p-2 rounded-md" : "h-auto w-auto bg-green-600 text-[#fff] font-semibold p-2 rounded-md"}>{taskDetails.done === 0 ? "task not finished" : "task finished"}</button>
                </div>
            </div>
        </div>
    )
}

export {TaskDetail};