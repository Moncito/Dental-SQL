'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const teamMembers = [
{
  name: 'Rolyssa Lopez',
  role: 'Dental Assistant',
  experience: '2 years',
  image: '/image/rolyssa.png',
  bio: `Currently pursuing Dentistry at National University MOA, Rolyssa Lopez brings fresh energy and dedication to the clinic. As an apprentice dental assistant, she is eager to learn and committed to providing supportive and compassionate care to every patient.`,
},
{
  name: 'Alod Daniah Ashley Lumis',
  role: 'Dental Assistant',
  experience: '1 year',
  image: '/image/alod.png',
  bio: `Alod Daniah Ashley Lumis is known for her gentle touch and calming presence, especially with young patients. With a year of hands-on experience, she excels in making patients—especially children—feel comfortable and cared for during every visit.`,
},
{
  name: 'Marry Joy Balansag',
  role: 'Dental Assistant',
  experience: '3 years',
  image: '/image/marry.png',
  bio: `With 3 years of experience as a dental assistant, Marry Joy Balansag is admired for her kindness and attentive care. Her friendly demeanor and patient-first mindset have earned the trust of countless individuals who value her comforting presence.`,
},
{
  name: 'Apple Laberas',
  role: 'Secretary',
  experience: '5 Years',
  image: '/image/apple.png',
  bio: `With over 5 years of administrative experience in the dental field, Apple Laberas is the friendly face that keeps everything running smoothly. From managing appointments to assisting with patient concerns, her efficiency and warm demeanor ensure every visit starts with a smile.`,
},
{
  name: 'Sunshine Yap',
  role: 'Secretary',
  experience: '4 years',
  image: '/image/sunshine.png',
  bio: `Sunshine Yap brings 4 years of front desk expertise, offering patients a seamless and welcoming experience from the moment they walk in. Her attention to detail, professionalism, and cheerful energy make her an essential part of the clinic’s daily operations.`,
}

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
