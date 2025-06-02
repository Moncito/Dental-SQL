'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="scroll-mt-32 px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-br from-[--color-primary] to-[#6ec3ff] text-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Get in Touch</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left Column – Contact Info + Map */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-white/80">+63 912 345 6789</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-white/80">info@denttyclinic.ph</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-white/80">
                123 Smile Street, Barangay Malinis, Quezon City, Metro Manila
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden mt-6">
            <iframe
              src="https://maps.google.com/maps?q=Quezon%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64 border-none rounded-xl"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <form className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl space-y-4 shadow-xl">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 ring-white"
              placeholder="Juan Dela Cruz"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 ring-white"
              placeholder="you@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 ring-white"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black cursor-pointer font-semibold py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
}
