import AppointmentsTable from '@/components/admin/AppointmentsTable';
import AdminNav from '@/components/admin/AdminNav';
import AdminWelcome from '@/components/admin/AdminWelcome';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <AdminWelcome/>
      <AdminNav />
      <AppointmentsTable />
    </main>
  );
}
