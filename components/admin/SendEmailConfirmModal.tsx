'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Make sure you have this component
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  email: string;
  fullName: string;
  type: 'scheduled' | 'cancelled';
  date?: string;
  time?: string;
  reason?: string;
  onSent: () => void;
}

export default function SendEmailConfirmModal({
  open,
  onClose,
  email,
  fullName,
  type,
  date,
  time,
  reason,
  onSent,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [customText, setCustomText] = useState('');

  // Set default message when modal opens
  useEffect(() => {
    const defaultText =
      type === 'scheduled'
        ? `Hello ${fullName},\n\nYour dental appointment has been successfully scheduled on ${date} at ${time}.\n\nThank you,\nDentty Clinic`
        : `Hello ${fullName},\n\nWe regret to inform you that your appointment has been cancelled.\nReason: ${reason}.\n\nThank you,\nDentty Clinic`;

    setCustomText(defaultText);
  }, [open, fullName, type, date, time, reason]);

  const subject =
    type === 'scheduled'
      ? 'Dentty Clinic Appointment Confirmation'
      : 'Dentty Clinic Appointment Cancellation';

  const handleSend = async () => {
    setLoading(true);

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, subject, text: customText }),
    });

    if (res.ok) {
      toast.success('Email sent successfully!');
      onSent();
      onClose();
    } else {
      toast.error('Failed to send email.');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Email Confirmation</DialogTitle>
        </DialogHeader>

        <Textarea
          rows={8}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full border rounded p-3 text-sm text-gray-700 bg-gray-50"
        />

        <div className="flex justify-end pt-2 gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend} disabled={loading}>
            {loading ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
