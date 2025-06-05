'use client';

import { usePathname } from 'next/navigation';

export default function AdminWelcome() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === '/admin') return 'All Appointment Requests';
    if (pathname.includes('scheduled')) return 'Scheduled Appointments';
    if (pathname.includes('cancelled')) return 'Cancelled Appointments';
    if (pathname.includes('completed')) return 'Completed Appointments';
    return 'Admin Panel';
  };

  const getSubtitle = () => {
    if (pathname === '/admin')
      return 'Review all incoming dental appointments before approval.';
    if (pathname.includes('scheduled'))
      return "You're viewing all scheduled appointments. Stay on top of today’s checkups.";
    if (pathname.includes('cancelled'))
      return 'These appointments were cancelled. Follow up if necessary.';
    if (pathname.includes('completed'))
      return 'These are finalized appointments. Delete records if no longer needed.';
    return 'Manage appointments and patient engagement.';
  };

  const getTitleColor = () => {
    if (pathname.includes('scheduled')) return 'text-green-700';
    if (pathname.includes('cancelled')) return 'text-red-700';
    if (pathname.includes('completed')) return 'text-purple-700';
    return 'text-blue-800';
  };

  return (
    <div className="mb-6 text-center py-5">
      <h1 className='text-2xl'>DENTTY ADMIN PANEL</h1>
      <h1 className={`text-5xl font-extrabold tracking-tight ${getTitleColor()}`}>
        {getTitle()}
      </h1>
      <p className="mt-2 text-sm text-gray-600">{getSubtitle()}</p>
    </div>
  );
}
