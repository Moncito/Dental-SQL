'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl border shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-red-700 text-xl font-semibold">
            ❗ Confirm Deletion
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this appointment? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirm}>Yes, Delete</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
