'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SendEmailConfirmModal from '@/components/admin/SendEmailConfirmModal';
import ConfirmCompleteModal from '@/components/admin/ConfirmCompleteModal';
import { toast } from 'sonner';


interface Appointment {
  Id: number;
  FullName: string;
  Email: string;
  AppointmentDate: string;
  AppointmentTime: string;
  Service: string;
  PhoneNumber?: string;
  CancelReason?: string;
}

export default function ScheduledAppointments() {
  const [scheduled, setScheduled] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/appointments/scheduled')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setScheduled(data) : setError('Invalid format'))
      .catch(() => setError('Failed to fetch scheduled appointments'));
  }, []);

const handleMoveToComplete = async (appointment: Appointment) => {
  const res = await fetch('/api/move-to-complete', {
    method: 'POST',
    body: JSON.stringify(appointment),
    headers: { 'Content-Type': 'application/json' },
  });
  if (res.ok) {
    toast.success(`${appointment.FullName}'s appointment marked as completed!`);
    setScheduled(prev => prev.filter(a => a.Id !== appointment.Id)); // for ScheduledAppointments
  } else {
    toast.error('Failed to move appointment to completed.');
  }
};


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
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduled.map((a) => (
                <tr key={a.Id} className="bg-gray-50 hover:bg-green-50 transition rounded-xl shadow-sm text-sm">
                  <td className="px-4 py-3 font-medium text-gray-800">{a.FullName}</td>
                  <td className="px-4 py-3 text-gray-700">{a.Service}</td>
                  <td className="px-4 py-3 text-gray-700">{a.AppointmentDate}</td>
                  <td className="px-4 py-3 text-gray-700">{a.AppointmentTime}</td>
                  <td className="px-4 py-3 text-gray-700">{a.PhoneNumber}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="outline"  className="text-green-600 border-green-300 hover:bg-green-100 cursor-pointer" size="sm" onClick={() => {
                      setSelected(a);
                      setModalOpen(true);
                    }}>
                      Send Email
                    </Button>
                    <Button variant="ghost"  className="text-green-600 border-green-300 hover:bg-green-100 cursor-pointer" size="sm" onClick={() => {
                      setSelected(a);
                      setConfirmOpen(true);
                    }}>
                      Mark Complete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <>
          <SendEmailConfirmModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            email={selected.Email}
            fullName={selected.FullName}
            type="scheduled"
            date={selected.AppointmentDate}
            time={selected.AppointmentTime}
            onSent={() => console.log('Email sent')}
          />
          <ConfirmCompleteModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => {
              if (selected) handleMoveToComplete(selected);
              setConfirmOpen(false);
            }}
            fullName={selected.FullName}
          />
        </>
      )}
    </div>
  );
}
