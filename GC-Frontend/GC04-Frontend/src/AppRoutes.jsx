import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RoutePage from './Pages/RoutePage'
import SeatPage from './Pages/SeatPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import AdminRoute from './Admin/AdminRoutes/AdminRoute'
import ProfilePage from './Pages/ProfilePage'
import FAQPage from './Pages/FAQPage'
import Payment from './Pages/Payment'
import { Toaster } from 'react-hot-toast'
import PrintBill from './Pages/PrintBill'
import ContactUsPage from './Component/UI/ContactUsPage'
import ContactUsLayout from './Layouts/ContactUsLayout'
import AboutUsLayout from './Layouts/AboutUsLayout'
import AboutusPage from './Pages/AboutusPage'
function AppRoutes() {
  return (
    <>
     <Toaster/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/routes' element ={<RoutePage/>}/>
      <Route path='/seating' element = {<SeatPage/>}/>
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path='/register' element = {<RegisterPage/>}/>
      <Route path = '/admin/*' element = {<AdminRoute/>}/>
      <Route path='/profile' element ={<ProfilePage/>}/>
      <Route path='/faq' element ={<FAQPage/>}/>
      <Route path='/payment' element ={<Payment/>}/>
      <Route path='/booking-confirmation' element ={<PrintBill/>}/>
      <Route path='/contact' element= {<ContactUsLayout/>}/>
      <Route path='/about' element ={<AboutusPage/>}/>
    </Routes>
    </>
  )
}

export default AppRoutes
