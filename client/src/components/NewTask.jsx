import {Formik, Form} from "formik"
import { useTasks } from "../Context/TasksContext";

function NewTask({newTaskState, setNewTaskState}){
    const {handleCreate} = useTasks();

    return(
        <div className="w-full h-full flex justify-center items-center">
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
                    <Form className="w-full h-full min-h-[400px] p-10 flex flex-col justify-center items-center bg-slate-500" onSubmit={handleSubmit}>
                        <h2 className="text-white -translate-y-[10px] font-bold text-lg">CREATE A NEW TASK</h2>
                        <label className="">Title</label>
                        <input name="title" type="text" placeholder="Write a title" onChange={handleChange} value={values.title}/>
                
                        <label>Description</label>
                        <textarea name="description" rows="3" placeholder="Write a description" onChange={handleChange} value={values.description}></textarea>
                
                        <button className="bg-white" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </Form>
                )}  
            </Formik>
        </div>
    )
}

export {NewTask}