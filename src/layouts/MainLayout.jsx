import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {

  return (
    <div className='min-h-screen w-full flex flex-col'>
      <header className='fixed z-20 top-0 w-full text-center'>
         This the Header section
      </header>
      <main className='flex-1 border border-green-500 pt-10'>
         This is the main section
         <Outlet></Outlet>
      </main>
      <footer>
         This the footer section
      </footer>
    </div>
  )
}

export default MainLayout
