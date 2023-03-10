import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons"
import { useUsers } from "../Context/UsersContext";
import { useState, useEffect } from "react";
import "../styles.css"

function Nav(){

    const {session, handleLogout} = useUsers();

    const [userSettings, setUserSettings] = useState(false);

    const [navDesktopEffect, setNavDesktopEffect] = useState(false)

    useEffect(() => {
        const onScroll = e => {
            const newScroll = window.scrollY > 50
            navDesktopEffect !== newScroll && setNavDesktopEffect(newScroll)
        }

        document.addEventListener(`scroll`, onScroll);
        return () => document.removeEventListener(`scroll`, onScroll)


    }, [navDesktopEffect])


    return(
        <header className="fixed top-4 z-30 h-12 w-full pl-3 pr-3">
            <nav className={navDesktopEffect ? "w-full h-full bg-slate-100 rounded-md transition-all" : "w-full h-full background-main transition-all rounded-md"}>
                <ul className="w-full h-full flex justify-end items-center pr-4">
                    <li className={navDesktopEffect ? "transition-all ml-2 mr-2 text-lg text-[#a0f] font-extrabold flex justify-center items-center" : "transition-all ml-2 mr-2 text-lg text-[#fff] font-extrabold flex justify-center items-center"}>
                        <p>{session.username}</p>
                        <FontAwesomeIcon className="text-center ml-2 cursor-pointer" icon={faUser} />
                    </li>
                    <li className="ml-2 mr-2">
                        <FontAwesomeIcon onClick={() => setUserSettings(prev => !prev)} className={navDesktopEffect ? "transition-all hover:animate-spin_gear text-center text-[#a0f] cursor-pointer" : "transition-all hover:animate-spin_gear text-center text-[#fff] cursor-pointer"} icon={faGear} />
                        <div onClick={() => handleLogout()} className={userSettings ? `absolute z-50 scale-100 transition-all right-4 top-14 w-36 h-10 ${!navDesktopEffect && `background-main transition-all`} bg-slate-100 rounded-md flex justify-around items-center transition-all` : "scale-0 transition-all"}>
                            <FontAwesomeIcon className={userSettings ? `${navDesktopEffect && `text-[#a0f]`} text-[#fff] cursor-pointer` : "hidden"} icon={faRightFromBracket} />
                            <p className={userSettings ? `-translate-y-[0.7px] ${navDesktopEffect &&`text-[#a0f] transition-all` } text-[#fff] font-extrabold transition-all` : "hidden"}>Log Out</p>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export {Nav};