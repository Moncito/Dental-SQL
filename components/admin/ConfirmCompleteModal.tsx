'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmCompleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fullName: string;
}

export default function ConfirmCompleteModal({
  open,
  onClose,
  onConfirm,
  fullName,
}: ConfirmCompleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Completion</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600 mb-4">
          Are you sure you want to mark <span className="font-semibold">{fullName}</span> s appointment as <span className="text-purple-700 font-bold">Completed</span>?
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={onConfirm}>
            Yes, Mark Completed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
