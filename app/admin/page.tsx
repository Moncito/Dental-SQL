import { adminAuthGuard } from '@/lib/middleware/adminAuthGuard';
import AppointmentsTable from '@/components/admin/AppointmentsTable';
import AdminNav from '@/components/admin/AdminNav';
import AdminWelcome from '@/components/admin/AdminWelcome';

export default async function AdminPage() {
  await adminAuthGuard(); // ✅ Lock this page down to admins only

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <AdminWelcome />
      <AdminNav />
      <AppointmentsTable />
    </main>
  );
}
