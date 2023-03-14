import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons"
import "../styles.css"
import { useState } from "react";


function User(){
    const [userOptionsState, setUserOptionsState] = useState(false);

    return(
        <div onClick={() => setUserOptionsState(prevState => !prevState)} className="h-20 w-20 rounded-full flex justify-center items-center fixed bg-white bottom-4 right-3">
            <FontAwesomeIcon className="w-10 h-10 text-[#a0f]" icon={faUser} />
            {userOptionsState ? 
            <>
                <div className="absolute -top-12 h-10 w-10 rounded-full bg-red-300"></div>
                <div className="absolute -top-7 -left-8 h-10 w-10 rounded-full bg-black"></div>
                <div className="absolute top-6 -left-12 h-10 w-10 rounded-full bg-blue-600"></div>
            </>
            :
            <></>
            }
        </div>
    )
}

export {User}