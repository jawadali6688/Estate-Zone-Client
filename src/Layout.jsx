import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
function Layout() {
  return (
   <main>
    <div>
        <Header/>
    </div>
    <div className='mt-28 px-4 md:px-8 lg:px-14'>
        <Outlet/>
    </div>
    <div>
        <Footer/>
    </div>
   </main>
  )
}

export default Layout
