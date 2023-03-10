import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

function MailSent({sectionMailSent, setSectionMailSent, nameEmailSent}){
    const navigate = useNavigate();
    return(
        <div className={sectionMailSent ? "w-full h-full rounded-xl min-h-[400px] background-task p-10 pt-14 flex flex-col justify-between items-center absolute -right-[0] radius transition-all" : "w-full h-full rounded-xl min-h-[400px] background-task p-10 pt-14 flex flex-col justify-between items-center absolute -right-[1200px] radius"}>
                <h3 className="text-white font-bold text-lg tracking-wider mb-3 transition-all">RECOVERY PASSWORD</h3>
                <FontAwesomeIcon className="w-32 h-32 mb-3 text-white" icon={faEnvelope} />
                <p className="text-center text-white font-medium mb-5">
                    We have sent an email with the password recovery link to this address: {nameEmailSent}. enter the link in the email to create a new password.
                    
                    <br/>
                    <br/>
                    
                    <b>You have 15 minutes to enter the link and create a new password before the recovery link expires.</b>
                </p>                
                <div className="w-full flex justify-center">
                    <button onClick={() =>{
                        navigate("/login")
                        setSectionMailSent(false);
                    }} 
                    
                    className="btn hover:bg-white shadow-button__editTask bg-white text-[#a0f] outline-none border-none font-bold w-[100px] tracking-wide flex justify-center items-center flex-row">HOME</button>
                </div>
        </div>
    )
}

export {MailSent};