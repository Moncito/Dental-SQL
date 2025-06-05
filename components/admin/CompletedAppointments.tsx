'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { toast } from 'sonner';

interface Appointment {
  Id: number;
  FullName: string;
  AppointmentDate: string;
  AppointmentTime: string;
  Service: string;
  Status: 'Scheduled' | 'Cancelled';
  CancelReason?: string;
}

export default function CompletedAppointments() {
  const [completed, setCompleted] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/appointments/completed')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCompleted(data);
        else setError('Invalid format');
      })
      .catch(() => setError('Failed to fetch completed appointments'));
  }, []);

  const handleDelete = async () => {
    if (!targetId) return;
    setDeletingId(targetId);

    const res = await fetch('/api/delete-completed-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id: targetId }),
    });

    if (res.ok) {
      toast.success('Appointment successfully deleted.');
      setCompleted((prev) => prev.filter((a) => a.Id !== targetId));
    } else {
      toast.error('Failed to delete appointment.');
    }

    setDeletingId(null);
    setModalOpen(false);
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Completed Appointments</h2>
      {error && <p className="text-red-600">{error}</p>}
      {completed.length === 0 ? (
        <p className="text-gray-500 text-sm">No completed appointments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-purple-100 text-purple-800 text-sm font-semibold uppercase">
                <th className="px-4 py-3 text-left rounded-l-lg">Name</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((a) => (
                <tr
                  key={a.Id}
                  className="bg-gray-50 hover:bg-purple-50 transition rounded-xl shadow-sm text-sm"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{a.FullName}</td>
                  <td className="px-4 py-3 text-gray-700">{a.Service}</td>
                  <td className="px-4 py-3 text-gray-700">{a.AppointmentDate}</td>
                  <td className="px-4 py-3 text-gray-700">{a.AppointmentTime}</td>
                  <td className="px-4 py-3 text-gray-700">{a.Status}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="destructive"
                      size="icon"
                      className='cursor-pointer'
                      onClick={() => {
                        setTargetId(a.Id);
                        setModalOpen(true);
                      }}
                      disabled={deletingId === a.Id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      <DeleteConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
