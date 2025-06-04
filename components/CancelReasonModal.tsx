'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  appointmentId: number;
  onCancelled: () => void;
}

export default function CancelReasonModal({
  open,
  onClose,
  appointmentId,
  onCancelled,
}: Props) {
  const [reason, setReason] = useState('');

  const handleCancel = async () => {
    const res = await fetch('/api/cancel-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: appointmentId, reason }),
    });

    if (res.ok) {
      toast.success('Appointment cancelled!');
      onCancelled();
      onClose();
    } else {
      toast.error('Failed to cancel appointment.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter cancellation reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex justify-end pt-4 gap-2">
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button variant="destructive" onClick={handleCancel}>Confirm Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
