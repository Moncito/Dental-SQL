import AdminNav from '@/components/admin/AdminNav'
import AdminWelcome from '@/components/admin/AdminWelcome'
import CompletedAppointments from '@/components/admin/CompletedAppointments'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminWelcome/>
        <AdminNav/>
        <CompletedAppointments />
    </div>
  )
}

export default page
