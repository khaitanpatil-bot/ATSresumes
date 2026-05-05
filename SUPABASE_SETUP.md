# Supabase Integration Setup Guide

## ✅ What's Been Done

1. **Supabase Client**: Created in `src/supabase.js` with your credentials
2. **Authentication Hook**: Created `src/hooks/useAuth.js` for managing user auth state
3. **Auth Component**: Created `src/components/Auth.jsx` for login/signup UI
4. **Resume Manager**: Created `src/components/ResumeManager.jsx` for file management
5. **App Integration**: Updated `src/App.jsx` to use authentication

## 🔧 Next Steps

### Step 1: Create Supabase Tables

Go to your Supabase Dashboard → Table Editor and create these tables:

#### Table: `resumes`
```
Column Name    | Type      | Extra Settings
-------------------------------------------
id             | UUID      | Primary Key, Auto
user_id        | UUID      | Foreign Key (auth.users)
filename       | text      | 
content        | text      | Store file content
created_at     | timestamp | Auto now()
updated_at     | timestamp | Auto now()
```

#### Table: `jobs` (Optional - for job matcher)
```
Column Name    | Type      | Extra Settings
-------------------------------------------
id             | UUID      | Primary Key, Auto
user_id        | UUID      | Foreign Key (auth.users)
title          | text      |
description    | text      |
requirements   | text      |
created_at     | timestamp | Auto now()
```

### Step 2: Enable Row Level Security (RLS)

1. In Supabase Dashboard, go to **Authentication → Policies**
2. For **resumes** table, create policy:
   - Allow `SELECT, UPDATE, DELETE` where `user_id = auth.uid()`
   - Allow `INSERT` where `user_id = auth.uid()`
3. For **jobs** table, do the same

### Step 3: Create Storage Bucket for Resumes

To store the actual uploaded PDF/DOCX files (so users can download them later):
1. In Supabase Dashboard, go to **Storage** on the left menu.
2. Click **New bucket**.
3. Name the bucket `resumes` (must be exactly this name).
4. You can leave it as a **Private** bucket (do NOT check "Public").

### Step 4: Enable Storage Security Policies

Since it's a private bucket, you need to allow users to upload, download, and delete their own files.
1. In **Storage**, select your `resumes` bucket.
2. Click on the **Policies** tab (or go to **Authentication → Policies** and filter by `storage.objects`).
3. Click **New Policy** for the `resumes` bucket.
4. Select **For full customization** and use these rules:
   - **Policy Name:** `Allow users to access their own files`
   - **Allowed Operations:** Check `SELECT`, `INSERT`, `UPDATE`, `DELETE`
   - **Target Roles:** `authenticated`
   - **Using expression:** `(bucket_id = 'resumes'::text) AND (auth.uid() = (storage.foldername(name))[1]::uuid)`
   - **With check expression:** `(bucket_id = 'resumes'::text) AND (auth.uid() = (storage.foldername(name))[1]::uuid)`
5. Save the policy. This ensures users can only access files inside their own user ID folder!

### Step 5: Setup Email Confirmation (Optional but Recommended)

1. Go to **Authentication → Providers → Email**
2. Enable "Confirm email" if you want email verification
3. Configure email templates

### Step 6: Test the App

1. The app now requires login before accessing features
2. Sign up with your email
3. Upload a resume (it will be extracted to the `resumes` table AND the file will be saved in the `resumes` Storage Bucket)
4. View your uploaded resumes and click "Download" to retrieve the original file!

## 📝 Component Usage

### Using Auth in Any Component
```javascript
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, signOut } = useAuth()
  
  return (
    <div>
      <p>Welcome {user?.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Querying Data from Supabase
```javascript
import { supabase } from '../supabase'

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Query data
const { data, error } = await supabase
  .from('resumes')
  .select('*')
  .eq('user_id', user.id)

// Insert data
const { data, error } = await supabase
  .from('resumes')
  .insert([{ user_id: user.id, filename: 'resume.pdf', content: '...' }])

// Update data
const { data, error } = await supabase
  .from('resumes')
  .update({ filename: 'new-name.pdf' })
  .eq('id', resumeId)

// Delete data
const { error } = await supabase
  .from('resumes')
  .delete()
  .eq('id', resumeId)
```

## 🔑 Environment Variables

Your `.env` file should have:
```
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

These are exposed in Vite (prefixed with VITE_), which is safe for public anon keys.

## 🚀 Backend Connection Architecture

```
Frontend (React)
       ↓
Supabase Client (supabase-js)
       ↓
Supabase API (REST service)
       ↓
PostgreSQL Database & Auth Service
```

**Key Points:**
- Supabase acts as your entire backend
- No separate Node.js server needed for basic CRUD
- Row Level Security (RLS) enforces permissions
- Real-time subscriptions available for live updates

## 📱 To Add Real-Time Updates

```javascript
const subscription = supabase
  .from('resumes')
  .on('*', (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## 🔐 Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] Environment variables set (not hardcoded)
- [ ] Email verification enabled
- [ ] Test signup/login flow
- [ ] Test data isolation (users can only see their own data)

## ⚠️ Common Issues

**"Invalid credentials" error**: Check `.env` file has correct URL and ANON_KEY

**"RLS violation" error**: Check policies are set correctly for your table

**"Table does not exist" error**: Create tables in Supabase Dashboard first

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
