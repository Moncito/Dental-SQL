// components/admin/SendSmsConfirmModal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  phone: string;
  fullName: string;
  type: 'scheduled' | 'cancelled';
  date?: string;
  time?: string;
  reason?: string;
  onSent: () => void;
}

export default function SendSmsConfirmModal({
  open,
  onClose,
  phone,
  fullName,
  type,
  date,
  time,
  reason,
  onSent,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const endpoint = type === 'scheduled' ? '/api/sms/schedule' : '/api/sms/cancel';
    const payload =
      type === 'scheduled'
        ? { phone, fullName, date, time }
        : { phone, fullName, reason };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('SMS sent successfully!');
        onSent();
        onClose();
      } else {
        toast.error('Failed to send SMS.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const previewMessage =
    type === 'scheduled'
      ? `Hi ${fullName}, your appointment is scheduled on ${date} at ${time}. - Dentty Clinic`
      : `Hi ${fullName}, your appointment has been cancelled. Reason: ${reason}. - Dentty Clinic`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm SMS</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-700">This is the message that will be sent:</p>
          <div className="bg-gray-100 p-3 rounded text-sm border text-gray-800">
            {previewMessage}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSend} disabled={loading}>
              {loading ? 'Sending...' : 'Send SMS'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
