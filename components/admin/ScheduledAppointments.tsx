'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SendSmsConfirmModal from '@/components/admin/SendSmsConfirmModal';

interface Appointment {
  Id: number;
  FullName: string;
  AppointmentDate: string;
  AppointmentTime: string;
  Service: string;
  PhoneNumber?: string;
}

export default function ScheduledAppointments() {
  const [scheduled, setScheduled] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/get-scheduled-list')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setScheduled(data);
        else setError('Invalid format');
      })
      .catch(() => setError('Failed to fetch scheduled appointments'));
  }, []);

  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Scheduled Appointments</h2>
      {error && <p className="text-red-600">{error}</p>}

      {scheduled.length === 0 ? (
        <p className="text-gray-500 text-sm">No scheduled appointments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-green-100 text-green-800 text-sm font-semibold uppercase">
                <th className="px-4 py-3 text-left rounded-l-lg">Name</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduled.map((a) => (
                <tr
                  key={a.Id}
                  className="bg-gray-50 hover:bg-green-50 transition rounded-xl shadow-sm text-sm"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{a.FullName}</td>
                  <td className="px-4 py-3 text-gray-700">{a.Service}</td>
                  <td className="px-4 py-3 text-gray-700">{a.AppointmentDate}</td>
                  <td className="px-4 py-3 text-gray-700">{a.AppointmentTime}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-300 hover:bg-green-100"
                      onClick={() => {
                        setSelected(a);
                        setModalOpen(true);
                      }}
                    >
                      Send SMS
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && selected.PhoneNumber && (
      <SendSmsConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        phone={selected.PhoneNumber}
        fullName={selected.FullName}
        type="scheduled"
        date={selected.AppointmentDate}
        time={selected.AppointmentTime}
        onSent={() => console.log('Scheduled SMS sent')}
    />
    )}
    </div>
  );
}