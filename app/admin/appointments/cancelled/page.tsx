import AdminNav from '@/components/admin/AdminNav';
import AdminWelcome from '@/components/admin/AdminWelcome';
import CancelledAppointments from '@/components/admin/CancelledAppointments';

export default function CancelledPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <AdminWelcome/>
        <AdminNav/>
      <CancelledAppointments />
    </main>
  );
}
