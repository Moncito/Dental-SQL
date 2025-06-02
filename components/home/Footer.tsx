'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[--color-primary] text-white px-6 md:px-12 lg:px-24 py-12 mt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left ">
        {/* Brand + Tagline */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Dentty</h3>
          <p className="text-white/80 text-sm">
            Your smile, our priority. Quality dental care you can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 px-35">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-white/80">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="#doctors" className="hover:underline">Doctors</Link></li>
            <li><Link href="#pricing" className="hover:underline">Price List</Link></li>
            <li><Link href="#team" className="hover:underline">Team</Link></li>
            <li><Link href="#contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 px-30">
          <h4 className="font-semibold mb-2">Contact</h4>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-white/80">
            <Phone className="w-4 h-4" />
            <span>+63 912 345 6789</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-white/80">
            <Mail className="w-4 h-4" />
            <span>info@denttyclinic.ph</span>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="border-t border-white/20 mt-12 pt-6">
        <p className="text-center text-xs text-white/60">
          © {new Date().getFullYear()} MG Hernandez. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
