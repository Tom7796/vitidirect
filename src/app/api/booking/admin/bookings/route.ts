import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
    : (null as never);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function verifyToken(authorization: string | null) {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authorization.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    if (decoded.role !== 'admin') {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const decoded = verifyToken(authorization);

    if (!decoded) {
      return Response.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        id,
        title,
        start_time,
        end_time,
        status,
        number_of_attendees,
        rooms(name),
        users(full_name)
      `)
      .order('start_time', { ascending: false });

    if (error) {
      console.error('Bookings fetch error:', error);
      return Response.json(
        { message: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    const formattedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      title: booking.title,
      room_name: booking.rooms?.name || 'Unknown Room',
      user_name: booking.users?.full_name || 'Unknown User',
      start_time: booking.start_time,
      end_time: booking.end_time,
      status: booking.status,
      number_of_attendees: booking.number_of_attendees,
    }));

    return Response.json(formattedBookings);
  } catch (error) {
    console.error('Bookings error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
