# CoWork Spaces - Booking System

A modern coworking space booking system with separate portals for members and administrators.

## Features

### Member Portal
- **Browse Rooms**: View all available meeting and Zoom rooms
- **Book Rooms**: Easy-to-use booking calendar with room selection
- **Manage Bookings**: View upcoming bookings and booking history
- **Dashboard**: Quick overview of upcoming bookings and statistics

### Admin Portal
- **Room Management**: Create, edit, and delete meeting/Zoom rooms
- **Pricing Management**: Set pricing for each room
- **View All Bookings**: Monitor all bookings across the platform
- **Dashboard Analytics**: View key metrics and recent bookings

## Color Palette

The application uses a professional, modern color scheme:
- **Primary**: Deep Blue (#1e3a8a / hsl(217 91% 29%))
- **Secondary**: Cyan Teal (#0891b2 / hsl(188 97% 35%))
- **Accent**: Warm Coral (#ff6b35 / hsl(16 100% 60%))
- **Sage Green**: #6b9080 (for secondary accents)

## Technology Stack

- **Frontend**: Next.js 16 with React 19 & TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens
- **Icons**: Lucide React

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret_key
```

3. Initialize the database by running the SQL schema:
```bash
# Use the booking-schema.sql file to create tables in your Supabase database
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000/booking/login` to access the application.

## Database Schema

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `password_hash`: Hashed password
- `full_name`: User's full name
- `role`: 'member' or 'admin'
- `company_name`: Optional company name
- `phone`: Optional phone number
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Rooms Table
- `id`: UUID primary key
- `name`: Room name
- `type`: 'meeting_room' or 'zoom_room'
- `capacity`: Maximum number of people
- `amenities`: Array of amenities
- `image_url`: Optional room image
- `is_active`: Active/inactive status
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Pricing Table
- `id`: UUID primary key
- `room_id`: Reference to rooms table
- `duration_minutes`: Session duration (30, 60, 120 minutes)
- `price_per_session`: Price amount
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Bookings Table
- `id`: UUID primary key
- `user_id`: Reference to users table
- `room_id`: Reference to rooms table
- `start_time`: Booking start time
- `end_time`: Booking end time
- `title`: Booking title
- `description`: Optional description
- `status`: 'confirmed', 'cancelled', or 'completed'
- `number_of_attendees`: Number of people attending
- `special_requests`: Optional special requests
- `created_at`: Timestamp
- `updated_at`: Timestamp

## API Endpoints

### Authentication
- `POST /api/booking/auth/login` - Login user
- `POST /api/booking/auth/signup` - Register new user

### Rooms
- `GET /api/booking/rooms` - Get all active rooms

### Member Bookings
- `GET /api/booking/member/bookings` - Get member's bookings
- `POST /api/booking/member/bookings` - Create new booking

### Admin Routes
- `GET /api/booking/admin/rooms` - Get all rooms (admin only)
- `POST /api/booking/admin/rooms` - Create new room (admin only)
- `DELETE /api/booking/admin/rooms/[id]` - Delete room (admin only)
- `GET /api/booking/admin/bookings` - Get all bookings (admin only)

## Demo Accounts

### Member Account
- Email: `member@example.com`
- Password: `password123`

### Admin Account
- Email: `admin@example.com`
- Password: `password123`

## File Structure

```
src/
├── app/
│   ├── booking/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── member/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       └── page.tsx
│   └── api/
│       └── booking/
│           ├── auth/
│           │   ├── login/
│           │   │   └── route.ts
│           │   └── signup/
│           │       └── route.ts
│           ├── rooms/
│           │   └── route.ts
│           ├── member/
│           │   └── bookings/
│           │       └── route.ts
│           └── admin/
│               ├── rooms/
│               │   └── route.ts
│               └── bookings/
│                   └── route.ts
```

## Future Enhancements

- Real password hashing with bcrypt
- Email notifications for bookings
- Calendar view with availability
- Payment integration
- Room availability checks
- Multi-day bookings
- Recurring bookings
- Advanced filtering and search
- Export bookings to CSV
- SMS notifications
- Mobile app

## Security Notes

- Passwords are currently stored as plain text for demo purposes. Use bcrypt in production.
- JWT tokens expire after 24 hours
- All admin routes verify user role
- Database uses row-level security policies (recommended to implement)

## License

MIT
