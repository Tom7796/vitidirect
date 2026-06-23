'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut, BarChart3, Users, DollarSign, Calendar } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  amenities: string[];
  is_active: boolean;
  price_per_session: number;
}

interface Booking {
  id: string;
  user_name: string;
  room_name: string;
  start_time: string;
  end_time: string;
  status: string;
  number_of_attendees: number;
}

export default function AdminDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'rooms' | 'bookings'>('dashboard');
  const [showNewRoomForm, setShowNewRoomForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'meeting_room',
    capacity: 4,
    amenities: '',
    price_per_session: 50,
  });

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/booking/admin/rooms', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/booking/admin/bookings', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/booking/login';
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/booking/admin/rooms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newRoom,
          amenities: newRoom.amenities.split(',').map(a => a.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        fetchRooms();
        setShowNewRoomForm(false);
        setNewRoom({
          name: '',
          type: 'meeting_room',
          capacity: 4,
          amenities: '',
          price_per_session: 50,
        });
      }
    } catch (error) {
      console.error('Failed to add room:', error);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/booking/admin/rooms/${roomId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          fetchRooms();
        }
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  const stats = {
    totalRooms: rooms.length,
    totalBookings: bookings.length,
    totalRevenue: rooms.reduce((sum, r) => sum + (r.price_per_session || 0), 0),
    activeBookings: bookings.filter(b => b.status === 'confirmed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
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
            {(['dashboard', 'rooms', 'bookings'] as const).map((tab) => (
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
        {selectedTab === 'dashboard' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Rooms</p>
                    <p className="text-3xl font-bold text-primary mt-1">{stats.totalRooms}</p>
                  </div>
                  <BarChart3 className="h-12 w-12 text-primary/20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold text-secondary mt-1">{stats.totalBookings}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-secondary/20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Bookings</p>
                    <p className="text-3xl font-bold text-accent mt-1">{stats.activeBookings}</p>
                  </div>
                  <Users className="h-12 w-12 text-accent/20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">${stats.totalRevenue}</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-green-600/20" />
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Member</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Room</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Date & Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Attendees</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-blue-50/50">
                        <td className="py-3 px-4 text-foreground">{booking.user_name}</td>
                        <td className="py-3 px-4 text-foreground">{booking.room_name}</td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">
                          {new Date(booking.start_time).toLocaleDateString()} {new Date(booking.start_time).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-4 text-foreground">{booking.number_of_attendees}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : selectedTab === 'rooms' ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Manage Rooms</h2>
              <button
                onClick={() => setShowNewRoomForm(!showNewRoomForm)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Room
              </button>
            </div>

            {showNewRoomForm && (
              <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Create New Room</h3>
                <form onSubmit={handleAddRoom} className="space-y-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Room Name</label>
                    <input
                      type="text"
                      value={newRoom.name}
                      onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                      className="w-full border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Room Type</label>
                    <select
                      value={newRoom.type}
                      onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                      className="w-full border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="meeting_room">Meeting Room</option>
                      <option value="zoom_room">Zoom Room</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Capacity</label>
                    <input
                      type="number"
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                      className="w-full border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Price per Session</label>
                    <input
                      type="number"
                      value={newRoom.price_per_session}
                      onChange={(e) => setNewRoom({ ...newRoom, price_per_session: parseFloat(e.target.value) })}
                      className="w-full border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Amenities (comma-separated)</label>
                    <input
                      type="text"
                      value={newRoom.amenities}
                      onChange={(e) => setNewRoom({ ...newRoom, amenities: e.target.value })}
                      placeholder="Whiteboard, Projector, Video Conference"
                      className="w-full border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="col-span-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Create Room
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewRoomForm(false)}
                      className="flex-1 bg-muted text-muted-foreground font-semibold py-2 rounded-lg hover:bg-muted/90 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-4 border-b border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-foreground">{room.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize mt-1">{room.type.replace('_', ' ')}</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        room.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {room.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-semibold text-foreground">{room.capacity} people</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold text-foreground">${room.price_per_session}</span>
                    </div>
                    {room.amenities && room.amenities.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 pt-3 border-t border-border">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-secondary/10 text-secondary font-medium py-2 rounded hover:bg-secondary/20 transition-colors">
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-medium py-2 rounded hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">All Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Member</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Room</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Attendees</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border hover:bg-blue-50/50">
                      <td className="py-3 px-4 text-foreground font-medium">{booking.user_name}</td>
                      <td className="py-3 px-4 text-foreground">{booking.room_name}</td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {new Date(booking.start_time).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4 text-foreground">{booking.number_of_attendees}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
