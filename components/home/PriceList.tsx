'use client';

import { motion } from 'framer-motion';

const services = [
  {
    name: 'Dental Cleaning',
    description: 'Professional plaque & tartar removal',
    price: '₱1,200',
  },
  {
    name: 'Tooth Extraction',
    description: 'Simple removal of damaged tooth',
    price: '₱1,500',
  },
  {
    name: 'Tooth Whitening',
    description: 'Brighten your smile with safe whitening',
    price: '₱3,500',
  },
  {
    name: 'Braces Installation',
    description: 'Initial assessment + bracket installation',
    price: '₱25,000+',
  },
];

export default function PriceList() {
  return (
    <motion.section
      id="pricing"
      className="scroll-mt-32 px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-br from-[--color-primary] to-[#6ec3ff] text-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Treatment Price List
      </motion.h2>
      <motion.p
        className="text-center text-white/80 mb-12 max-w-xl mx-auto text-sm md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Transparent and affordable care for every smile. No hidden fees, just honest service.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 text-white hover:scale-[1.03]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
            <p className="text-sm text-white/80">{service.description}</p>
            <p className="text-lg font-bold mt-4">{service.price}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
