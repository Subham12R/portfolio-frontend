// Certifications and credentials data

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  logo: string;
  credential: string;
  skills?: string[];
}

export const certificates: Certificate[] = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2025-01",
    logo: "/certificates/aws.png",
    credential: "https://www.credly.com/...",
    skills: ["AWS", "Cloud Computing", "Infrastructure"],
  },
  {
    id: "meta-frontend",
    title: "Meta Frontend Developer",
    issuer: "Meta",
    issueDate: "2024-08",
    logo: "/certificates/meta.png",
    credential: "https://coursera.org/verify/...",
    skills: ["React", "JavaScript", "Web Development"],
  },
];

// Helper to get certificates sorted by issue date
export function getCertificatesSorted(): Certificate[] {
  return [...certificates].sort((a, b) => {
    if (!a.issueDate) return 1;
    if (!b.issueDate) return -1;
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });
}
