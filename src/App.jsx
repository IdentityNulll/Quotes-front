import React from 'react'
import Header from './components/Header'
import 'react-toastify/dist/ReactToastify.css'
import Quotes from './components/Quotes'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div>
      <Header/>
      <Quotes/>
      <ToastContainer/>
    </div>
  )
}

export default App
