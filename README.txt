================================================================================
JOBFINDER - PREMIUM RECRUITMENT PLATFORM
================================================================================

PROJECT OVERVIEW:
JobFinder is a comprehensive, full-stack recruitment and career development 
platform designed to connect top talent with global opportunities. Built with 
a modern technology stack and a premium design aesthetic, it offers a seamless 
experience for both job seekers, employers, and administrators.

--------------------------------------------------------------------------------
TECHNOLOGY STACK:
--------------------------------------------------------------------------------

FRONTEND:
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS (Custom Design System)
- Animations: Framer Motion
- State Management: React Context API
- Icons: Lucide-React
- Notifications: Sonner / React Hot Toast
- HTTP Client: Axios
- Date Handling: date-fns

BACKEND:
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JWT (JSON Web Tokens)
- Model Validation: Joi
- Image Storage: Cloudinary (via Multer)
- Environment Management: Dotenv

--------------------------------------------------------------------------------
CORE FEATURES & MODULES:
--------------------------------------------------------------------------------

1. ADVANCED AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
   - Secure login and registration with JWT.
   - Distinct roles: 'user' (Seeker), 'employer' (Company), and 'admin'.
   - Protected routes and conditional UI rendering based on roles.

2. JOB MANAGEMENT SYSTEM
   - Employers can create, update, and delete job postings.
   - Advanced search and filtering (Category, Location, Job Type, Remote).
   - Dynamic Job Cards with rich metadata.

3. COMPANY INFRASTRUCTURE
   - Support for multiple company profiles.
   - Verification system for companies.
   - Association between employers and their respective companies.

4. DYNAMIC ARTICLE (BLOG) SYSTEM
   - Dedicated "Creator Studio" for authorized employers/admins.
   - SEO-friendly URL generation (Slugs).
   - Rich content support with image uploads.
   - Real-time view tracking.

5. INTELLIGENT NOTIFICATION SYSTEM
   - Role-specific notifications for job applications, status changes, 
     and platform updates.
   - Real-time notification menu with mark-as-read and delete functionality.

6. PREMIUM UI/UX DESIGN
   - Glassmorphism effects and modern glass-mesh backgrounds.
   - Responsive layouts optimized for all devices.
   - Micro-animations for improved user engagement.
   - Dark mode support.

--------------------------------------------------------------------------------
DIRECTORY STRUCTURE:
--------------------------------------------------------------------------------

/Front        -> Next.js frontend application
  /app        -> Main application logic and routing
    /Context  -> Global state management providers
    /Pages    -> Page-level components
    /Components -> Reusable UI building blocks
    /utils    -> Helper functions, types, and mock data

/Server       -> Node.js backend API
  /Modules    -> Mongoose schemas and models
  /Controllers -> Business logic for API endpoints
  /Routers    -> API endpoint definitions
  /Middelwares -> Authentication and utility middlewares
  /config     -> Database and cloud storage configurations

--------------------------------------------------------------------------------
DEVELOPER INFORMATION:
--------------------------------------------------------------------------------
Main Developer: SluchCr7
Project Status: Production-Ready / Dynamic

JobFinder is built to be scalable, maintainable, and highly performant, 
following the best practices of modern software engineering.
================================================================================
