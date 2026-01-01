# Vercel Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Readiness
- [x] All Supabase client initializations use lazy loading (client-side only)
- [x] No hardcoded environment variables
- [x] TypeScript compilation passes
- [x] Build completes successfully
- [x] All pages marked as dynamic where needed

### Environment Variables Required

Add these in Vercel Dashboard → Settings → Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Get from: Supabase Dashboard → Settings → API → Project URL
   - Example: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Get from: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`
   - This is safe to expose publicly (it's the anon key)

### Supabase Setup Required

Before deploying, ensure your Supabase project has:

1. **Database Migrations Applied**
   - All migrations in `supabase/migrations/` should be applied
   - Run locally: `npm run supabase:push`
   - Or apply manually via Supabase SQL Editor

2. **Row Level Security (RLS) Policies**
   - ✅ Public SELECT access to `guests` table (for RSVP search)
   - ✅ Public INSERT access to `rsvps` table (for RSVP submissions)
   - ✅ Public UPDATE access to `guests.email` (for RSVP email updates)
   - ✅ Public SELECT/INSERT/DELETE access to `photos` table (for photo booth)
   - ✅ Storage bucket "photos" created with public access

3. **Storage Bucket**
   - Create bucket named "photos"
   - Set to public
   - Allow uploads from anonymous users

### Vercel Deployment Steps

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import from GitHub: `jamie-pacer/wedding-website`

2. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Apply to: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Check build logs for any errors

### Post-Deployment Verification

1. **Test Guest Pages**
   - [ ] Home page loads correctly
   - [ ] RSVP page loads and search works
   - [ ] Photo booth page loads
   - [ ] All images display correctly

2. **Test Functionality**
   - [ ] RSVP form submission works
   - [ ] Guest name search works
   - [ ] Photo upload works (if implemented)
   - [ ] Photo gallery displays

3. **Check Console**
   - Open browser DevTools
   - Check for any console errors
   - Verify no CORS or authentication errors

### Troubleshooting

**Build Fails with Supabase Error**
- Ensure environment variables are set in Vercel
- Check that variable names match exactly (case-sensitive)
- Verify Supabase project is active

**RSVP Search Not Working**
- Check RLS policies allow public SELECT on guests table
- Verify Supabase URL and key are correct
- Check browser console for errors

**Photos Not Loading**
- Verify storage bucket "photos" exists and is public
- Check RLS policies on photos table
- Verify image URLs in Next.js config match Supabase domain

**Static Generation Errors**
- Pages using Supabase should be client-side only or marked as dynamic
- Check that `createClient()` is only called in browser context

### Notes

- The middleware warning about "proxy" is just a deprecation notice and doesn't affect functionality
- All pages are currently static except photo-booth and rsvp which use lazy client initialization
- The admin dashboard uses mock data and doesn't require Supabase setup for basic functionality

