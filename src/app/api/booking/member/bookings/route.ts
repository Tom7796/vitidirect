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
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
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

    // Get member's bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        id,
        title,
        start_time,
        end_time,
        status,
        number_of_attendees,
        rooms(name)
      `)
      .eq('user_id', decoded.userId)
      .order('start_time', { ascending: false });

    if (error) {
      console.error('Bookings fetch error:', error);
      return Response.json(
        { message: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    // Transform the response
    const formattedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      title: booking.title,
      room_name: booking.rooms?.name || 'Unknown Room',
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

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const decoded = verifyToken(authorization);

    if (!decoded) {
      return Response.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { room_id, start_time, end_time, title, number_of_attendees, special_requests } = await request.json();

    if (!room_id || !start_time || !end_time || !title) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: decoded.userId,
          room_id,
          start_time,
          end_time,
          title,
          number_of_attendees,
          special_requests,
          status: 'confirmed',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Booking creation error:', error);
      return Response.json(
        { message: 'Failed to create booking' },
        { status: 400 }
      );
    }

    return Response.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
