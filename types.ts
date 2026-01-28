
export type UserRole = 'STUDENT' | 'FACULTY' | 'COMPANY' | 'CONTRIBUTOR' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Contributor extends User {
  role: 'CONTRIBUTOR';
  specialization: string;
  totalContributions: number;
  status: 'Active' | 'Pending' | 'Suspended';
}

export interface Admin extends User {
  role: 'ADMIN';
  region: string;
}

export interface SuperAdmin extends User {
  role: 'SUPER_ADMIN';
}

export interface Institution {
  id: string;
  name: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: 'Active' | 'Inactive';
  students: number;
  subdomain?: string;
  planId?: string;
}

export interface Plan {
  id: string;
  name: string;
  adminSlots: number;
  facultySlots: number;
  studentSlots: number;
  recruiterSlots: number;
  price: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  targetId?: string;
  details: string;
}

export interface Resume {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  education: { id: string; institution: string; degree: string; year: string; score: string }[];
  skills: string; 
  projects: { id: string; title: string; tech: string; desc: string }[];
  experience: { id: string; role: string; company: string; duration: string; desc: string }[];
}

export interface Student extends User {
  id: string;
  role: 'STUDENT';
  department: string;
  year: string;
  batch: string;
  targetRole: string;
  overallScore: number;
  skills: {
    aptitude: number;
    coding: number;
    communication: number;
    domain: number;
    project: number;
    technical: number;
    psychometric: number;
  };
  modulesCompleted: number;
  totalModules: number;
  status: 'Ready' | 'In Progress' | 'At Risk';
  onboardingCompleted?: boolean;
  resumes: Resume[];
  resumeData?: Resume;
}

export interface Faculty extends User {
  role: 'FACULTY';
  department: string;
}

export interface Company extends User {
  role: 'COMPANY';
  companyName: string;
}

export type AssessmentType = 'APTITUDE' | 'CODING' | 'COMMUNICATION' | 'DOMAIN' | 'SIMULATION' | 'TECHNICAL' | 'PSYCHOMETRIC' | 'PROJECT';
export type LSRWType = 'LISTENING' | 'SPEAKING' | 'READING' | 'WRITING';

export interface QuestionOption {
  text: string;
  imageUrl?: string;
  isCorrect: boolean;
}

export interface TestCase {
  input: string;
  output: string;
  isHidden: boolean;
}

export interface Question {
  id: string;
  category: AssessmentType;
  lsrwType?: LSRWType;
  subTopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  text?: string;
  audioUrl?: string;
  paragraph?: string;
  scenario?: string;
  imageUrl?: string;
  options?: QuestionOption[];
  solution?: string;
  title?: string;
  problemStatement?: string;
  constraints?: string;
  sampleInput?: string;
  sampleOutput?: string;
  testCases?: TestCase[];
  lastModified?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
  modules?: { name: string; task: string }[];
  justificationQs?: string[];
}

export interface Assessment {
  id: string;
  title: string;
  type: AssessmentType;
  lsrwType?: LSRWType;
  questions: number;
  durationMins: number;
  assignedBy?: string;
  status: 'PENDING' | 'COMPLETED' | 'ACTIVE';
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  score?: number;
  date?: string;
  completions?: number;
  totalStudents?: number;
  candidatesCount?: number;
  avgScore?: number;
  description?: string;
  constraints?: string[];
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  skills: string[];
  type: 'Full-time' | 'Internship' | 'Contract';
  location: string;
  package: string;
  status: 'Active' | 'Closed';
  applicants: number;
  postedDate: string;
  deadline?: string;
}

export interface Interview {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  jobTitle: string;
  date: string;
  time: string;
  type: 'Technical' | 'HR' | 'System Design' | 'Coding';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  meetingLink: string;
  feedback?: {
    technical: number;
    communication: number;
    confidence: number;
    remarks: string;
    verdict: 'Recommended' | 'Hold' | 'Rejected';
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  tag?: string;
  date?: string;
}
