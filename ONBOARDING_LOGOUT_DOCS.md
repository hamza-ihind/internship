# Onboarding & Logout System Documentation

## Overview

This document describes the implementation of the user onboarding and logout systems for the InternLink platform.

## Logout System

### Components Created

1. **`app/logout/page.tsx`**
   - Client component that handles user logout
   - Uses NextAuth's `signOut()` function
   - Redirects to home page after logout
   - Shows loading spinner during logout

### Implementation Details

- Uses `useEffect` hook to trigger logout on page load
- Calls `signOut({ redirect: false })` to prevent automatic redirect
- Manually redirects to `/` using Next.js router
- Clears all session data and JWT tokens

### Usage

- Users can access `/logout` route to log out
- Sidebar and navbar have logout buttons that navigate to `/logout`
- Session is completely terminated on logout

---

## Onboarding System

### Overview

The onboarding system guides new users through profile setup with a 3-step wizard:

1. **Personal Info** - Phone, city, country, date of birth
2. **Education** - University, faculty, degree, level, graduation year
3. **Preferences** - Skills, preferred locations, work mode, social links

### Database Schema

#### User Model Changes

Added to `prisma/schema.prisma`:

```prisma
model User {
  // ... existing fields
  onboardingCompleted Boolean @default(false)
  phone               String?
  city                String?
  country             String?
  dateOfBirth         DateTime?
  // ... rest of fields
}
```

### Components Created

#### 1. Onboarding Page (`app/onboarding/page.tsx`)

- Multi-step form with progress indicator
- Step 1: Personal information
- Step 2: Educational background
- Step 3: Preferences and skills
- Visual progress bar showing completion percentage
- Navigation buttons (Back/Next/Complete)
- Skip option for users who want to complete later

#### 2. Onboarding API (`app/api/onboarding/route.ts`)

- **POST `/api/onboarding`**: Completes onboarding
  - Validates required fields
  - Updates user's `onboardingCompleted` flag
  - Stores profile data
  - Returns success/error response
- **GET `/api/onboarding`**: Checks onboarding status
  - Returns whether user has completed onboarding
  - Used for conditional routing

### Authentication Integration

#### NextAuth Configuration (`lib/auth.ts`)

Updated to include onboarding status:

- JWT callback fetches `onboardingCompleted` from database
- Session callback includes `onboardingCompleted` in session object
- Refreshes onboarding status on each request

#### Type Definitions (`next-auth.d.ts`)

Extended NextAuth types:

```typescript
interface Session {
  user: {
    // ... existing fields
    onboardingCompleted?: boolean;
  };
}

interface JWT {
  // ... existing fields
  onboardingCompleted?: boolean;
}
```

### Middleware Protection (`middleware.ts`)

#### Onboarding Redirect Logic

```typescript
- If user is authenticated but hasn't completed onboarding:
  - Allow access to: /auth/*, /api/onboarding, /onboarding
  - Redirect to /onboarding for: /dashboard/*, /admin/*, /settinggs/*
```

#### Flow

1. User logs in successfully
2. Middleware checks `onboardingCompleted` status
3. If false, redirects to `/onboarding` page
4. User completes onboarding steps
5. API updates `onboardingCompleted` to true
6. User is redirected to `/dashboard`
7. Subsequent requests pass middleware check

### User Experience Flow

#### New User Journey

```
Login → Check onboarding status →
  ↓ (if not completed)
/onboarding → Complete 3 steps → API call →
  ↓
Update session → Redirect to /dashboard
```

#### Returning User Journey

```
Login → Check onboarding status →
  ↓ (if completed)
/dashboard (no redirect)
```

### Features

#### Progress Tracking

- Visual progress bar
- Step indicators with icons
- Completed step checkmarks
- Current step highlighting

#### Form Validation

- Required fields: university, faculty, degree, level, skills
- Optional fields: phone, city, date of birth, social links
- Client-side validation before API submission

#### Data Storage

- Personal info stored in User model
- Educational background and preferences stored in Profile model
- Skills and locations parsed from comma-separated strings

#### Skip Option

- Users can skip onboarding temporarily
- Access to dashboard still restricted until completion
- Can return to complete onboarding later

### API Endpoints

#### POST /api/onboarding

**Request Body:**

```json
{
  "phone": "+212 612345678",
  "city": "Casablanca",
  "country": "Morocco",
  "dateOfBirth": "2000-01-01",
  "university": "Mohammed V University",
  "faculty": "Faculty of Sciences",
  "degree": "Bachelor's",
  "level": "3rd Year",
  "graduationYear": 2025,
  "skills": ["JavaScript", "React", "Node.js"],
  "preferredLocations": ["Casablanca", "Rabat"],
  "workMode": "HYBRID",
  "linkedinUrl": "https://linkedin.com/in/user",
  "githubUrl": "https://github.com/user"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Onboarding completed successfully"
}
```

#### GET /api/onboarding

**Response:**

```json
{
  "onboardingCompleted": false
}
```

### UI Components Used

- **Card**: Container for form sections
- **Input**: Text input fields
- **Textarea**: Multi-line text input for skills
- **Button**: Navigation and submission
- **Progress**: Visual progress indicator
- **Label**: Form field labels
- **Icons**: Lucide icons for visual enhancement

### Error Handling

- API validation errors displayed to user
- Toast notifications for success/failure
- Loading states during submission
- Graceful fallbacks for missing data

### Testing

To test the onboarding system:

1. Create a new user account
2. Log in with the new account
3. Should automatically redirect to `/onboarding`
4. Complete the 3-step form
5. Click "Complete Onboarding"
6. Should redirect to `/dashboard`
7. Subsequent logins should skip onboarding

### Maintenance Notes

- Ensure database has `onboardingCompleted` field before deployment
- Run `npx prisma db push` to sync schema
- Profile table may need to be created if not exists
- Consider adding profile completion percentage for partial completion

### Future Enhancements

- [ ] Add profile completion percentage
- [ ] Allow editing profile after onboarding
- [ ] Add file upload for resume/CV
- [ ] Add profile picture upload
- [ ] Email notification on completion
- [ ] Analytics tracking for drop-off rates
- [ ] Mobile-responsive improvements
- [ ] Accessibility enhancements (ARIA labels)

---

## Implementation Summary

### Files Created/Modified

1. ✅ `app/logout/page.tsx` - Logout page
2. ✅ `app/onboarding/page.tsx` - Onboarding wizard
3. ✅ `app/api/onboarding/route.ts` - Onboarding API
4. ✅ `prisma/schema.prisma` - Added onboardingCompleted field
5. ✅ `lib/auth.ts` - Updated JWT and session callbacks
6. ✅ `next-auth.d.ts` - Extended type definitions
7. ✅ `middleware.ts` - Added onboarding redirect logic
8. ✅ `components/layout/sidebar.tsx` - Updated logout button

### Database Changes

- Added `onboardingCompleted` Boolean field to User model (default: false)
- Added personal info fields: phone, city, country, dateOfBirth

### Routes Added

- `/logout` - Logout page
- `/onboarding` - Onboarding wizard
- `/api/onboarding` - Onboarding API (GET/POST)

### Security Considerations

- Middleware enforces onboarding completion
- API validates authentication before updates
- Session data refreshed after onboarding
- Protected routes blocked until onboarding complete

---

**Last Updated:** December 2024  
**Status:** ✅ Implemented and Ready for Testing
