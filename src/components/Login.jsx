import { Formik, Form } from "formik";
import { Link, useSearchParams } from "react-router-dom";
import { useUsers } from "../Context/UsersContext";
import "../styles.css"

function Login(){
    const {handleLogin, loginMessageError} = useUsers();

    return(
            <div className="background-login w-full h-full flex justify-center items-center relative">
                <div className="w-auto rounded-lg shadow-login min-h-[400px] background-task h-auto p-10 pt-14 flex flex-col justify-center items-center radius">
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
                                <h2 className="font-bold text-[#fff] text-xl mb-4 tracking-wider">LOGIN</h2>
                                <div className="w-full h-full flex flex-col justify-center">
                                    <div className="w-full h-full flex flex-col mb-5">
                                        <label className="text-left text-[#fff] font-semibold text-lg">Username</label>
                                        <input type="text" className="rounded-md radius bg-white focus:text-[#a0f] text-[#a0f] focus:bg-slate-300 outline-none p-2 font-medium" onChange={handleChange} name="username" value={values.username} />
                                    </div>

                                    <div className="w-full h-full flex flex-col mb-5">
                                        <label className="text-left line-before__label relative text-[#fff] font-semibold text-lg">Password</label>
                                        <input type="password" className="rounded-md border outline-none bg-white focus:text-[#a0f] text-[#a0f] focus:bg-slate-300 p-2" onChange={handleChange} name="password" value={values.password} />
                                        {loginMessageError ? <span className="pl-1 text-red-600 font-medium">user or password are incorrect!</span> : <></>}
                                        <div className="w-full">
                                            <Link className="line-before relative text-[#fff] font-semibold" to={"/recovery-password"}>
                                                Do you forget your password?
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="w-full h-full flex justify-center mb-5">
                                        <button className="btn bg-white hover:bg-white text-[#a0f] outline-none border-none transition-all w-[100px] tracking-wide shadow-button__login shadow-button__editTask font-bold" type="submit">save</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="w-full">
                        <Link className="line-before relative text-[#fff] font-semibold" to={"/register"}>Register</Link>
                    </div>
                </div>
            </div>
        )
}

export {Login};