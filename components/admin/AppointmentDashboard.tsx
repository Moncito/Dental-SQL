// components/admin/AppointmentDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, PhoneCall, UserRound } from 'lucide-react';
import AppointmentsTable from '@/components/admin/AppointmentsTable';

interface AppointmentSummary {
  totalAppointments: number;
  upcomingAppointments: number;
  needsActionAppointments: number;
}

export default function AppointmentDashboard() {
  const [summary, setSummary] = useState<AppointmentSummary>({
    totalAppointments: 0,
    upcomingAppointments: 0,
    needsActionAppointments: 0,
  });

  useEffect(() => {
    fetch('/api/appointment-summary')
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">🦷 Dentty Admin Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor and manage dental appointments effectively</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 border-t-4 border-blue-600">
          <UserRound className="text-blue-600 w-7 h-7" />
          <div>
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-2xl font-semibold text-blue-800">{summary.totalAppointments}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 border-t-4 border-green-500">
          <CalendarDays className="text-green-600 w-7 h-7" />
          <div>
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-semibold text-green-700">{summary.upcomingAppointments}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 border-t-4 border-red-500">
          <PhoneCall className="text-red-600 w-7 h-7" />
          <div>
            <p className="text-sm text-gray-500">Needs Action</p>
            <p className="text-2xl font-semibold text-red-700">{summary.needsActionAppointments}</p>
          </div>
        </div>
      </div>

      <AppointmentsTable />
    </div>
  );
}
