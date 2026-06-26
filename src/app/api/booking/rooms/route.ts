import { createClient } from '@supabase/supabase-js';

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
    : (null as never);

export async function GET(request: Request) {
  try {
    // Get all active rooms with their pricing
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Rooms fetch error:', error);
      return Response.json(
        { message: 'Failed to fetch rooms' },
        { status: 500 }
      );
    }

    // Get pricing for each room
    const roomsWithPricing = await Promise.all(
      rooms.map(async (room) => {
        const { data: pricing } = await supabase
          .from('pricing')
          .select('price_per_session')
          .eq('room_id', room.id)
          .order('duration_minutes')
          .limit(1)
          .single();

        return {
          ...room,
          price_per_session: pricing?.price_per_session || 0,
        };
      })
    );

    return Response.json(roomsWithPricing);
  } catch (error) {
    console.error('Rooms error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
