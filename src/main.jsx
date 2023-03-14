import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import {TasksContextProvider} from './Context/TasksContext'
import { UsersContextProvider } from './Context/UsersContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <BrowserRouter>
        <UsersContextProvider>
          <TasksContextProvider>
            <App />
          </TasksContextProvider>
        </UsersContextProvider>
        </BrowserRouter>
  </React.StrictMode>,
)