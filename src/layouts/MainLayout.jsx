import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AuthContext } from '../providers/AuthProvider'

const MainLayout = () => {
  const {darkMood, setDarkMood} = useContext(AuthContext);

  return (
    <div className={`min-h-screen w-full flex flex-col ${darkMood ? 'dark' : ''}`}>
      <header className='fixed z-20 top-0 w-full text-center'>
         <Navbar></Navbar>
      </header>
      <main className='flex-1 border border-green-500 pt-10'>
         This is the main section
         <Outlet></Outlet>
      </main>
      <footer>
         <Footer></Footer>
      </footer>
    </div>
  )
}

export default MainLayout
