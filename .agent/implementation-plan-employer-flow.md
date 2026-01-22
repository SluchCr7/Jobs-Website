# Employer & Job Seeker Flow Implementation Plan

## ✅ BACKEND COMPLETED

### 1. Schema Updates
- ✅ Enhanced Company schema with `members` array supporting roles (owner, admin, recruiter)
- ✅ Added `createdBy` field to Company
- ✅ User schema already has `role` and `company` fields

### 2. Authorization Middleware
- ✅ `isEmployer` - Checks if user has employer or admin role
- ✅ `hasCompany` - Checks if user belongs to a company
- ✅ `isEmployerWithCompany` - Combined check for both
- ✅ Updated `protect` to populate company data

### 3. Company Controller
- ✅ `createCompany` - Validates employer role, creates company, links to user
- ✅ `getMyCompany` - Returns logged-in user's company
- ✅ Proper member management with roles

### 4. Job Controller
- ✅ `createJob` - Validates employer + company, auto-attaches company
- ✅ Enhanced with proper authorization checks

### 5. Routes
- ✅ `/api/company/my-company` - GET my company
- ✅ `/api/company` - POST create company (employer only)
- ✅ `/api/job` - POST create job (employer with company only)

---

## 🔄 FRONTEND TO IMPLEMENT

### Phase 1: Context Updates

#### AuthContext Enhancements
- [ ] Update user state to include populated `company` object
- [ ] Add `hasCompany` computed property
- [ ] Ensure role is properly tracked

#### Create CompanyContext (if not exists or enhance existing)
- [ ] `createCompany(formData)` function
- [ ] `getMyCompany()` function
- [ ] `myCompany` state
- [ ] `hasCompany` state
- [ ] Loading and error states

### Phase 2: Registration Flow

#### Update Register Page
- [ ] Add role selection (Job Seeker / Employer)
- [ ] On successful registration:
  - If `role === "user"` → Redirect to `/Pages/Jobs`
  - If `role === "employer"` → Check `user.company`
    - If `company === null` → Redirect to `/Pages/CreateCompany`
    - If `company exists` → Redirect to dashboard

### Phase 3: Create Company Page

#### New Page: `/Pages/CreateCompany/page.tsx`
- [ ] Protected route (employer only, no company)
- [ ] Form fields:
  - Company name (required)
  - Industry (required)
  - Description
  - Website
  - Location
  - Size dropdown
  - Founded year
  - Logo upload
- [ ] On success → Redirect to dashboard or jobs page
- [ ] Update user context with new company

### Phase 4: UI Conditional Rendering

#### Navigation/Header Updates
- [ ] Show "Post a Job" button ONLY if:
  - `user.role === "employer"` AND
  - `user.company !== null`
- [ ] Hide for `role === "user"`

#### Job Creation Page
- [ ] Protect route with employer + company check
- [ ] Auto-attach `companyId` from `user.company`
- [ ] Don't show company selector (use logged-in user's company)

#### Dashboard/Profile Updates
- [ ] For employers: Show company info
- [ ] For job seekers: Show resume, applications

### Phase 5: Company Management

#### Company Dashboard (Optional Enhancement)
- [ ] View company details
- [ ] Edit company info
- [ ] View posted jobs
- [ ] Manage team members

---

## Implementation Order

1. ✅ Backend (COMPLETED)
2. Update AuthContext to handle company data
3. Create/Update CompanyContext
4. Update Registration flow
5. Create "Create Company" page
6. Update Navigation conditional rendering
7. Update Job Creation flow
8. Test complete flow

---

## Testing Checklist

### Job Seeker Flow
- [ ] Register as "user"
- [ ] Redirected to job listings
- [ ] Can browse jobs
- [ ] Can apply to jobs
- [ ] Cannot see "Post Job" button
- [ ] Cannot access job creation page

### Employer Flow (No Company)
- [ ] Register as "employer"
- [ ] Redirected to "Create Company" page
- [ ] Cannot post jobs yet
- [ ] Cannot see "Post Job" button

### Employer Flow (With Company)
- [ ] Create company successfully
- [ ] Redirected to dashboard/jobs
- [ ] Can see "Post Job" button
- [ ] Can create jobs
- [ ] Jobs auto-linked to company
- [ ] Can view company dashboard

### Edge Cases
- [ ] Employer tries to create 2nd company → Blocked
- [ ] User tries to access employer routes → Blocked
- [ ] Employer without company tries to post job → Blocked
- [ ] Backend data missing → Fallback to static data
- [ ] Token expired → Proper redirect to login

---

## Notes
- All changes maintain backward compatibility
- Static data fallback ensures UI never crashes
- Clean separation of concerns
- Production-ready with proper error handling
