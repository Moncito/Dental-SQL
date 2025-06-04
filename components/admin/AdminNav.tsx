'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'All Appointments', href: '/admin' },
  { label: 'Scheduled', href: '/admin/appointments/scheduled' },
  { label: 'Cancelled', href: '/admin/appointments/cancelled' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full mb-8">
      <ul className="flex flex-wrap justify-center gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm px-5 py-2 rounded-full font-medium border transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
