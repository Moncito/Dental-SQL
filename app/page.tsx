import Doctor from '@/components/home/Doctor'
import HeroSection from '@/components/home/HeroSection'
import Navbar from '@/components/home/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Doctor/>
    </div>
  )
}

export default page
