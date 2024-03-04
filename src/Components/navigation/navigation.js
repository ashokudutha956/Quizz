


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../loginpage/loginpage'
import QuizzApp from '../QuizzApp'

const Navigation=() =>{
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' Component={LoginPage}/>
        <Route path='/home' Component={QuizzApp}/>
    
    </Routes>
 </BrowserRouter>
  )
}

export default Navigation