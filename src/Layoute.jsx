import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import ScrollToTopButton from './components/ScrollToTopButton'
import MedicalChat from './components/MedicalChat'

export default function Layoute() {
  return (
    <div
    // style={{
    //   background: 'radial-gradient(circle at 10% 20%, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 1) 90%)'
    // }}
    >
      <Navbar />
      <main className=" mx-auto mt-10  py-8">
        <Outlet /> {/* Sahifalar shu joyga yuklanadi */}
        <ScrollToTopButton />
        <MedicalChat />
      </main>
      {/* <Footer /> */}
    </div>

  )
}
