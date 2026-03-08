import React from 'react'
import Header from '../Component/header'
import HomeLayout from '../Layouts/HomeLayout'
import BookingLayout from '../Layouts/BookingLayout'
import PartnerLayout from '../Layouts/PartnerLayout'
import SubLayouts from '../Layouts/SubLayouts'
import AboutLayout from '../Layouts/AboutLayout'
import Footer from '../Component/Footer'
import { Outlet } from 'react-router-dom'

function HomePage() {
  return (
    <div className='min-h-screen flex  flex-col overflow-x-hidden'>
       <Header/>
       <HomeLayout/>
       <BookingLayout/>
       <PartnerLayout/>
       <SubLayouts/>
       <AboutLayout/>
       <Footer/>
       <Outlet/>
    </div>
  )
}

export default HomePage
