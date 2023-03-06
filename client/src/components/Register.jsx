import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useUsers } from "../Context/UsersContext";
import "../styles.css"

function Register(){
    const {handleCreateUser} = useUsers();
    return(
            <div className="background-main w-full h-full flex justify-center items-center relative">
                <div className="w-auto min-h-[400px] bg-white h-auto p-10 pt-14 flex flex-col justify-center items-center rounded-md">
                <Formik 
                    initialValues={{
                        username: "",
                        password: "",
                        email: "",
                    }}

                    onSubmit={async(values, actions) => {
                        handleCreateUser(values);
                        actions.resetForm();
                    }}
                >
                    {({handleSubmit, handleChange, values}) => (
                        <Form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f] to-[#a0f] font-bold text-lg mb-4">REGISTER</h2>
                            <div className="w-full h-full flex flex-col justify-center">
                                <div className="w-full h-full flex flex-col mb-5">
                                    <label className="text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00f] to-[#a0f] text-lg">Username</label>
                                    <input type="text" className="rounded-md bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] outline-none p-2 border border-[#a0f]" onChange={handleChange} name="username" value={values.username} />
                                </div>

                                <div className="w-full h-full flex flex-col mb-5">
                                    <label className="text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00f] to-[#a0f] text-lg">Password</label>
                                    <input type="password" className="rounded-md bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] outline-none p-2 border border-[#a0f]" onChange={handleChange} name="password" value={values.password} />
                                </div>

                                <div className="w-full h-full flex flex-col mb-5">
                                    <label className="text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00f] to-[#a0f] text-lg">Email</label>
                                    <input type="email" className="rounded-md bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] outline-none p-2 border border-[#a0f]" onChange={handleChange} name="email" value={values.email} />
                                </div>

                                <div className="w-full h-full flex justify-center mb-5">
                                    <button className="btn outline-none border-none transition-all w-[100px] tracking-wide shadow-button__newTask bg-gradient-to-tr from-[#00f] to-[#a0f] text-white" type="submit">save</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="w-full">
                    <Link className="text-[#a0f] line-before__register relative font-semibold" to={"/login"}>Do you have an account?</Link>
                </div>
                </div>
            </div>
        )
}

export {Register};