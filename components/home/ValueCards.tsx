'use client';

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

export default function ValueCards() {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-14 text-black"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-5">
        {valueCards.map((card, i) => (
          <motion.div
            key={i}
            className="w-[280px] md:w-[300px] lg:w-[320px] h-[180px] flex flex-col justify-center text-center p-5 rounded-xl shadow-xl bg-white border border-gray-100 backdrop-blur-md bg-white/80 drop-shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-base md:text-lg mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
