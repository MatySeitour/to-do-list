import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserRequest, sessionRequest, loginRequest, logoutRequest } from "../api/login.api";

const UsersContext = createContext({});

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context){
        throw new Error("the useTask must be used inside the TasksContextProvider")
    }
    return context;
}




export function UsersContextProvider({ children }) {

    const [session, setSession] = useState(
        {
            username: "",
            login: false,
            loading: true,
        }
);

    const [loginMessageError, setLoginMessageError] = useState(false);

    const navigate = useNavigate();

    function handleNavigateTasks(){
        navigate("/tasks")
    }

    function handleNavigateLogin(){
        navigate("/login")
    }

    useEffect(() => {
        const sessionLogin = async() => {
            if(!session.login){
                try{
                    setSession(prev => ({...prev, loading: true}));
                    const response = await sessionRequest();
                    setSession({
                        username: response.data.user.username,
                        loggin: true,
                        loading: false,
                    });
                }
                catch(error){
                    setSession(prev => ({...prev, loading: false}));
                    console.error(error);
                }
            }
        }

        sessionLogin();
    }, [])

    const handleCreateUser = async (user) => {
        try{
            const response = await createUserRequest(user);
            console.log(response);
        }
        catch(error){
            console.error(error)
        }
    }

    const handleLogin = async (user) =>{
        try{
            const {data} = await loginRequest(user);
            setSession({
                username: data.username,
                loggin: true,
            });
            setLoginMessageError(false);
            handleNavigateTasks();
        }
        catch(error){
            setLoginMessageError(true);
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try{
            setSession(prev => ({...prev, loading: true}));
            const response = await logoutRequest();
            handleNavigateLogin();
            setSession({
                username: "",
                loggin: false,
                loading: false,
            });
            console.log("logout", response);
        }
        catch(error){
            setSession(prev => ({...prev, loading: false}));
            console.error(error)
        }
    }


    return (
        <UsersContext.Provider value={{handleCreateUser, handleLogin, handleLogout, loginMessageError, session, setSession}}>
            { children }
        </UsersContext.Provider>
    )
}

export default UsersContext;