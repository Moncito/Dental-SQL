'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const doctors = [
  {
    name: 'Dr. Juan Dela Cruz',
    specialty: 'Orthodontist',
    imageSrc: '/image/doctor1.jpg',
  },
  {
    name: 'Dr. Maria Santos',
    specialty: 'Pediatric Dentist',
    imageSrc: '/image/doctor2.jpg',
  },
];

export default function DoctorSection() {
  return (
    <motion.section
      id="doctors"
      className="scroll-mt-32 px-6 md:px-12 lg:px-24 py-16 bg-gray-200 text-black"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-14 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Meet Our Doctors
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {doctors.map((doc, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className="w-32 h-32 mx-auto relative mb-4 rounded-full overflow-hidden border-4 border-[--color-primary]">
              <Image
                src={doc.imageSrc}
                alt={doc.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">{doc.name}</h3>
            <p className="text-sm text-gray-600">{doc.specialty}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
