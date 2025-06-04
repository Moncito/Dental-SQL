'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type CancelConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CancelConfirmationModal({
  open,
  onClose,
  onConfirm,
}: CancelConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-lg font-bold">
            Cancel Appointment?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-700 mt-2 mb-4">
          Are you sure you want to cancel this appointment? This action will update the status in the database.
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            No, Go Back
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes, Cancel It
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
