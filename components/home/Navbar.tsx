'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define nav links
interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '#doctors', label: 'Doctors' },
  { href: '#pricing', label: 'Price list' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

interface NavbarLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

function NavbarLink({ href, label, onClick }: NavbarLinkProps) {
  return (
    <Link href={href} onClick={onClick} className="hover:underline">
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // You can remove the time state if it's not being used
    // If you need to display the time, you can use it here
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-[--color-primary] sticky top-0 z-50 px-4 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
        {/* Logo */}
        <div className="text-white font-bold text-3xl">Dentty</div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex bg-white/10 backdrop-blur-xl px-8 py-4 rounded-lg items-center gap-30 text-white text-lg shadow-md">
          {navLinks.map((link) => (
            <NavbarLink key={link.label} href={link.href} label={link.label} />
          ))}
          <Link
            href="/auth/sign-up"
            className="ml-6 bg-white text-black text-lg font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Appointment 
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        {!isOpen && (
        <button
            onClick={handleToggleMenu}
            className="text-black lg:hidden"
            aria-label="Toggle navigation"
        >
            <Menu size={28} />
        </button>
        )}
      </div>

      {/* Full-Screen Mobile Menu */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
      className="fixed inset-0 bg-[--color-primary] z-40 p-6 pt-24 flex flex-col items-center justify-start space-y-6 text-black text-2xl font-medium bg-white"
    >
      {/* Close Button */}
      <button
        onClick={handleCloseMenu}
        className="absolute top-6 right-6 text-black "
        aria-label="Close menu"
      >
        <X size={28} />
      </button>

      {/* Nav Links */}
      {navLinks.map((link) => (
        <NavbarLink
          key={link.label}
          href={link.href}
          label={link.label}
          onClick={handleCloseMenu}
        />
      ))}

      {/* CTA Button */}
      <Link
        href="/auth/sign-up"
        onClick={handleCloseMenu}
        className="mt-10 bg-white text-[--color-primary] px-6 py-3 text-black rounded-full text-lg font-semibold shadow hover:bg-gray-100 transition"
        style={{ minWidth: '180px', textAlign: 'center' }}
      >
        Book an Appointment
      </Link>
    </motion.div>
  )}
</AnimatePresence>
  
    </header>
  );
}   