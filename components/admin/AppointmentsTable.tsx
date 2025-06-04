'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Appointment {
  Id: number;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Service: string;
  AppointmentDate: string;
  AppointmentTime: string;
  Notes: string;
}

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/get-appointments');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        setError('Invalid data format');
      }
    } catch {
      setError('Failed to fetch appointments');
    }
  };

  const handleMove = async (appt: Appointment, type: 'scheduled' | 'cancelled') => {
    const endpoint = type === 'scheduled'
      ? '/api/move-to-scheduled'
      : '/api/move-to-cancelled';

    const payload = {
      Id: appt.Id,
      FullName: appt.FullName,
      AppointmentDate: appt.AppointmentDate,
      AppointmentTime: appt.AppointmentTime,
      Service: appt.Service,
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(`Moved to ${type.charAt(0).toUpperCase() + type.slice(1)} successfully!`);
      fetchAppointments();
    } else {
      toast.error(`Failed to move to ${type}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">All Appointment Requests</h2>

      {error ? (
        <div className="text-red-600">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="text-gray-500">No appointments found.</div>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead className="bg-blue-50 text-blue-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Phone</th>
              <th className="text-left px-4 py-2">Service</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Time</th>
              <th className="text-left px-4 py-2">Notes</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.Id} className="bg-white hover:bg-blue-50 shadow rounded-lg transition">
                <td className="px-4 py-2">{appt.FullName}</td>
                <td className="px-4 py-2">{appt.Email}</td>
                <td className="px-4 py-2">{appt.PhoneNumber}</td>
                <td className="px-4 py-2">{appt.Service}</td>
                <td className="px-4 py-2">{appt.AppointmentDate}</td>
                <td className="px-4 py-2">{appt.AppointmentTime}</td>
                <td className="px-4 py-2">{appt.Notes || '-'}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleMove(appt, 'scheduled')}
                    className="bg-gray-100 hover:bg-blue-600 hover:text-white px-3 py-1 text-sm rounded"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => handleMove(appt, 'cancelled')}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
