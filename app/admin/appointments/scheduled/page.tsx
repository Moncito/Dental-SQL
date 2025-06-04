import AdminNav from '@/components/admin/AdminNav';
import AdminWelcome from '@/components/admin/AdminWelcome';
import ScheduledAppointments from '@/components/admin/ScheduledAppointments';

export default function ScheduledPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <AdminWelcome/>
      <AdminNav/>
      <ScheduledAppointments />
    </main>
  );
}
