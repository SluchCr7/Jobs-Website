// types.ts
import { ComponentType, ReactNode } from "react";

// رابط موقع / الصفحات
export interface LinkItem {
  id: number;
  title: string;
  url: string;
}

// وظائف مميزة
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
}

// تصنيفات الوظائف
export interface JobCategory {
  id: number;
  name: string;
  icon: string; // يمكنك تغييرها لاحقاً لـ JSX.Element إذا أحببت أيقونات React
}


// أحدث الوظائف
export interface LatestJob {
  id: number;
  title: string;
  url: string;
}

// روابط التواصل الاجتماعي
export interface SocialLink {
  id: number;
  Icon: ComponentType; // تمرير الـ Component مباشرة
  url: string;
}

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "internship"
  | "contract";

export interface JobsData {
  id: number;
  title: string;
  company: string;
  description: string;

  location: string;
  remote: boolean;

  salary: string;
  skills: string[];

  /** filters */
  categoryId: number;
  employmentType: EmploymentType;

  /** UI flags */
  urgent?: boolean;
  hot?: boolean;

  /** meta */
  postedDate: string; // ISO date

  /** optional */
  logo?: string;
}


export type FiltersType = {
  keyword: string;
  location: string;
  remote: boolean;
  employment: string[];
  skills: string[];
};
export type Company = {
  id: number;
  name: string;
  logoUrl: string;
  location: string;
  website: string;
  description: string;
  jobsCount: number;
};


export type FiltersProps = {
  setFilters: (filters: FiltersType) => void;
};

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

type FAQ = {
  q: string;
  a: string;
};

export type Topic = {
  id: number;
  title: string;
  icon: ReactNode;
  faqs: FAQ[];
};


export interface UserProfileType {
  id: number;
  fullName: string;
  avatarUrl?: string; // رابط الصورة الشخصية
  coverUrl?: string;  // صورة الغلاف
  title: string; // المسمى الوظيفي
  location: string; // المدينة والدولة
  summary: string; // نبذة مختصرة عن الشخص
  contact: {
    email: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  workExperience: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string; // null إذا لا يزال يعمل
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    description?: string;
  }[];
  skills: {
    name: string;
    level?: string; // Beginner, Intermediate, Expert
  }[];
  projects?: {
    name: string;
    description: string;
    link?: string;
    imageUrl?: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
  languages?: string[];
  interests?: string[];
}


export type Article = {
  id : number , 
  title : string ,
  excerpt : string, 
  publishedDate? : string,
  image? : string ,
}

export type Testimonial ={
  id : number , 
  name : string, 
  role : string,
  quote : string
}

export type category = {
  id : number,
  count: number
  name : string,
  icon : string
}
export type State = {
  id : number,
  label: string
  value : string,
  icon : ComponentType
}