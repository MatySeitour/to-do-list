import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserRequest, sessionRequest, loginRequest, logoutRequest, sendMailToRecovery, createNewPassword } from "../api/login.api";

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

    const [sendMailRecoveryMessage, setSendMailRecoveryMessage] = useState(false);

    const [sectionMailSent, setSectionMailSent] = useState(false);

    const [sendLoadingButton, setLoadingButton] = useState(false);

    const [nameEmailSent, setNameEmailSent] = useState("");

    const [registerErrorMessage, setRegisterErrorMessage] = useState(0);

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
            setRegisterErrorMessage(0)
            const response = await createUserRequest(user);
        }
        catch(error){
            if(user.username === "" || user.username.length < 3){
                setRegisterErrorMessage(1)
            }
            else if(user.password === "" || user.password.length < 5){
                setRegisterErrorMessage(2)
            }
            else if(user.email === ""){
                setRegisterErrorMessage(3)
            }
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
        }
        catch(error){
            setSession(prev => ({...prev, loading: false}));
            console.error(error)
        }
    }

    const handleSendEmailRecovery = async (inputUser) => {
        try{
            setLoadingButton(true);
            
            const response = await sendMailToRecovery(inputUser);
            setLoadingButton(false);
            setSectionMailSent(true);
            setSendMailRecoveryMessage(false);
            setNameEmailSent(response.data.mail.to);
        }
        catch(error){
            setLoadingButton(false);
            console.error(error)
            setSendMailRecoveryMessage(true);
        }
    }

    const handleNewPassword = async (newPassword) => {
        try{
            const response = await createNewPassword(newPassword);
        }
        catch(error){
            console.error(error);
        }
    }


    return (
        <UsersContext.Provider value={{handleCreateUser, handleLogin, handleLogout, loginMessageError, session, setSession, handleSendEmailRecovery, sendMailRecoveryMessage, sectionMailSent, sendLoadingButton, setSectionMailSent, handleNewPassword, nameEmailSent, registerErrorMessage}}>
            { children }
        </UsersContext.Provider>
    )
}


export default UsersContext;