import { useLocation } from "react-router-dom";
import { useUsers } from "../Context/UsersContext";
import { Form, Formik } from "formik";

function NewPassword(){
    const {handleNewPassword} = useUsers();
    const location = useLocation();
    const token = location.search.split("=")[1];
    return(
        <div className="bg-white w-full h-full flex justify-center items-center relative">
            <div className="w-auto rounded-lg shadow-login min-h-[400px] background-task h-auto p-10 pt-14 flex flex-col justify-center items-center radius">
                <Formik
                    initialValues={{
                        token: token,
                        newPassword: ""
                    }}

                    onSubmit={async(values, actions) => {
                        handleNewPassword(values);
                        actions.resetForm();
                    }}
                >
                    {({handleSubmit,handleChange, values})=> (
                        <Form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                            <h2 className="font-bold text-[#fff] text-lg mb-4 underline tracking-wide">Login</h2>
                            <div className="w-full h-full flex flex-col justify-center">
                                <div className="w-full h-full flex flex-col mb-5">
                                    <label className="text-left text-[#fff] font-semibold text-lg">Username</label>
                                    <input type="password" className="radius bg-white focus:text-[#a0f] text-[#a0f] focus:bg-slate-300 outline-none p-2 font-medium" onChange={handleChange} name="newPassword" value={values.newPassword} />
                                </div>

                                <div className="w-full h-full flex justify-center mb-5">
                                    <button className="btn outline-none border-none transition-all w-[100px] tracking-wide shadow-button__login hover:bg-[#a0f] hover:text-[#fff] bg-[#fff] text-[#a0f]" type="submit">save</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export {NewPassword};