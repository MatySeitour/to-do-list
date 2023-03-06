import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons"
import { useUsers } from "../Context/UsersContext";
import { useState } from "react";
import "../styles.css"

function Nav(){

    const {session, handleLogout} = useUsers();
    console.log(session)

    const [userSettings, setUserSettings] = useState(false);


    return(
        <header className="fixed top-4 z-30 h-12 w-full pl-3 pr-3">
            <nav className="w-full h-full background-main rounded-md">
                <ul className="w-full h-full flex justify-end items-center pr-4">
                    <li className="ml-2 mr-2 text-lg text-[#fff] font-extrabold flex justify-center items-center">
                        <p>{session.username}</p>
                        <FontAwesomeIcon className="text-center ml-2 cursor-pointer" icon={faUser} />
                    </li>
                    <li className="ml-2 mr-2">
                        <FontAwesomeIcon onClick={() => setUserSettings(prev => !prev)} className="hover:animate-spin_gear text-center text-[#fff] cursor-pointer" icon={faGear} />
                        <div onClick={() => handleLogout()} className={userSettings ? "absolute z-50 scale-100 transition-all right-4 top-14 w-36 h-10 background-main rounded-md flex justify-around items-center" : "scale-0 transition-all"}>
                            <FontAwesomeIcon className={userSettings ? "text-[#fff] cursor-pointer" : "hidden"} icon={faRightFromBracket} />
                            <p className={userSettings ? "-translate-y-[0.7px] text-[#fff] font-extrabold" : "hidden"}>Log Out</p>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export {Nav};