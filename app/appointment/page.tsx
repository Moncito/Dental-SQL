'use client';

import { useState, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  StickyNote,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  const availableTimes = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time.');
      return;
    }

    try {
      const res = await fetch('/api/save-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          PhoneNumber: phoneNumber, // Must match server-side key exactly
          service,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          notes,
        }),
      });

      if (!res.ok) throw new Error('Failed to save appointment');
      toast.success('Appointment booked! See you at Dentty 🦷');
      setTimeout(() => {
        window.location.href = '/appointment/success';
      }, 1000);
    } catch (error) {
      toast.error('Error booking appointment. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-black mb-12">Dentty Appointment</h1>

        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-xl p-8">
          {/* Left Panel - Date & Times */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
            <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
              <CalendarDays className="w-5 h-5 mr-2" />
              Select Date
            </h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              className="w-full"
            />

            <h3 className="flex items-center text-lg font-semibold mt-8 text-blue-600">
              <Clock className="w-5 h-5 mr-2" />
              Available Times
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-md border text-sm font-medium transition ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-black border-gray-300 hover:border-blue-500'
                  }`}
                  type="button"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
            <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
              <CalendarDays className="w-5 h-5 mr-2" />
              Appointment Details
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <select
                  className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                >
                  <option value="">Select Service</option>
                  <option>Teeth Cleaning</option>
                  <option>Braces Consultation</option>
                  <option>Tooth Extraction</option>
                </select>
              </div>
              <div className="relative">
                <StickyNote className="absolute left-3 top-3 text-gray-500" />
                <textarea
                  rows={4}
                  placeholder="Additional Notes (optional)"
                  className="w-full pl-10 pr-3 pt-3 border rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
              >
                Submit Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
