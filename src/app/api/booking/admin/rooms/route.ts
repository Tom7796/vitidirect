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

    const { data: rooms, error } = await supabase
      .from('rooms')
      .select(`
        *,
        pricing(price_per_session)
      `)
      .order('name');

    if (error) {
      console.error('Rooms fetch error:', error);
      return Response.json(
        { message: 'Failed to fetch rooms' },
        { status: 500 }
      );
    }

    const formattedRooms = rooms.map((room: any) => ({
      ...room,
      price_per_session: room.pricing?.[0]?.price_per_session || 0,
    }));

    return Response.json(formattedRooms);
  } catch (error) {
    console.error('Rooms error:', error);
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

    const { name, type, capacity, amenities, price_per_session, description } = await request.json();

    if (!name || !type || !capacity) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create room
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .insert([
        {
          name,
          type,
          capacity,
          amenities: amenities || [],
          description,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (roomError) {
      console.error('Room creation error:', roomError);
      return Response.json(
        { message: 'Failed to create room' },
        { status: 400 }
      );
    }

    // Create pricing
    if (price_per_session) {
      await supabase
        .from('pricing')
        .insert([
          {
            room_id: room.id,
            duration_minutes: 60,
            price_per_session,
          },
        ]);
    }

    return Response.json({ ...room, price_per_session: price_per_session || 0 }, { status: 201 });
  } catch (error) {
    console.error('Room creation error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
