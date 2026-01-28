
import { User, Student, Faculty, Company, Assessment, Job, Resume, Interview, Question, Institution, AuditLog, Contributor, Admin, SuperAdmin, Plan, UserRole } from '../types';

// --- PILLAR SPECIFIC QUESTIONS ---

export const DEMO_APTITUDE_QUESTIONS: Question[] = [
  // Quantitative (5)
  { 
    id: 'apt-q1', category: 'APTITUDE', subTopic: 'Quantitative', difficulty: 'Medium', 
    text: 'A train 150m long is running at a speed of 54 km/hr. How much time will it take to cross a platform 250m long?', 
    options: [{ text: '20 seconds', isCorrect: false }, { text: '26.67 seconds', isCorrect: true }, { text: '30 seconds', isCorrect: false }, { text: '15 seconds', isCorrect: false }],
  },
  { 
    id: 'apt-q2', category: 'APTITUDE', subTopic: 'Quantitative', difficulty: 'Easy', 
    text: 'Find the average of first 5 multiples of 3.', 
    options: [{ text: '9', isCorrect: true }, { text: '12', isCorrect: false }, { text: '15', isCorrect: false }, { text: '10', isCorrect: false }],
  },
  { 
    id: 'apt-q3', category: 'APTITUDE', subTopic: 'Quantitative', difficulty: 'Medium', 
    text: 'A sum of money at simple interest amounts to $815 in 3 years and to $854 in 4 years. The sum is:', 
    options: [{ text: '$650', isCorrect: false }, { text: '$690', isCorrect: false }, { text: '$698', isCorrect: true }, { text: '$700', isCorrect: false }],
  },
  { 
    id: 'apt-q4', category: 'APTITUDE', subTopic: 'Quantitative', difficulty: 'Hard', 
    text: 'Two pipes A and B can fill a cistern in 37.5 minutes and 45 minutes respectively. Both pipes are opened. The cistern will be filled in just half an hour, if the pipe B is turned off after:', 
    options: [{ text: '5 min', isCorrect: false }, { text: '9 min', isCorrect: true }, { text: '10 min', isCorrect: false }, { text: '15 min', isCorrect: false }],
  },
  { 
    id: 'apt-q5', category: 'APTITUDE', subTopic: 'Quantitative', difficulty: 'Medium', 
    text: 'The ratio between the length and the breadth of a rectangular park is 3 : 2. If a man cycling along the boundary of the park at the speed of 12 km/hr completes one round in 8 minutes, then the area of the park (in sq. m) is:', 
    options: [{ text: '15360', isCorrect: false }, { text: '153600', isCorrect: true }, { text: '30720', isCorrect: false }, { text: '307200', isCorrect: false }],
  },
  // Logical (5)
  { 
    id: 'apt-l1', category: 'APTITUDE', subTopic: 'Logical', difficulty: 'Hard', 
    text: 'If "MONKEY" is coded as "XDJMNL", how is "TIGER" coded?', 
    options: [{ text: 'QDFHS', isCorrect: true }, { text: 'SDFHS', isCorrect: false }, { text: 'SHFDQ', isCorrect: false }, { text: 'UJHFS', isCorrect: false }],
  },
  { 
    id: 'apt-l2', category: 'APTITUDE', subTopic: 'Logical', difficulty: 'Medium', 
    text: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?', 
    options: [{ text: '7', isCorrect: false }, { text: '10', isCorrect: true }, { text: '12', isCorrect: false }, { text: '13', isCorrect: false }],
  },
  { 
    id: 'apt-l3', category: 'APTITUDE', subTopic: 'Logical', difficulty: 'Medium', 
    text: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?', 
    options: [{ text: 'His own', isCorrect: false }, { text: 'His son\'s', isCorrect: true }, { text: 'His father\'s', isCorrect: false }, { text: 'His nephew\'s', isCorrect: false }],
  },
  { 
    id: 'apt-l4', category: 'APTITUDE', subTopic: 'Logical', difficulty: 'Easy', 
    text: 'Which word does NOT belong with the others?', 
    options: [{ text: 'Tyre', isCorrect: false }, { text: 'Steering wheel', isCorrect: false }, { text: 'Engine', isCorrect: false }, { text: 'Car', isCorrect: true }],
  },
  { 
    id: 'apt-l5', category: 'APTITUDE', subTopic: 'Logical', difficulty: 'Hard', 
    text: 'Statement: Should all the unauthorized structures in the city be demolished? Arguments: I. Yes. This will give a clear message to the people. II. No. Where will the people residing in these houses go?', 
    options: [{ text: 'Only argument I is strong', isCorrect: true }, { text: 'Only argument II is strong', isCorrect: false }, { text: 'Both I and II are strong', isCorrect: false }, { text: 'Neither I nor II is strong', isCorrect: false }],
  },
  // Verbal (5)
  {
    id: 'apt-v1', category: 'APTITUDE', subTopic: 'Verbal', difficulty: 'Medium', 
    text: 'Choose the word most nearly opposite in meaning to "CANDID":',
    options: [{ text: 'Evasive', isCorrect: true }, { text: 'Blunt', isCorrect: false }, { text: 'Honest', isCorrect: false }, { text: 'Neutral', isCorrect: false }],
  },
  {
    id: 'apt-v2', category: 'APTITUDE', subTopic: 'Verbal', difficulty: 'Easy', 
    text: 'Identify the synonym of "ABANDON":',
    options: [{ text: 'Keep', isCorrect: false }, { text: 'Forsake', isCorrect: true }, { text: 'Adopt', isCorrect: false }, { text: 'Cherish', isCorrect: false }],
  },
  {
    id: 'apt-v3', category: 'APTITUDE', subTopic: 'Verbal', difficulty: 'Medium', 
    text: 'Fill in the blank: The sun _____ in the east.',
    options: [{ text: 'Rise', isCorrect: false }, { text: 'Rises', isCorrect: true }, { text: 'Rising', isCorrect: false }, { text: 'Rose', isCorrect: false }],
  },
  {
    id: 'apt-v4', category: 'APTITUDE', subTopic: 'Verbal', difficulty: 'Hard', 
    text: 'Choose the correct spelling:',
    options: [{ text: 'Accomodation', isCorrect: false }, { text: 'Accommodation', isCorrect: true }, { text: 'Acommodation', isCorrect: false }, { text: 'Accommodasion', isCorrect: false }],
  },
  {
    id: 'apt-v5', category: 'APTITUDE', subTopic: 'Verbal', difficulty: 'Medium', 
    text: 'Which part of speech is the word "gracefully" in the sentence "She danced gracefully"?',
    options: [{ text: 'Adjective', isCorrect: false }, { text: 'Verb', isCorrect: false }, { text: 'Adverb', isCorrect: true }, { text: 'Noun', isCorrect: false }],
  }
];

export const DEMO_TECHNICAL_QUESTIONS: Question[] = [
  { 
    id: 'tech1', category: 'TECHNICAL', subTopic: 'Operating Systems', difficulty: 'Medium', 
    text: 'What is "Belady\'s Anomaly" in the context of Page Replacement Algorithms?',
    options: [{ text: 'Page faults decrease as frames increase', isCorrect: false }, { text: 'Page faults increase as frames increase', isCorrect: true }, { text: 'CPU utilization drops', isCorrect: false }, { text: 'Deadlock occurs', isCorrect: false }],
  },
  { 
    id: 'tech2', category: 'TECHNICAL', subTopic: 'Database Systems', difficulty: 'Medium', 
    text: 'Which normal form deals with multi-valued dependency?',
    options: [{ text: '2NF', isCorrect: false }, { text: '3NF', isCorrect: false }, { text: '4NF', isCorrect: true }, { text: 'BCNF', isCorrect: false }],
  },
  { 
    id: 'tech3', category: 'TECHNICAL', subTopic: 'Networking', difficulty: 'Easy', 
    text: 'Which protocol is used to map an IP address to a MAC address?',
    options: [{ text: 'DHCP', isCorrect: false }, { text: 'DNS', isCorrect: false }, { text: 'ARP', isCorrect: true }, { text: 'ICMP', isCorrect: false }],
  },
  { 
    id: 'tech4', category: 'TECHNICAL', subTopic: 'Data Structures', difficulty: 'Hard', 
    text: 'What is the best case time complexity of QuickSort?',
    options: [{ text: 'O(n)', isCorrect: false }, { text: 'O(n log n)', isCorrect: true }, { text: 'O(n^2)', isCorrect: false }, { text: 'O(log n)', isCorrect: false }],
  },
  { 
    id: 'tech5', category: 'TECHNICAL', subTopic: 'Computer Architecture', difficulty: 'Medium', 
    text: 'Which memory is non-volatile?',
    options: [{ text: 'RAM', isCorrect: false }, { text: 'SRAM', isCorrect: false }, { text: 'DRAM', isCorrect: false }, { text: 'ROM', isCorrect: true }],
  },
  { 
    id: 'tech6', category: 'TECHNICAL', subTopic: 'Software Engineering', difficulty: 'Medium', 
    text: 'The "Spiral Model" is especially suitable for:',
    options: [{ text: 'Small projects', isCorrect: false }, { text: 'Large, high-risk projects', isCorrect: true }, { text: 'Linear projects', isCorrect: false }, { text: 'Maintenance only', isCorrect: false }],
  },
  { 
    id: 'tech7', category: 'TECHNICAL', subTopic: 'Theory of Computation', difficulty: 'Hard', 
    text: 'Which of the following is an undecidable problem?',
    options: [{ text: 'Context-free language emptiness', isCorrect: false }, { text: 'Halting problem', isCorrect: true }, { text: 'Regular expression matching', isCorrect: false }, { text: 'LFA acceptance', isCorrect: false }],
  },
  { 
    id: 'tech8', category: 'TECHNICAL', subTopic: 'Object Oriented Programming', difficulty: 'Easy', 
    text: 'Wrapping data and methods into a single unit is called:',
    options: [{ text: 'Inheritance', isCorrect: false }, { text: 'Abstraction', isCorrect: false }, { text: 'Polymorphism', isCorrect: false }, { text: 'Encapsulation', isCorrect: true }],
  },
  { 
    id: 'tech9', category: 'TECHNICAL', subTopic: 'Web Technology', difficulty: 'Medium', 
    text: 'Which HTTP method is idempotent?',
    options: [{ text: 'POST', isCorrect: false }, { text: 'GET', isCorrect: true }, { text: 'PATCH', isCorrect: false }, { text: 'CONNECT', isCorrect: false }],
  },
  { 
    id: 'tech10', category: 'TECHNICAL', subTopic: 'Cloud Computing', difficulty: 'Medium', 
    text: 'Which is a Type 1 Hypervisor?',
    options: [{ text: 'Oracle VirtualBox', isCorrect: false }, { text: 'VMware ESXi', isCorrect: true }, { text: 'VMware Workstation', isCorrect: false }, { text: 'KVM', isCorrect: false }],
  }
];

export const DEMO_CODING_QUESTIONS: Question[] = [
  { 
    id: 'code1', 
    category: 'CODING', 
    subTopic: 'Algorithms', 
    difficulty: 'Hard', 
    title: 'Trapping Rain Water', 
    problemStatement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: '• n == height.length\n• 1 <= n <= 2 * 10^4\n• 0 <= height[i] <= 10^5',
    sampleInput: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    sampleOutput: '6',
    testCases: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', isHidden: false }]
  }
];

export const DEMO_COMMUNICATION_QUESTIONS: Question[] = [
  { 
    id: 'comm-l1', 
    category: 'COMMUNICATION', 
    lsrwType: 'LISTENING',
    subTopic: 'Audio Comprehension',
    difficulty: 'Medium',
    text: 'Based on the audio clip, what is the main objective of the proposed project?',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [{ text: 'Cost reduction', isCorrect: false }, { text: 'Market expansion', isCorrect: true }, { text: 'Team restructuring', isCorrect: false }, { text: 'Legal compliance', isCorrect: false }]
  },
  {
    id: 'comm-s1',
    category: 'COMMUNICATION',
    lsrwType: 'SPEAKING',
    subTopic: 'Oral Articulation',
    difficulty: 'Hard',
    text: 'Summarize your understanding of Microservices architecture in 60 seconds.',
  },
  {
    id: 'comm-r1',
    category: 'COMMUNICATION',
    lsrwType: 'READING',
    subTopic: 'Reading Speed',
    difficulty: 'Medium',
    paragraph: 'Agile methodologies prioritize iterative development, where requirements and solutions evolve through the collaborative effort of self-organizing and cross-functional teams.',
    text: 'What does Agile prioritize according to the text?',
    options: [{ text: 'Iterative development', isCorrect: true }, { text: 'Linear planning', isCorrect: false }, { text: 'Individual silos', isCorrect: false }, { text: 'Rigid documentation', isCorrect: false }]
  },
  {
    id: 'comm-w1',
    category: 'COMMUNICATION',
    lsrwType: 'WRITING',
    subTopic: 'Professional Writing',
    difficulty: 'Medium',
    scenario: 'Write a professional email to a client explaining a 2-day delay in the delivery of a module.',
    text: 'Scenario: Your team has encountered a critical bug. Write a concise email to the project manager detailing the impact and estimated resolution time.'
  }
];

export const DEMO_PROJECT_QUESTIONS: Question[] = [
  {
    id: 'proj-1',
    category: 'PROJECT',
    subTopic: 'Web Dev',
    difficulty: 'Hard',
    title: 'Distributed E-Commerce Architecture',
    problemStatement: 'The current monolithic backend is failing under high concurrent load (10k+ requests per second). You need to design and justify a migration path for the Inventory and Order services into a resilient microservice environment.',
    text: 'Database Schema Design: Define the relational schema for the new inventory microservice including normalization and index strategies.',
    modules: [
      { name: 'Gateway Auth Module', task: 'Implement a resilient authentication and routing mechanism for incoming microservice traffic.' },
      { name: 'Inventory Sync Module', task: 'Design a high-performance logic for real-time stock deductions across multiple regions.' },
      { name: 'Event Bus Integration', task: 'Develop the logic to ensure eventual consistency between Order and Inventory databases using RabbitMQ/Kafka.' }
    ],
    options: [
      { text: 'Optimistic Locking with retry queues', isCorrect: true },
      { text: 'Global Pessimistic Locking on the primary database', isCorrect: false },
      { text: 'Linearizing all requests through a single thread', isCorrect: false },
      { text: 'Ignoring consistency to prioritize low latency', isCorrect: false }
    ],
    justificationQs: [
        'Why is eventual consistency preferred over strong consistency in this high-load scenario?',
        'How does your chosen database schema prevent race conditions during bulk flash sales?'
    ]
  }
];

export const DEMO_PSYCHOMETRIC_QUESTIONS: Question[] = [
  { 
    id: 'psy1', 
    category: 'PSYCHOMETRIC', 
    subTopic: 'Professional Integrity', 
    difficulty: 'Medium', 
    text: 'How do you handle a situation where a colleague takes credit for your work?',
    options: [{ text: 'Ignore it', isCorrect: false }, { text: 'Publicly confront them', isCorrect: false }, { text: 'Private conversation to clarify contribution', isCorrect: true }, { text: 'Complain to the CEO immediately', isCorrect: false }]
  }
];

export const SIMULATION_QUESTIONS: Question[] = [
    ...DEMO_APTITUDE_QUESTIONS,
    ...DEMO_TECHNICAL_QUESTIONS,
    ...DEMO_CODING_QUESTIONS,
    ...DEMO_COMMUNICATION_QUESTIONS,
    ...DEMO_PROJECT_QUESTIONS,
    ...DEMO_PSYCHOMETRIC_QUESTIONS
];

const STUDENTS: Student[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `s${i + 1}`,
  name: i === 0 ? `Alex Johnson` : `Student ${i + 1}`,
  email: i === 0 ? `student1@univ.edu` : `student${i + 1}@univ.edu`,
  role: 'STUDENT',
  avatar: `https://picsum.photos/seed/s${i + 1}/200`,
  department: i % 2 === 0 ? 'Computer Science' : 'Electronics',
  year: '4th Year',
  batch: i % 2 === 0 ? 'Batch A' : 'Batch B',
  targetRole: i === 0 ? 'Full Stack Developer' : (i % 3 === 0 ? 'Full Stack Dev' : 'Data Analyst'),
  overallScore: i === 0 ? 78 : (Math.floor(Math.random() * 40) + 50),
  skills: {
    aptitude: 85, coding: 72, communication: 90, domain: 88, project: 80, technical: 82, psychometric: 88,
  },
  modulesCompleted: 3,
  totalModules: 12,
  status: 'Ready',
  onboardingCompleted: true, 
  resumes: [],
}));

export const loginUser = async (email: string, role: UserRole) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return STUDENTS.find(s => s.email === email) || STUDENTS[0];
};

export const getStudentDashboardData = async (studentId: string) => {
  const student = STUDENTS.find(s => s.id === studentId) || STUDENTS[0];
  return {
    profile: student,
    learningPaths: [
      { id: 'lp-quant', title: 'Quantitative Mastery', description: 'Advanced mathematical reasoning.', completed: 65, category: 'APTITUDE', subTopic: 'Quantitative' },
      { id: 'lp-logic', title: 'Logical Deductions', description: 'Master syllogisms and puzzles.', completed: 40, category: 'APTITUDE', subTopic: 'Logical' },
      { id: 'lp-verbal', title: 'Verbal Proficiency', description: 'Vocabulary and grammar.', completed: 85, category: 'APTITUDE', subTopic: 'Verbal' },
      { id: 'lp-os', title: 'OS Architectures', description: 'Kernel internals.', completed: 50, category: 'TECHNICAL', subTopic: 'Operating Systems' },
      { id: 'lp-dbms', title: 'Relational Frameworks', description: 'Query optimization.', completed: 30, category: 'TECHNICAL', subTopic: 'DBMS' },
      { id: 'lp-dsa', title: 'Data Structures Hub', description: 'Trees and Graphs.', completed: 45, category: 'CODING', subTopic: 'Algorithms' },
      { id: 'lp-cloud', title: 'Cloud Infrastructure', description: 'AWS and DevOps.', completed: 20, category: 'DOMAIN', subTopic: 'Cloud Computing' },
      { id: 'lp-web', title: 'Full Stack Lab', description: 'MERN applications.', completed: 70, category: 'PROJECT', subTopic: 'Web Dev' },
    ],
    assessments: [
      { id: 'a-quant', title: 'Quantitative Diagnostic', type: 'APTITUDE', subTopic: 'Quantitative', questions: 5, durationMins: 20, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-logic', title: 'Logical Reasoning Mock', type: 'APTITUDE', subTopic: 'Logical', questions: 5, durationMins: 15, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-verbal', title: 'Verbal Assessment', type: 'APTITUDE', subTopic: 'Verbal', questions: 5, durationMins: 15, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-os', title: 'Operating Systems Quiz', type: 'TECHNICAL', subTopic: 'Operating Systems', questions: 10, durationMins: 25, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-code-1', title: 'Algorithm Challenge #1', type: 'CODING', subTopic: 'Algorithms', questions: 1, durationMins: 90, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-psy-1', title: 'Workplace Ethics Review', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', questions: 1, durationMins: 30, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-proj-1', title: 'Backend Migration Lab', type: 'PROJECT', subTopic: 'Web Dev', questions: 1, durationMins: 120, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-dom-1', title: 'System Architecture Exam', type: 'DOMAIN', subTopic: 'Cloud Computing', questions: 10, durationMins: 30, difficulty: 'Hard', status: 'ACTIVE' },
    ],
    readinessExam: { 
      id: 're1', 
      title: 'GradUp+ Placement Readiness Simulation', 
      type: 'SIMULATION', 
      questions: 28, 
      durationMins: 180, 
      status: 'ACTIVE', 
      difficulty: 'Hard',
      description: 'The definitive end-to-end evaluation for engineering recruitment excellence.' 
    },
    practiceSets: [
      { id: 'ps-quant', title: 'Time and Distance Drill', type: 'APTITUDE', subTopic: 'Quantitative', items: 30 },
      { id: 'ps-code-1', title: 'Daily String Algorithms', type: 'CODING', subTopic: 'Algorithms', items: 10 },
    ],
    history: [{ id: 'h1', title: 'Logical Reasoning Mock', type: 'APTITUDE', score: 82, date: 'Oct 12, 2023' }],
    analytics: [
      { subject: 'Aptitude', A: 85, fullMark: 100 },
      { subject: 'Coding', A: 72, fullMark: 100 },
      { subject: 'Communication', A: 90, fullMark: 100 },
      { subject: 'Domain', A: 88, fullMark: 100 },
      { subject: 'Projects', A: 80, fullMark: 100 },
      { subject: 'Technical', A: 82, fullMark: 100 },
    ]
  };
};

export const ONBOARDING_QUESTIONS = [
  { id: 1, question: "Complexity of search in balanced BST?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
];

export const updateUserProfile = async (userData: any): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return userData as User;
};

export const completeStudentOnboarding = async (studentId: string, data: any): Promise<Student | null> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const student = STUDENTS.find(s => s.id === studentId);
  if (student) return { ...student, ...data, onboardingCompleted: true } as Student;
  return null;
};

export const getFacultyDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { students: STUDENTS, batches: [], assessments: [], announcements: [] };
};

export const createAssessment = async (assessment: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: `a${Date.now()}`, ...assessment, status: 'ACTIVE' };
};

export const getCompanyDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { candidates: STUDENTS, activeAssessments: [], jobs: [], interviews: [] };
};

export const getContributorDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { stats: { total: 0, approved: 0, pending: 0 }, recentActivity: [] };
};

export const getAdminDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { stats: { totalUsers: 0, pendingApprovals: 0 }, institutions: [], contributors: [], contentAudit: [], auditLogs: [] };
};

export const getSuperAdminDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { globalStats: { revenueSim: '$0' }, institutions: [], plans: [], auditLogs: [] };
};
