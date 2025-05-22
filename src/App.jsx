import { useState } from 'react'


import './App.css'

import React from 'react'
import Home from './page/Home'
import { Route, Routes } from 'react-router-dom'
import Layoute from './Layoute'
import XRayAnalysis from './page/XRayAnalysis'
import MedicalAnalysisDashboard from './page/MedicalAnalysisDashboard'
import PatientRecoveryDashboard from './page/PatientRecoveryDashboard'
import Hero from './page/Hero'
import Xray from './page/Xray'
import PatientDailyMonitoring from './page/PatientDailyMonitoring'
import ContactPage from './page/Contact'
import PatientProfile from './page/PatientProfile'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layoute />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Hero />} />
          <Route path='/rentgen' element={<XRayAnalysis />} />
          <Route path='/analysis' element={<MedicalAnalysisDashboard />} />
          <Route path='/manitoring' element={<PatientRecoveryDashboard />} />
          <Route path='/testimonials' element={<Xray />} />
          <Route path="/ptient" element={<PatientDailyMonitoring />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<PatientProfile />} />
        </Route>
      </Routes>


    </>
  )
}
