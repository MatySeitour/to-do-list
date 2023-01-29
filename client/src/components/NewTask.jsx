import {Formik, Form} from "formik"
import { createTaskRequest } from "../api/tasks.api";
import { useTasks } from "../Context/TasksContext";

function NewTask(){
    const {handleCreate} = useTasks();

    return(
        <div>
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
                    <Form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input name="title" type="text" placeholder="Write a title" onChange={handleChange} value={values.title}/>
                
                        <label>Description</label>
                        <textarea name="description" rows="3" placeholder="Write a description" onChange={handleChange} value={values.description}></textarea>
                
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </Form>
                )}  
            </Formik>
        </div>
    )
}

export {NewTask}