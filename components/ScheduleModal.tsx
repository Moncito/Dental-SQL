'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

type ScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  appointment: {
    id: number;
    fullName: string;
    date: string;
    time: string;
    notes?: string;
    phoneNumber?: string; // ✅ add phone number support
  };
  onScheduled: () => void;
};

export function ScheduleModal({
  open,
  onClose,
  appointment,
  onScheduled,
}: ScheduleModalProps) {
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [notes, setNotes] = useState(appointment.notes || '');

  const handleSubmit = async () => {
    const res = await fetch('/api/update-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: appointment.id,
        date,
        time,
        notes,
        status: 'Scheduled',
      }),
    });

    if (res.ok) {
      // ✅ Send SMS after scheduling
      await fetch('/api/sms/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: appointment.phoneNumber ?? '+639776980768', // fallback for now
          fullName: appointment.fullName,
          date,
          time,
        }),
      });

      toast.success('Appointment scheduled!');
      onScheduled();
      onClose();
    } else {
      toast.error('Failed to schedule appointment.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium">New Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium">New Time</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium">Notes (optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., confirmed via call"
            />
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
