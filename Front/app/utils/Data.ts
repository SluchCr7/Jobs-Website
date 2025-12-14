// Data.ts
import { HiOutlineSparkles } from 'react-icons/hi';
import { LinkItem, Job, JobCategory, Company, LatestJob, SocialLink,JobsData, UserProfileType, Article, Testimonial, category, State } from './Types';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export const links: LinkItem[] = [
  { id: 1, title: "Find Job", url: "/Pages/Jobs" },
  { id: 2, title: "Pricing", url: "/Pages/Pricing" },
  { id: 3, title: "Contact", url: "/Pages/Contact" },
];

export const featuredJobs: Job[] = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "Mountain View, CA", salary: "$120k - $150k" },
  { id: 2, title: "UI/UX Designer", company: "Apple", location: "Cupertino, CA", salary: "$100k - $130k" },
  { id: 3, title: "Marketing Manager", company: "Amazon", location: "Seattle, WA", salary: "$110k - $140k" },
  { id: 4, title: "Backend Developer", company: "Facebook", location: "Menlo Park, CA", salary: "$130k - $160k" },
  { id: 5, title: "Data Analyst", company: "Microsoft", location: "Redmond, WA", salary: "$100k - $120k" },
  { id: 6, title: "Product Manager", company: "Netflix", location: "Los Gatos, CA", salary: "$140k - $170k" },
];

export const jobCategories: JobCategory[] = [
  { id: 1, name: "Tech", icon: "💻" },
  { id: 2, name: "Design", icon: "🎨" },
  { id: 3, name: "Marketing", icon: "📈" },
  { id: 4, name: "Finance", icon: "💰" },
  { id: 5, name: "Healthcare", icon: "🏥" },
  { id: 6, name: "Education", icon: "📚" },
];


export const latestJobs: LatestJob[] = [
  { id: 1, title: "Frontend Developer", url: "#" },
  { id: 2, title: "UI/UX Designer", url: "#" },
  { id: 3, title: "Backend Developer", url: "#" },
];

export const socialLinks: SocialLink[] = [
  { id: 1, Icon: FaFacebookF, url: "#" },
  { id: 2, Icon: FaTwitter, url: "#" },
  { id: 3, Icon: FaLinkedinIn, url: "#" },
  { id: 4, Icon: FaInstagram, url: "#" },
];

export const jobs: JobsData[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    description:
      "Develop and maintain modern web user interfaces using React, TypeScript, and scalable design systems.",
    location: "Mountain View, CA",
    remote: false,
    salary: "$120k - $150k",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
    categoryId: 1, // Frontend
    employmentType: "full_time",
    postedDate: "2024-12-01",
    hot: true,
    logo: "/logos/google.svg",
  },

  {
    id: 2,
    title: "UI/UX Designer",
    company: "Apple",
    description:
      "Design intuitive and engaging user experiences across web and mobile platforms.",
    location: "Cupertino, CA",
    remote: true,
    salary: "$100k - $130k",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    categoryId: 2, // Design
    employmentType: "full_time",
    postedDate: "2024-12-03",
    logo: "/logos/apple.svg",
  },

  {
    id: 3,
    title: "Backend Developer",
    company: "Meta",
    description:
      "Build scalable backend services and APIs using Node.js and cloud-native technologies.",
    location: "Menlo Park, CA",
    remote: true,
    salary: "$130k - $160k",
    skills: ["Node.js", "Express", "MongoDB", "Docker", "API Design"],
    categoryId: 3, // Backend
    employmentType: "full_time",
    postedDate: "2024-11-28",
    logo: "/logos/meta.svg",
  },

  {
    id: 4,
    title: "Marketing Manager",
    company: "Amazon",
    description:
      "Plan and execute marketing strategies to drive user acquisition and brand growth.",
    location: "Seattle, WA",
    remote: false,
    salary: "$110k - $140k",
    skills: ["SEO", "Content Marketing", "Google Ads", "Analytics"],
    categoryId: 4, // Marketing
    employmentType: "full_time",
    postedDate: "2024-12-05",
    urgent: true,
    logo: "/logos/amazon.svg",
  },

  {
    id: 5,
    title: "Data Analyst",
    company: "Microsoft",
    description:
      "Analyze large datasets and deliver insights to support strategic business decisions.",
    location: "Redmond, WA",
    remote: true,
    salary: "$100k - $120k",
    skills: ["SQL", "Python", "Power BI", "Excel"],
    categoryId: 5, // Data
    employmentType: "full_time",
    postedDate: "2024-11-30",
    logo: "/logos/microsoft.svg",
  },

  {
    id: 6,
    title: "Product Manager",
    company: "Netflix",
    description:
      "Own product roadmap, collaborate with cross-functional teams, and lead product launches.",
    location: "Los Gatos, CA",
    remote: false,
    salary: "$140k - $170k",
    skills: ["Product Management", "Agile", "Jira", "Stakeholder Management"],
    categoryId: 6, // Product
    employmentType: "full_time",
    postedDate: "2024-12-02",
    hot: true,
    logo: "/logos/netflix.svg",
  },

  {
    id: 7,
    title: "Intern Software Engineer",
    company: "Twitter",
    description:
      "Support engineering teams in building and testing software features.",
    location: "San Francisco, CA",
    remote: true,
    salary: "$25/hr",
    skills: ["JavaScript", "React", "Git", "Problem Solving"],
    categoryId: 3, // Engineering
    employmentType: "internship",
    postedDate: "2024-12-04",
    urgent: true,
    logo: "/logos/twitter.svg",
  },

  {
    id: 8,
    title: "Graphic Designer",
    company: "Adobe",
    description:
      "Create visually compelling graphics and brand assets for digital campaigns.",
    location: "San Jose, CA",
    remote: false,
    salary: "$70k - $90k",
    skills: ["Photoshop", "Illustrator", "Branding", "Creativity"],
    categoryId: 2, // Design
    employmentType: "part_time",
    postedDate: "2024-11-29",
    logo: "/logos/adobe.svg",
  },

  {
    id: 9,
    title: "Full Stack Developer",
    company: "Shopify",
    description:
      "Develop scalable frontend and backend solutions for global e-commerce platforms.",
    location: "Ottawa, Canada",
    remote: true,
    salary: "$110k - $140k",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    categoryId: 7, // Full Stack
    employmentType: "full_time",
    postedDate: "2024-12-06",
    hot: true,
    logo: "/logos/shopify.svg",
  },

  {
    id: 10,
    title: "Content Writer",
    company: "HubSpot",
    description:
      "Create high-quality content for blogs, landing pages, and marketing campaigns.",
    location: "Boston, MA",
    remote: true,
    salary: "$60k - $80k",
    skills: ["Writing", "SEO", "Content Strategy", "Communication"],
    categoryId: 4, // Marketing
    employmentType: "part_time",
    postedDate: "2024-12-01",
    logo: "/logos/hubspot.svg",
  },
];


export const companies: Company[] = [
  {
    id: 1,
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    location: "Mountain View, USA",
    website: "https://careers.google.com",
    description: "Global leader in search, ads, cloud, and AI solutions.",
    jobsCount: 120,
  },
  {
    id: 2,
    name: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    location: "Seattle, USA",
    website: "https://amazon.jobs",
    description: "E-commerce and cloud giant, connecting millions worldwide.",
    jobsCount: 95,
  },
  {
    id: 3,
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    location: "Redmond, USA",
    website: "https://careers.microsoft.com",
    description: "Leader in software, cloud and enterprise solutions worldwide. :contentReference[oaicite:0]{index=0}",
    jobsCount: 80,
  },
  {
    id: 4,
    name: "Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Logo_2023.svg",
    location: "Menlo Park, USA",
    website: "https://www.metacareers.com",
    description: "Building social platforms, VR/AR, and future-facing experiences.",
    jobsCount: 65,
  },
  {
    id: 5,
    name: "Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    location: "Cupertino, USA",
    website: "https://jobs.apple.com",
    description: "Design-driven company building devices, software and digital experiences.",
    jobsCount: 70,
  },
  {
    id: 6,
    name: "IBM",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    location: "New York, USA",
    website: "https://www.ibm.com/careers",
    description: "Veteran global enterprise in computing, cloud and enterprise solutions. :contentReference[oaicite:1]{index=1}",
    jobsCount: 110,
  }
];

export const userProfile : UserProfileType = {
  id: 1,
  fullName: "Ahmed Abobakr",
  avatarUrl: "", // ضع رابط الصورة الشخصية هنا أو اتركه فارغاً للـ Placeholder
  coverUrl: "",  // رابط صورة الغلاف
  title: "Frontend Developer",
  location: "Cairo, Egypt",
  summary: "Passionate frontend developer with experience in React, Next.js, and modern web technologies. Loves building scalable and beautiful applications.",
  contact: {
    email: "ahmed@example.com",
    phone: "+20 100 000 0000",
    website: "https://ahmed.dev",
    linkedin: "https://linkedin.com/in/ahmed",
    github: "https://github.com/ahmed",
    twitter: "https://twitter.com/ahmed"
  },
  workExperience: [
    {
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Developing and maintaining scalable web applications using React and Next.js."
    },
    {
      jobTitle: "Frontend Developer",
      company: "WebSolutions",
      startDate: "Jun 2020",
      endDate: "Dec 2022",
      description: "Built responsive websites and optimized user interfaces for clients."
    }
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      institution: "Cairo University",
      startDate: "2016",
      endDate: "2020"
    }
  ],
  skills: [
    { name: "React", level: "Expert" },
    { name: "Next.js", level: "Advanced" },
    { name: "TailwindCSS", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" }
  ],
  projects: [
    {
      name: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills.",
      link: "https://ahmed.dev",
      imageUrl: ""
    },
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with Next.js and Node.js.",
      imageUrl: ""
    }
  ],
  certifications: [
    { name: "React Developer Certification", issuer: "Udemy", date: "2022" }
  ],
  languages: ["English", "Arabic"],
  interests: ["Web Development", "UI/UX Design", "Open Source"]
};


export const categories : category[] = [
  { id: 1, name: "Engineering", count: 1240, icon: "⚙️" },
  { id: 2, name: "Design", count: 420, icon: "🎨" },
  { id: 3, name: "Product", count: 310, icon: "📦" },
  { id: 4, name: "Data", count: 260, icon: "📊" },
  { id: 5, name: "Marketing", count: 190, icon: "📣" },
  { id: 6, name: "Operations", count: 150, icon: "🏗️" },
];

export const testimonials : Testimonial[] = [
  { id: 1,avatar: "", name: "Sara Ahmed", role: "Frontend Developer", quote: "I found my dream role in 2 weeks. The process was smooth and the listings were high quality." },
  { id: 2,avatar: "", name: "Khaled Mostafa", role: "Product Manager", quote: "Great platform for both candidates and recruiters — excellent UX and fast responses." },
  { id: 3,avatar: "", name: "Nora Ali", role: "Data Scientist", quote: "Love the search suggestions and the clear job cards — saved me a lot of time." },
];

export const articles : Article[] = [
  { id: 1, title: "How to Ace Technical Interviews in 2025", excerpt: "A practical guide to preparing for coding interviews, system design and behavioral questions." },
  { id: 2, title: "Remote Work: Best Practices", excerpt: "Tips to stay productive and build a thriving remote career." },
  { id: 3, title: "Building Your Personal Brand", excerpt: "Leverage LinkedIn and your portfolio to stand out to recruiters." },
];

export const stats : State[] = [
  { id: 1, label: "Available Jobs", value: "12,400+", icon: HiOutlineSparkles },
  { id: 2, label: "Trusted Companies", value: "4,200+", icon: HiOutlineSparkles },
  { id: 3, label: "Active Applicants", value: "150k+", icon: HiOutlineSparkles },
];