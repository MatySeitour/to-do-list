import { Formik, Form } from "formik";
import "../styles.css"
import { useState } from "react";
import { useUsers } from "../Context/UsersContext";
import { MailSent } from "./MailSent";

function RecoveryPassword(){
    const [inputUserType, setInputUserType] = useState(false);
    const {handleSendEmailRecovery, sendMailRecoveryMessage, sectionMailSent, setSectionMailSent, sendLoadingButton, nameEmailSent} = useUsers();

    return(
        <section className="w-full h-full background-recovery flex justify-center items-center relative p-4">
                <div className="w-auto rounded-xl min-h-[400px] background-task h-auto overflow-hidden flex items-center justify-center relative">
                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                        }}

                        onSubmit={async(values, actions) => {
                            handleSendEmailRecovery(values);
                            actions.resetForm();
                        }}
                    >
                        {({handleChange, handleSubmit, values, isSubmitting}) => (
                        <Form onSubmit={handleSubmit} className={!sectionMailSent ? "transition-all translate-x-[0px] w-auto rounded-xl min-h-[400px] h-auto p-6 pt-14 flex flex-col justify-between items-center radius" : "transition-all -translate-x-[1000px] w-auto rounded-xl min-h-[400px] h-auto p-6 pt-14 flex flex-col justify-between items-center radius invisible"}>
                            <h3 onClick={() => setSectionMailSent(prev => !prev)} className="text-white font-bold text-lg tracking-wider mb-3 text-center">WRITE YOUR USERNAME OR EMAIL</h3>
                            <div className="max-w-[500px] w-auto h-auto flex justify-center items-center">
                                <p className="text-center text-white font-medium mb-5">
                                To recover the password of your account, you must first write the name of the username to which you want to change the password or the email associated with that user.
                                </p>
                            </div>
                            <div className="bg-white btn text-[#a0f] font-bold border-none mb-5 hover:bg-[#a0f] hover:text-white" type="text" onClick={() => setInputUserType(prev => !prev)}>{!inputUserType ? "Email" : "Username"}</div>
                            {
                                inputUserType ? 
                                <>
                                    <label className="text-white mb-3 font-bold text-lg tracking-wider">EMAIL</label>
                                    <input type="email" placeholder="write your email" className="focus:animate-wiggle mb-4 placeholder:text-[#a0f] font-bold text-[#a0f] tracking-wide focus:bg-slate-300 rounded-md outline-none bg-white p-2" name="email" onChange={handleChange} value={values.email}/>
                                </>
                                :
                                <>
                                    <label className="text-white mb-3 font-bold text-lg tracking-wider">USERNAME</label>
                                    <input type="text" placeholder="write your username" className="focus:animate-wiggle border-[1px] border-red-500 mb-4 placeholder:text-[#a0f] text-[#a0f] font-bold tracking-wide focus:bg-slate-300 rounded-md outline-none bg-white p-2" name="username" onChange={handleChange} value={values.username}/>
                                </>
                            }
                            {sendMailRecoveryMessage ? <span className="pl-1 text-red-600 font-medium mb-8">Username or email does not exist</span> : <></>}
                            <div className="max-w-[500px] w-auto h-auto flex justify-center items-center mb-5">
                                <p className="text-center text-white font-medium">We will send an email to this address. What you have to do is enter the link to create a new password</p>
                            </div>
                    
                            <div className="w-full flex justify-center">
                                <button type="submit" className={sendLoadingButton ? "btn loading bg-white text-[#a0f] outline-none border-none font-bold w-[100px] shadow-button__editTask hover:bg-white tracking-wide" : "btn bg-white text-[#a0f] outline-none border-none font-bold w-[100px] shadow-button__editTask hover:bg-white tracking-wide"}>{sendLoadingButton ? "" : "SEND"}</button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                    <MailSent 
                        sectionMailSent={sectionMailSent} 
                        setSectionMailSent={setSectionMailSent}
                        nameEmailSent={nameEmailSent}
                    />
                </div>
        </section>
    )
}

export {RecoveryPassword};