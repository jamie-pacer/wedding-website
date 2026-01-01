# Natalie & James Wedding Website

A beautiful, elegant wedding website built with Next.js 14, Tailwind CSS, and Supabase.

## Features

### Guest-Facing Pages
- **Home Page** - Hero section with couple names, wedding date, venue, engagement photo, and wedding details
- **RSVP** - Full-featured RSVP form with guest management, dietary requirements, and song requests
- **Registry** - Coming soon placeholder
- **Accommodation** - Coming soon placeholder

### Planner Dashboard
- **Dashboard** - Overview with RSVP statistics, recent responses, and quick actions
- **RSVP Management** - Full table view with search, filters, and detailed view modal
- **Guest List** - Manage invited guests with groups and plus-one settings
- **Authentication** - Secure login for wedding planners

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings) + Lato (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account

### Installation

1. Clone the repository and install dependencies:

```bash
cd wedding-website
npm install
```

2. Set up your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase/schema.sql`
   - Copy your project URL and anon key from Settings > API

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) for the guest site and [http://localhost:3000/login](http://localhost:3000/login) for the admin dashboard.

## Project Structure

```
src/
├── app/
│   ├── (guest)/           # Guest-facing pages
│   │   ├── page.tsx       # Home page
│   │   ├── rsvp/          # RSVP form
│   │   ├── registry/      # Registry (coming soon)
│   │   └── accommodation/ # Accommodation (coming soon)
│   ├── (admin)/           # Admin pages
│   │   ├── login/         # Login page
│   │   └── dashboard/     # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & theme
├── components/            # Reusable components
├── lib/
│   └── supabase/          # Supabase client configuration
└── middleware.ts          # Auth middleware
```

## Customization

### Wedding Details
Edit the home page at `src/app/(guest)/page.tsx` to update:
- Couple names
- Wedding date and time
- Venue information
- Story text

### Theme Colors
Modify CSS variables in `src/app/globals.css`:
- Primary cream/ivory tones
- Dusty rose and sage florals
- Blue accent colors

### Adding Your Engagement Photo
Replace the placeholder in the home page with your actual photo:

```tsx
<Image
  src="/engagement-photo.jpg"
  alt="Natalie and James engagement photo"
  fill
  className="object-cover"
/>
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
4. Deploy!

**Important**: Make sure your Supabase project has the following configured:
- Database migrations applied (run `npm run supabase:push` or apply migrations manually)
- Row Level Security (RLS) policies set up for public access to guests table (for RSVP search)
- Storage bucket "photos" created with public access (for photo booth feature)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Self-hosted with `npm run build && npm start`

**Required Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## Wedding Details

- **Date**: 24th October 2024
- **Venue**: Die Woud, Caledon, South Africa
- **Couple**: Natalie Lacey & James Shuttleworth

---

Made with ❤️ for Natalie & James
