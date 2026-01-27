// API Response Types matching backend database schemas

export interface ApiProject {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  youtubeUrl: string | null;
  thumbnailUrl: string | null;
  images: string[];
  techStack: string[] | null;
  featured: boolean;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiWorkExperience {
  id: string;
  role: string;
  company: string;
  website: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  techStack: string[] | null;
  isCurrent: boolean;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCertificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string | null;
  credentialUrl: string | null;
  certificateUrl: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
}

export interface ApiSkill {
  id: string;
  name: string;
  level: string | null;
  category: string | null;
  orderIndex: number;
}

export interface ApiHighlight {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  date: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
}
