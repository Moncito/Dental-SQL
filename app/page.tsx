import Contact from '@/components/home/Contact'
import Doctor from '@/components/home/Doctor'
import Footer from '@/components/home/Footer'
import HeroSection from '@/components/home/HeroSection'
import Navbar from '@/components/home/Navbar'
import PriceList from '@/components/home/PriceList'
import Team from '@/components/home/Team'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-[var(--color-primary)]'>
      <Navbar/>
      <HeroSection/>
      <Doctor/>
      <PriceList/>
      <Team/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Page;