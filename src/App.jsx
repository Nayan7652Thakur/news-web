import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NewsBox from './components/NewsBox'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/news/:category' element={<NewsBox />}/>
      </Routes>
    </div>
  )
}

export default App