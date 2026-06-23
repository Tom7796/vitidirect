'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';

interface Booking {
  id: string;
  title: string;
  room_name: string;
  start_time: string;
  end_time: string;
  status: string;
  number_of_attendees: number;
}

interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  amenities: string[];
  price_per_session: number;
}

export default function MemberDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'book' | 'history'>('overview');

  useEffect(() => {
    fetchBookings();
    fetchAvailableRooms();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/booking/member/bookings', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch('/api/booking/rooms');
      const data = await response.json();
      setAvailableRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/booking/login';
  };

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.start_time) > new Date() && b.status === 'confirmed'
  );

  const pastBookings = bookings.filter(
    (b) => new Date(b.start_time) <= new Date() || b.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">CoWork Spaces</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {(['overview', 'book', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-2 font-medium border-b-2 transition-colors capitalize ${
                  selectedTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : selectedTab === 'overview' ? (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Upcoming Bookings</p>
                    <p className="text-3xl font-bold text-primary mt-1">{upcomingBookings.length}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-secondary/30" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold text-secondary mt-1">{bookings.length}</p>
                  </div>
                  <MapPin className="h-12 w-12 text-secondary/30" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Available Rooms</p>
                    <p className="text-3xl font-bold text-accent mt-1">{availableRooms.length}</p>
                  </div>
                  <Users className="h-12 w-12 text-accent/30" />
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Bookings</h2>
              {upcomingBookings.length === 0 ? (
                <p className="text-muted-foreground">No upcoming bookings. <Link href="/booking/member?tab=book" className="text-primary font-medium hover:underline">Book a room now!</Link></p>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-border rounded-lg p-4 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-foreground">{booking.title}</h3>
                          <p className="text-sm text-muted-foreground">{booking.room_name}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(booking.start_time).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(booking.start_time).toLocaleTimeString()} - {new Date(booking.end_time).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {booking.number_of_attendees} attendees
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : selectedTab === 'book' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Available Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRooms.map((room) => (
                <div key={room.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{room.type.replace('_', ' ')}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-secondary" />
                      <span className="text-foreground">Up to {room.capacity} people</span>
                    </div>
                    {room.amenities && room.amenities.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-secondary/10 text-secondary px-2.5 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-3">Starting from</p>
                      <button className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Booking History</h2>
            {pastBookings.length === 0 ? (
              <p className="text-muted-foreground">No past bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-border rounded-lg p-4 opacity-75"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-foreground">{booking.title}</h3>
                        <p className="text-sm text-muted-foreground">{booking.room_name}</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(booking.start_time).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {new Date(booking.start_time).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {booking.number_of_attendees} attendees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
