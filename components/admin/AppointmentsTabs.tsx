'use client';

import { useEffect, useState } from 'react';

interface Appointment {
  Id: number;
  FullName: string;
  AppointmentDate: string;
  AppointmentTime: string;
  Service: string;
  Status: string;
}

export default function AppointmentsTabs() {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'cancelled'>('scheduled');
  const [scheduled, setScheduled] = useState<Appointment[]>([]);
  const [cancelled, setCancelled] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduled = async () => {
      try {
        const res = await fetch('/api/appointments/scheduled');
        const data = await res.json();
        if (Array.isArray(data)) {
          setScheduled(data);
        } else {
          setError('Invalid scheduled data format.');
        }
      } catch {
        setError('Failed to fetch scheduled appointments.');
      }
    };

    const fetchCancelled = async () => {
      try {
        const res = await fetch('/api/appointments/cancelled');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCancelled(data);
        } else {
          setError('Invalid cancelled data format.');
        }
      } catch {
        setError('Failed to fetch cancelled appointments.');
      }
    };

    fetchScheduled();
    fetchCancelled();
  }, []);

  const renderTable = (appointments: Appointment[], color: string) => (
    <div className="w-full h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-6">
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm">No appointments found.</p>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead className={`${color} text-white`}>
            <tr>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Service</th>
              <th className="text-left px-3 py-2">Date</th>
              <th className="text-left px-3 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.Id} className="bg-gray-50 hover:bg-opacity-70 transition rounded-lg shadow-sm">
                <td className="px-3 py-2">{a.FullName}</td>
                <td className="px-3 py-2">{a.Service}</td>
                <td className="px-3 py-2">{a.AppointmentDate}</td>
                <td className="px-3 py-2">{a.AppointmentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-b from-white to-blue-50">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
            activeTab === 'scheduled' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Scheduled Appointments
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
            activeTab === 'cancelled' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Cancelled Appointments
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {activeTab === 'scheduled' && (
        <>
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">✅ Scheduled Appointments</h2>
          {renderTable(scheduled, 'bg-green-600')}
        </>
      )}

      {activeTab === 'cancelled' && (
        <>
          <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">❌ Cancelled Appointments</h2>
          {renderTable(cancelled, 'bg-red-600')}
        </>
      )}
    </div>
  );
}
