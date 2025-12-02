# Profile Page & UploadThing Setup

## Profile Page Location

✅ **Moved to:** `app/dashboard/profile/page.tsx`

The profile settings page is now properly integrated into the dashboard as a subpage, accessible via the sidebar navigation at `/dashboard/profile`.

## UploadThing Configuration

### 1. Environment Variables

Already configured in `.env`:

```env
UPLOADTHING_SECRET='sk_live_9d9beb9f54dae5824ad8fc77504fd4b60302332a9df7287d00ca584e4d42d7e5'
UPLOADTHING_APP_ID='8s0932o5ze'
```

### 2. File Router

**Location:** `lib/uploadthing.ts`

**Configured Endpoints:**

- `profileImage` - User profile pictures (4MB max, images only)
- `cvUploader` - CV/Resume files (8MB max, PDF only)
- `transcriptUploader` - Academic transcripts (8MB max, PDF only)

**Security:**

- All endpoints require authentication
- Middleware validates user session
- Returns userId for tracking uploads

### 3. API Route

**Location:** `app/api/uploadthing/route.ts`

Handles GET and POST requests for file uploads using the configured router.

### 4. Tailwind Configuration

**Updated:** `tailwind.config.ts`

Added UploadThing components to content array for proper styling:

```typescript
content: [
  // ... existing paths
  './node_modules/@uploadthing/react/dist/**/*.{js,ts,jsx,tsx}',
];
```

### 5. Custom Styling

**Added to:** `app/globals.css`

Custom CSS classes for UploadThing components:

- `.ut-button` - Styled to match theme colors
- `.ut-allowed-content` - File type descriptions
- `.ut-uploading` - Upload progress states
- `.ut-label` - Form labels
- Hover, focus, and disabled states

### 6. React Components

**Exported from:** `lib/uploadthing.ts`

```typescript
export const { UploadButton, UploadDropzone } =
  generateReactHelpers<OurFileRouter>();
```

**Usage in Profile Page:**

```tsx
<UploadButton
  endpoint="profileImage"
  onClientUploadComplete={(res) => {
    // Handle successful upload
    handleInputChange('photoUrl', res[0].url);
    toast.success('Profile picture uploaded!');
  }}
  onUploadError={(error: Error) => {
    toast.error(`Upload failed: ${error.message}`);
  }}
/>
```

## Dashboard Integration

### Navigation

The profile page is accessible via:

1. Sidebar menu: `/dashboard/profile`
2. User dropdown menu (top-right)
3. Direct URL navigation

### Layout Structure

```
app/dashboard/
├── layout.tsx          # Dashboard layout with sidebar
├── page.tsx            # Dashboard home
└── profile/
    └── page.tsx        # Profile settings page
```

### Features Available

- ✅ Personal information editing
- ✅ Education details management
- ✅ Professional profile (skills, links)
- ✅ File uploads (profile image, CV, transcript)
- ✅ Preferences configuration
- ✅ Real-time session updates
- ✅ Toast notifications for feedback

## Testing UploadThing

### 1. Profile Image Upload

- Navigate to `/dashboard/profile`
- Go to "Personal" tab
- Click "Choose File" under profile picture
- Select an image (JPG, PNG, GIF - max 4MB)
- Upload completes and image displays immediately

### 2. CV Upload

- Go to "Documents" tab
- Click "Choose File" under CV/Resume
- Select a PDF file (max 8MB)
- Link to view uploaded CV appears

### 3. Transcript Upload

- Go to "Education" tab
- Click "Choose File" under Academic Transcript
- Select a PDF file (max 8MB)
- Link to view transcript appears

## Troubleshooting

### Upload Fails

- Check UPLOADTHING environment variables are set
- Verify file size is within limits
- Ensure file type matches endpoint configuration
- Check browser console for detailed errors

### Styling Issues

- Verify tailwind.config.ts includes UploadThing path
- Check globals.css has UploadThing custom styles
- Clear browser cache and restart dev server

### Authentication Errors

- Ensure user is logged in
- Verify session is valid
- Check authOptions configuration in lib/auth.ts

## File Size Limits

- Profile Images: 4MB
- CV/Resume: 8MB
- Transcripts: 8MB

## Supported File Types

- **Images:** JPG, JPEG, PNG, GIF, WEBP
- **Documents:** PDF only

## API Endpoints Summary

1. `POST /api/uploadthing` - Upload files
2. `GET /api/uploadthing` - Get upload status
3. `GET /api/profile` - Fetch user profile data
4. `PUT /api/profile` - Update user profile data

---

**Status:** ✅ Fully Configured and Ready to Use
**Last Updated:** November 30, 2025
