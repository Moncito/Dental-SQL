'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ValueCard {
  title: string;
  desc: string;
}

const valueCards: ValueCard[] = [
  {
    title: 'Discount 5%',
    desc: 'For therapeutic treatment when registering via the website',
  },
  {
    title: 'Free consultation',
    desc: 'For all types of dental services',
  },
  {
    title: 'Installments 0%',
    desc: 'We will examine, make a treatment plan, and name the exact cost.',
  },
];

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
    <section className="px-6 md:px-10 lg:px-24 pt-8 pb-40 relative text-white">
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

      {/* Image with Floating Cards */}
      <motion.div
        className="relative bg-white rounded-3xl overflow-hidden shadow-xl text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Hero Image */}
        <div className="w-full h-[500px] md:h-[800px] relative">
          <Image
            src="/image/hero-img.jpg"
            alt="Smiling patient"
            fill
            className="object-cover object-top rounded-3xl"
            priority
          />

          {/* Floating Cards */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] flex flex-col md:flex-row justify-center gap-4 p-4 md:p-6 rounded-2xl shadow-xl z-10 backdrop-blur-md bg-white/80"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
          >
            {valueCards.map((card, i) => (
              <motion.div
                key={i}
                className="flex-1 min-w-[220px] max-w-[320px] text-center p-4 rounded-xl shadow-md bg-white"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold text-base md:text-lg mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
