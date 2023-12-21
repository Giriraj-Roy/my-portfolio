import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'
import Experience from './components/Experience'


function App() {

  return (
    <div className='parent-div'>
      <Navbar/>
      <Home/>
      <About/>
      <Projects />
      <Experience/>
      <Skills/>
      <Footer/>

    </div>
  )
}

export default App
