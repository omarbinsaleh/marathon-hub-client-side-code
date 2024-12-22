import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='min-h-screen w-full flex'>
      <div className='hidden md:block w-[130px]'>
         dashboard menu
      </div>
      <div className='flex-1 border border-red-500'>
         <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Dashboard
