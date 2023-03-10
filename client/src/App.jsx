import './styles.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import { Tasks } from "./components/Tasks"
import { NewTask } from './components/NewTask'
import { NotFound } from './components/NotFound'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { RecoveryPassword } from './components/RecoveryPassword'
import { NewPassword } from './components/NewPassword'
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
      navigate("/tasks");
    }
  }, [session, navigate]);
  return children;
}

function App() {

  return (
    <>
          <Routes>
            <Route path='/register' element={
              <AuthenticateLogin>
                <Register />
              </AuthenticateLogin>
            } />
            <Route index element={
            <AuthenticateLogin>
              <Login />
            </AuthenticateLogin>} />
            <Route path='/login' element={<AuthenticateLogin>
              <Login />
            </AuthenticateLogin>} />
            <Route path='/tasks' element={
                <Authenticate>
                  <Tasks />
                </Authenticate>
              } 
            />
            <Route path='/recovery-password' element={<RecoveryPassword />} />
            <Route path='/new-password?' element={<NewPassword />} />
            <Route path='*' element={<NotFound />} />
        </Routes>  
    </>

  )
}


export default App
