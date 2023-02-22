import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../Context/UsersContext";
import "../styles.css"

function Login(){
    const {handleLogin, loginMessageError} = useUsers();

    return(
            <div className="background-main w-full h-full flex justify-center items-center relative">
                <div className="w-auto min-h-[400px] background-task h-auto p-10 pt-14 flex flex-col justify-center items-center radius">
                <Formik 
                    initialValues={{
                        username: "",
                        password: "",
                    }}

                    onSubmit={async(values, actions) => {
                        handleLogin(values);
                        actions.resetForm();
                    }}
                >
                    {({handleSubmit, handleChange, values}) => (
                        <Form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                            <h2 className="font-bold text-[#fff] text-lg mb-4 underline tracking-wide">Login</h2>
                            <div className="w-full h-full flex flex-col justify-center">
                                <div className="w-full h-full flex flex-col mb-5">
                                    <label className="text-left text-[#fff] font-semibold text-lg">Username</label>
                                    <input type="text" className="radius bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] outline-none p-2 font-medium" onChange={handleChange} name="username" value={values.username} />
                                </div>

                                <div className="w-full h-full flex flex-col mb-5">
                                    <label className="text-left  text-[#fff] font-semibold text-lg">Password</label>
                                    <input type="password" className="radius bg-white focus:placeholder:text-white text-[#a0f] focus:text-white focus:bg-gradient-to-tr from-[#00f] to-[#a0f] outline-none p-2" onChange={handleChange} name="password" value={values.password} />
                                    {loginMessageError ? <span className="pl-1 translate-y-2 text-red-600 font-medium">user or password are incorrect!</span> : <></>}
                                </div>


                                <div className="w-full h-full flex justify-center mb-5">
                                    <button className="btn outline-none border-none transition-all w-[100px] tracking-wide shadow-button__login hover:bg-[#a0f] hover:text-[#fff] bg-[#fff] text-[#a0f]" type="submit">save</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="w-full">
                    <Link className="text-[#fff] underline font-semibold" to={"/register"}>Register</Link>
                </div>
                </div>
            </div>
        )
}

export {Login};