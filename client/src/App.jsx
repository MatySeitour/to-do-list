import './styles.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Tasks } from "./components/Tasks"
import { NewTask } from './components/NewTask'
import { NotFound } from './components/NotFound'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { useUsers } from './Context/UsersContext'


function Authenticate({children}){
  const {session} = useUsers();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session.loggin && !session.loading) { 
      navigate("/login");
    }
    else if(session.loggin && session.loading){
      navigate("/tasks");
    }
  }, [session, navigate]);
  return children;
}

function AuthenticateLogin({children}){
  const {session} = useUsers();
  const navigate = useNavigate();
  useEffect(() => {
    if (session.loggin && !session.loading) { 
      console.log("entra ")
      navigate("/tasks");
    }
  }, [session, navigate]);
  return children;
}

function App() {

  return (
    <>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route index element={<Login />} />
            <Route path='/login' element={<AuthenticateLogin>
              <Login />
            </AuthenticateLogin>} />
            <Route path='/tasks' element={
                <Authenticate>
                  <Tasks />
                </Authenticate>
              } 
            />
            <Route path='*' element={<NotFound />} />
        </Routes>  
    </>

  )
}


export default App
