'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ValueCards from './ValueCards';


export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 md:px-10 lg:px-24 pt-8 pb-10 relative text-white">
      {/* Heading + Practice Hours */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-8xl font-bold leading-tight text-center md:text-left w-full md:w-auto">
          Your smile<br />comes first
        </h1>

        <motion.div
          className="mt-6 md:mt-0 mx-auto md:mx-0 bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-xl text-sm md:text-xl shadow-md space-y-1 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <p>Monday—Tuesday: 09:00–21:00</p>
          <p>Friday: 09:00–19:00</p>
          <p>Saturday: 11:00–16:00</p>
          <div className="bg-white/20 mt-3 px-3 py-1 rounded flex justify-between items-center text-xs md:text-sm">
            <span>Today is {currentDay}</span>
            <span>{currentTime}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="relative bg-white rounded-3xl overflow-hidden shadow-xl text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="w-full h-[500px] md:h-[800px] relative">
          <Image
            src="/image/hero-img.jpg"
            alt="Smiling patient"
            fill
            className="object-cover object-top rounded-3xl"
            priority
          />
        </div>
      </motion.div>

      {/* ✅ Cards now appear cleanly below the image */}
      <ValueCards />
    </section>
  );
}
