import {Formik, Form} from "formik"
import { useTasks } from "../Context/TasksContext";
import "../styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"

function NewTask(){
    const {handleCreate, newTaskState, setNewTaskState, messageTitleError} = useTasks();

    return(
        <div className="w-full h-full flex justify-center items-center relative">
            <Formik 
                initialValues={{
                    title: "",
                    description: "",
                }}
                
                onSubmit={async(values, actions) => {
                        handleCreate(values);
                        actions.resetForm();
                }}
            >
                {({handleChange, handleSubmit, values, isSubmitting}) => (
                    <Form className="w-full min-h-[400px] h-auto p-10 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setNewTaskState(prevState => !prevState)} className="absolute z-20 top-4 right-4 text-3xl font-semibold text-[#a0f] hover:scale-110 cursor-pointer" />
                        <div className="w-full h-full flex flex-col justify-center">
                        <h2 className="text-transparent bg-clip-text text-center bg-gradient-to-r from-[#00f] to-[#a0f] font-bold text-lg mb-4">CREATE NEW TASK</h2>
                            <div className="w-full h-full flex flex-col mb-5">
                                <label className="text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00f] to-[#a0f] text-lg">Title</label>
                                <input name="title" className="rounded-md bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] outline-none p-2 border border-[#a0f]" type="text" placeholder="Write a title" onChange={handleChange} value={values.title}/>
                                <span className="text-red-600 text-sm translate-x-1">{messageTitleError ? "This task must have title." : ""}</span>
                            </div>

                            <label className="text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00f] to-[#a0f] text-lg">Description</label>
                            <textarea className="rounded-md resize-none custom-scroll bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] mb-5 outline-none border p-2 border-[#a0f]" name="description" rows="3" placeholder="Write a description" onChange={handleChange} value={values.description}></textarea>

                            <div className="w-full h-full flex justify-center">
                                <button className={isSubmitting ? "btn loading outline-none border-none transition-all p-4 shadow-button__newTask bg-gradient-to-tr from-[#00f] to-[#a0f] text-white" : "btn outline-none border-none transition-all w-[100px] tracking-wide shadow-button__newTask bg-gradient-to-tr from-[#00f] to-[#a0f] text-white"} type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving" : "Save"}</button>
                            </div>
                        </div>
                    </Form>
                )}  
            </Formik>
        </div>
    )
}

export {NewTask}