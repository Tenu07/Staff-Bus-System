import React from 'react'
import Header from '../Component/header'
import ContactUsPage from '../Component/UI/ContactUsPage'
import Footer from '../Component/Footer'
import { Outlet } from 'react-router-dom'

function ContactUsLayout() {
  return (
    <div className='min-h-screen flex  flex-col overflow-x-hidden'>
        <Header/>
        <ContactUsPage/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default ContactUsLayout