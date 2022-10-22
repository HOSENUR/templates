import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Counter, Posts} from './pages'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<div>Home</div>} /> */}
        <Route path='counter' element={<Counter/>} />
        <Route path='posts' element={<Posts/>} />
      </Routes>
    </BrowserRouter>
  )
}
