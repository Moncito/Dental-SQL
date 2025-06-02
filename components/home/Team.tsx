'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Tony Ware',
    role: 'Orthodontist',
    experience: '5 years',
    image: '/image/doctor1.jpg',
    bio: `A qualified and experienced dental specialist who provides high-quality and effective dental services. Over the years of experience, he has successfully helped hundreds of patients with various oral health issues.`,
  },
  {
    name: 'Maria Santos',
    role: 'Pediatric Dentist',
    experience: '7 years',
    image: '/image/doctor2.jpg',
    bio: `Known for her gentle care and attention to children, she has built trust with hundreds of families through thoughtful and professional pediatric care.`,
  },
  {
    name: 'Luis Mendoza',
    role: 'General Dentist',
    experience: '10 years',
    image: '/image/doctor3.jpg',
    bio: `With a decade of experience in general dentistry, Luis focuses on preventive care, root canals, and patient education for long-term oral health.`,
  },
];

export default function Team() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % teamMembers.length);
  const prev = () => setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const doc = teamMembers[current];

  return (
    <motion.section
      id="team"
      className="scroll-mt-32 px-6 md:px-12 lg:px-24 py-20 bg-white text-black"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Friendly Team</h2>

      <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-200 max-w-5xl mx-auto">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative rounded-xl overflow-hidden">
          <Image
            src={doc.image}
            alt={doc.name}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {current + 1}/{teamMembers.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 cursor-pointer h-9 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-9 cursor-pointer h-9 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center"
              >
                →
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-semibold">{doc.name}</h3>
          <p className="text-[--color-primary] font-medium">{doc.role}</p>
          <p className="text-sm text-gray-600">Work experience of {doc.experience}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{doc.bio}</p>

          <button className="mt-4 bg-[--color-primary] text-black px-6 py-3 rounded-xl shadow hover:bg-gray-200 cursor-pointer transition">
            Book an appointment
          </button>
        </div>
      </div>
    </motion.section>
  );
}
