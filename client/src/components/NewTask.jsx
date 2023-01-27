import {Formik, Form} from "formik"
function NewTask(){
    return(
        <div>
            <Formik 
                initialValues={{
                    title: "",
                    description: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({handleChange}) => (
                    <Form>
                        <label>Title</label>
                        <input name="title" type="text" placeholder="Write a title" onChange={handleChange}/>
                
                        <label>Description</label>
                        <textarea name="description" rows="3" placeholder="Write a description" onChange={handleChange}></textarea>
                
                        <button>Save</button>
                    </Form>
                )}  
            </Formik>
        </div>
    )
}

export {NewTask}