import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'
);

export async function POST(request: Request) {
  try {
    const { email, password, full_name, phone, company_name } = await request.json();

    if (!email || !password || !full_name) {
      return Response.json(
        { message: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return Response.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }

    // Create new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: password, // In production, hash the password
          full_name,
          phone: phone || null,
          company_name: company_name || null,
          role: 'member', // New users are members by default
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Signup error:', error);
      return Response.json(
        { message: 'Failed to create account' },
        { status: 400 }
      );
    }

    return Response.json(
      {
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          full_name: newUser.full_name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
