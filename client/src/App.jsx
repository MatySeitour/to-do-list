import './styles.css'
import { Route, Routes } from 'react-router-dom'
import { Tasks } from "./components/Tasks"
import { NewTask } from './components/NewTask'
import { NotFound } from './components/NotFound'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Tasks />} />
          <Route path='/new' element={<NewTask />} />
          <Route path='*' element={<NotFound />} />
      </Routes>    
    </>

  )
}

export default App
