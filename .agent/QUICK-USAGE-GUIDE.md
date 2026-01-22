# 🚀 QUICK GUIDE - Using Dynamic User Data

## ✅ WHAT YOU HAVE NOW

Your website is now **fully dynamic** with user data from AuthContext that:
- ✅ Automatically syncs with localStorage
- ✅ Updates in real-time across all pages
- ✅ Includes a beautiful Edit Profile modal
- ✅ Works seamlessly with backend

---

## 📖 HOW TO USE IN ANY PAGE

### 1. Import the Hook
```typescript
import { useAuth } from "@/app/Context/AuthContext";
```

### 2. Get User Data
```typescript
function MyComponent() {
  const { user, loading, hasCompany } = useAuth();
  
  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Handle not logged in
  if (!user) {
    return <div>Please log in</div>;
  }
  
  // Use user data
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <img src={user.avatar.url} alt={user.name} />
      <p>{user.email}</p>
      <span>Role: {user.role}</span>
    </div>
  );
}
```

---

## 🎯 AVAILABLE USER DATA

```typescript
user._id          // User ID
user.name         // Full name
user.email        // Email address
user.role         // "user" | "employer" | "admin"
user.avatar.url   // Avatar image URL
user.bio          // User bio (optional)
user.resume       // Resume URL (optional, job seekers)
user.company      // Company object (optional, employers)
user.isVerified   // Verification status
user.createdAt    // Account creation date
user.token        // JWT token
```

---

## 🔄 UPDATING USER DATA

### Update Profile
```typescript
const { updateProfile } = useAuth();

await updateProfile({
  name: "New Name",
  email: "new@email.com",
  bio: "New bio"
});
// ✅ AuthContext updates automatically
// ✅ localStorage syncs automatically
// ✅ UI re-renders with new data
```

### Update Avatar
```typescript
const { updateAvatar } = useAuth();

const formData = new FormData();
formData.append("avatar", file);

await updateAvatar(formData);
// ✅ Avatar updates everywhere
// ✅ localStorage syncs automatically
```

---

## 🎨 PROFILE PAGE FEATURES

### Edit Profile Button
- Click "Edit Profile" to open modal
- Modal auto-populates with current data
- Edit name, email, bio
- Upload new avatar
- Changes save to backend and update everywhere

### Dynamic Sections
- **Job Seekers**: See resume section
- **Employers**: See company section
- **All Users**: See account details and profile completion

---

## 💡 COMMON USE CASES

### 1. Show User Name in Navigation
```typescript
function Navigation() {
  const { user } = useAuth();
  
  return (
    <nav>
      {user && <span>Hi, {user.name}!</span>}
    </nav>
  );
}
```

### 2. Protect a Route
```typescript
function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/Pages/Login");
    }
  }, [user, loading, router]);
  
  if (loading) return <Loading />;
  if (!user) return null;
  
  return <div>Protected content</div>;
}
```

### 3. Show Role-Specific Content
```typescript
function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div>
      {user?.role === "employer" && <EmployerDashboard />}
      {user?.role === "user" && <JobSeekerDashboard />}
      {user?.role === "admin" && <AdminDashboard />}
    </div>
  );
}
```

### 4. Check Company Status
```typescript
function PostJobButton() {
  const { user, hasCompany } = useAuth();
  
  if (user?.role !== "employer") return null;
  if (!hasCompany) return <CreateCompanyPrompt />;
  
  return <button>Post a Job</button>;
}
```

---

## 🔄 DATA PERSISTENCE

### Automatic Sync
- User data is **automatically saved** to localStorage
- On page refresh, data is **automatically loaded**
- No manual sync needed!

### How It Works
```
Login/Register → AuthContext → localStorage
     ↓
Page Refresh → localStorage → AuthContext
     ↓
Update Profile → Backend → AuthContext → localStorage
```

---

## 🎯 EDIT PROFILE MODAL

### Opening the Modal
```typescript
import EditProfileModal from "@/app/Components/EditProfileModal";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Edit Profile
      </button>
      
      <EditProfileModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
```

### Features
- ✅ Avatar upload with preview
- ✅ Name, email, bio editing
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Auto-saves to backend
- ✅ Updates AuthContext
- ✅ Syncs localStorage

---

## 📋 EXAMPLE: Complete Page

```typescript
"use client";

import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/Pages/Login");
    }
  }, [user, loading, router]);
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }
  
  // Not logged in
  if (!user) return null;
  
  // Render with user data
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4">
        <Image 
          src={user.avatar.url} 
          alt={user.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-slate-600">{user.email}</p>
          <span className="text-sm text-primary-600">
            {user.role === "employer" ? "Employer" : "Job Seeker"}
          </span>
        </div>
      </div>
      
      {user.bio && (
        <div className="mt-6">
          <h2 className="font-bold mb-2">About</h2>
          <p>{user.bio}</p>
        </div>
      )}
      
      {user.role === "employer" && user.company && (
        <div className="mt-6">
          <h2 className="font-bold mb-2">Company</h2>
          <p>{user.company.name}</p>
        </div>
      )}
    </div>
  );
}
```

---

## ✅ CHECKLIST

### To Use User Data Anywhere:
1. ✅ Import `useAuth` hook
2. ✅ Destructure `user`, `loading`
3. ✅ Handle loading state
4. ✅ Handle not logged in state
5. ✅ Use user data in JSX
6. ✅ Data updates automatically!

### Profile Page:
1. ✅ Navigate to `/Pages/Profile`
2. ✅ See your data displayed
3. ✅ Click "Edit Profile"
4. ✅ Update your info
5. ✅ See changes everywhere!

---

## 🎉 YOU'RE DONE!

Your website is now **fully dynamic** with:
- ✅ Real user data everywhere
- ✅ Automatic localStorage sync
- ✅ Beautiful edit modal
- ✅ Backend integration
- ✅ Real-time updates

**Just use `useAuth()` in any component to access user data!** 🚀
