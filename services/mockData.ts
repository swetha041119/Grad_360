
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
  // Listening (5)
  {
    id: 'comm-l1',
    category: 'COMMUNICATION',
    lsrwType: 'LISTENING',
    subTopic: 'Listening',
    difficulty: 'Medium',
    text: 'Based on the audio clip, what is the speaker\'s main message?',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [{ text: 'The importance of punctuality', isCorrect: false }, { text: 'Effective teamwork leads to success', isCorrect: true }, { text: 'Time management skills', isCorrect: false }, { text: 'Meeting deadlines consistently', isCorrect: false }]
  },
  {
    id: 'comm-l2',
    category: 'COMMUNICATION',
    lsrwType: 'LISTENING',
    subTopic: 'Listening',
    difficulty: 'Easy',
    text: 'What emotion does the speaker convey in the audio?',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [{ text: 'Enthusiasm', isCorrect: true }, { text: 'Frustration', isCorrect: false }, { text: 'Confusion', isCorrect: false }, { text: 'Disappointment', isCorrect: false }]
  },
  {
    id: 'comm-l3',
    category: 'COMMUNICATION',
    lsrwType: 'LISTENING',
    subTopic: 'Listening',
    difficulty: 'Hard',
    text: 'According to the audio, what is the recommended approach to problem-solving?',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [{ text: 'Working independently', isCorrect: false }, { text: 'Collaborative discussion', isCorrect: true }, { text: 'Seeking external help', isCorrect: false }, { text: 'Trial and error', isCorrect: false }]
  },
  {
    id: 'comm-l4',
    category: 'COMMUNICATION',
    lsrwType: 'LISTENING',
    subTopic: 'Listening',
    difficulty: 'Medium',
    text: 'What does the speaker suggest as the most important skill?',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [{ text: 'Technical knowledge', isCorrect: false }, { text: 'Communication skills', isCorrect: true }, { text: 'Leadership abilities', isCorrect: false }, { text: 'Decision-making', isCorrect: false }]
  },
  {
    id: 'comm-l5',
    category: 'COMMUNICATION',
    lsrwType: 'LISTENING',
    subTopic: 'Listening',
    difficulty: 'Easy',
    text: 'What is the overall tone of the presentation?',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [{ text: 'Formal and serious', isCorrect: false }, { text: 'Friendly and encouraging', isCorrect: true }, { text: 'Stern and critical', isCorrect: false }, { text: 'Neutral and detached', isCorrect: false }]
  },

  // Reading (5)
  {
    id: 'comm-r1',
    category: 'COMMUNICATION',
    lsrwType: 'READING',
    subTopic: 'Reading',
    difficulty: 'Medium',
    paragraph: 'Effective communication in the workplace involves active listening, clear expression of ideas, and understanding different perspectives. It helps build strong relationships and creates a positive work environment.',
    text: 'What is a key component of workplace communication?',
    options: [{ text: 'Active listening', isCorrect: true }, { text: 'Giving orders', isCorrect: false }, { text: 'Avoiding conflicts', isCorrect: false }, { text: 'Working alone', isCorrect: false }]
  },
  {
    id: 'comm-r2',
    category: 'COMMUNICATION',
    lsrwType: 'READING',
    subTopic: 'Reading',
    difficulty: 'Easy',
    paragraph: 'Time management is the process of organizing and planning how to divide your time between different activities. Good time management enables you to work smarter, not harder, so that you get more done in less time.',
    text: 'What is the main benefit of time management?',
    options: [{ text: 'Working longer hours', isCorrect: false }, { text: 'Getting more done efficiently', isCorrect: true }, { text: 'Avoiding all tasks', isCorrect: false }, { text: 'Delegating everything', isCorrect: false }]
  },
  {
    id: 'comm-r3',
    category: 'COMMUNICATION',
    lsrwType: 'READING',
    subTopic: 'Reading',
    difficulty: 'Hard',
    paragraph: 'Professional networking is about building long-term relationships with people in your industry. It involves sharing knowledge, experiences, and opportunities. Networking can open doors to new job opportunities, partnerships, and valuable insights.',
    text: 'What is the primary purpose of professional networking?',
    options: [{ text: 'Collecting business cards', isCorrect: false }, { text: 'Building long-term relationships', isCorrect: true }, { text: 'Attending social events', isCorrect: false }, { text: 'Selling products', isCorrect: false }]
  },
  {
    id: 'comm-r4',
    category: 'COMMUNICATION',
    lsrwType: 'READING',
    subTopic: 'Reading',
    difficulty: 'Medium',
    paragraph: 'Adaptability in the workplace means being flexible and open to change. It involves adjusting to new situations, learning new skills, and embracing different ways of working. Employees who are adaptable tend to thrive in dynamic environments.',
    text: 'What does adaptability in the workplace involve?',
    options: [{ text: 'Resisting change', isCorrect: false }, { text: 'Being flexible and open to change', isCorrect: true }, { text: 'Following only old methods', isCorrect: false }, { text: 'Avoiding new challenges', isCorrect: false }]
  },
  {
    id: 'comm-r5',
    category: 'COMMUNICATION',
    lsrwType: 'READING',
    subTopic: 'Reading',
    difficulty: 'Easy',
    paragraph: 'Goal setting is an important tool for success in any area of life. It helps you focus your efforts, measure your progress, and stay motivated. Clear and achievable goals provide direction and purpose.',
    text: 'What is a benefit of setting goals?',
    options: [{ text: 'Creating confusion', isCorrect: false }, { text: 'Providing direction and focus', isCorrect: true }, { text: 'Avoiding responsibility', isCorrect: false }, { text: 'Limiting opportunities', isCorrect: false }]
  },

  // Speaking (5)
  {
    id: 'comm-s1',
    category: 'COMMUNICATION',
    lsrwType: 'SPEAKING',
    subTopic: 'Speaking',
    difficulty: 'Hard',
    text: 'Describe your biggest professional achievement and what you learned from it.',
  },
  {
    id: 'comm-s2',
    category: 'COMMUNICATION',
    lsrwType: 'SPEAKING',
    subTopic: 'Speaking',
    difficulty: 'Medium',
    text: 'Explain how you handle conflicts or disagreements in a team setting.',
  },
  {
    id: 'comm-s3',
    category: 'COMMUNICATION',
    lsrwType: 'SPEAKING',
    subTopic: 'Speaking',
    difficulty: 'Easy',
    text: 'Introduce yourself and talk about your strengths for 60 seconds.',
  },
  {
    id: 'comm-s4',
    category: 'COMMUNICATION',
    lsrwType: 'SPEAKING',
    subTopic: 'Speaking',
    difficulty: 'Hard',
    text: 'Present a solution to improve workplace communication in your organization.',
  },
  {
    id: 'comm-s5',
    category: 'COMMUNICATION',
    lsrwType: 'SPEAKING',
    subTopic: 'Speaking',
    difficulty: 'Medium',
    text: 'Discuss why continuous learning is important in today\'s workplace.',
  },

  // Writing (5)
  {
    id: 'comm-w1',
    category: 'COMMUNICATION',
    lsrwType: 'WRITING',
    subTopic: 'Writing',
    difficulty: 'Medium',
    scenario: 'Write a professional email to inform your manager about completing an assigned task ahead of schedule.',
    text: 'Scenario: You have completed your work early. Write an email to your manager highlighting the completion and asking for next steps.'
  },
  {
    id: 'comm-w2',
    category: 'COMMUNICATION',
    lsrwType: 'WRITING',
    subTopic: 'Writing',
    difficulty: 'Easy',
    scenario: 'Write a thank you note to a colleague who helped you with a task.',
    text: 'Express your gratitude to a team member who assisted you in completing a challenging assignment.'
  },
  {
    id: 'comm-w3',
    category: 'COMMUNICATION',
    lsrwType: 'WRITING',
    subTopic: 'Writing',
    difficulty: 'Hard',
    scenario: 'Draft a professional message requesting a meeting with senior management.',
    text: 'Write a formal email requesting a 30-minute meeting to discuss a new initiative you would like to propose.'
  },
  {
    id: 'comm-w4',
    category: 'COMMUNICATION',
    lsrwType: 'WRITING',
    subTopic: 'Writing',
    difficulty: 'Medium',
    scenario: 'Compose a brief update for your team about changes in work schedule.',
    text: 'Write a team announcement about updated office hours and remote work policies.'
  },
  {
    id: 'comm-w5',
    category: 'COMMUNICATION',
    lsrwType: 'WRITING',
    subTopic: 'Writing',
    difficulty: 'Easy',
    scenario: 'Write a message to welcome a new team member.',
    text: 'Compose a friendly welcome message introducing yourself and offering help to a new colleague joining your team.'
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

export const DEMO_DOMAIN_QUESTIONS: Question[] = [
  {
    id: 'dom1',
    category: 'DOMAIN',
    subTopic: 'Cloud Computing',
    difficulty: 'Medium',
    text: 'Which AWS service provides a managed Kubernetes service?',
    options: [{ text: 'ECS', isCorrect: false }, { text: 'EKS', isCorrect: true }, { text: 'Lambda', isCorrect: false }, { text: 'Fargate', isCorrect: false }]
  },
  {
    id: 'dom2',
    category: 'DOMAIN',
    subTopic: 'System Design',
    difficulty: 'Hard',
    text: 'In a microservices architecture, what pattern is used to handle distributed transactions?',
    options: [{ text: 'Two-Phase Commit', isCorrect: false }, { text: 'Saga Pattern', isCorrect: true }, { text: 'ACID Transactions', isCorrect: false }, { text: 'Mutex Locks', isCorrect: false }]
  },
  {
    id: 'dom3',
    category: 'DOMAIN',
    subTopic: 'DevOps',
    difficulty: 'Medium',
    text: 'What is the primary purpose of a CI/CD pipeline?',
    options: [{ text: 'Manual deployment', isCorrect: false }, { text: 'Automated testing and deployment', isCorrect: true }, { text: 'Database backup', isCorrect: false }, { text: 'User authentication', isCorrect: false }]
  },
  {
    id: 'dom4',
    category: 'DOMAIN',
    subTopic: 'Cloud Computing',
    difficulty: 'Easy',
    text: 'Which of the following is a NoSQL database?',
    options: [{ text: 'PostgreSQL', isCorrect: false }, { text: 'MySQL', isCorrect: false }, { text: 'MongoDB', isCorrect: true }, { text: 'Oracle', isCorrect: false }]
  },
  {
    id: 'dom5',
    category: 'DOMAIN',
    subTopic: 'System Design',
    difficulty: 'Hard',
    text: 'What is the CAP theorem in distributed systems?',
    options: [{ text: 'Consistency, Availability, Partition tolerance', isCorrect: true }, { text: 'Cache, API, Performance', isCorrect: false }, { text: 'Compute, Access, Protocol', isCorrect: false }, { text: 'Cloud, Application, Platform', isCorrect: false }]
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
  ...DEMO_DOMAIN_QUESTIONS,
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
      // Aptitude & Logic (3 cards)
      { id: 'lp-quant', title: 'Personalised Learning Path', description: 'Advanced mathematical reasoning and problem-solving skills.', completed: 65, category: 'APTITUDE', subTopic: 'Quantitative' },
      { id: 'lp-faculty-test', title: 'Faculty Shared', description: 'Complete assigned assessments on time.', completed: 45, category: 'APTITUDE', subTopic: 'Quantitative' },
      { id: 'lp-weekly-assess', title: 'Self Practice Test', description: 'Track progress with weekly checkpoints.', completed: 72, category: 'APTITUDE', subTopic: 'Quantitative' },
      
      // Technical Essentials (3 cards)
      { id: 'lp-tech-1', title: 'Personalised Learning Path', description: 'Core computer science fundamentals and concepts.', completed: 50, category: 'TECHNICAL', subTopic: 'Operating Systems' },
      { id: 'lp-tech-2', title: 'Faculty Shared', description: 'Technical assignments from instructors.', completed: 38, category: 'TECHNICAL', subTopic: 'Operating Systems' },
      { id: 'lp-tech-3', title: 'Self Practice Test', description: 'Strengthen technical foundation independently.', completed: 55, category: 'TECHNICAL', subTopic: 'Operating Systems' },
      
      // Coding & Tech (3 cards)
      { id: 'lp-code-1', title: 'Personalised Learning Path', description: 'Algorithm design and data structure mastery.', completed: 45, category: 'CODING', subTopic: 'Algorithms' },
      { id: 'lp-code-2', title: 'Faculty Shared', description: 'Coding challenges assigned by faculty.', completed: 60, category: 'CODING', subTopic: 'Algorithms' },
      { id: 'lp-code-3', title: 'Self Practice Test', description: 'Daily coding practice and problem solving.', completed: 52, category: 'CODING', subTopic: 'Algorithms' },
      
      // Psychometric Skill (3 cards)
      { id: 'lp-psy-1', title: 'Personalised Learning Path', description: 'Behavioral traits and professional aptitude.', completed: 70, category: 'PSYCHOMETRIC', subTopic: 'Professional Integrity' },
      { id: 'lp-psy-2', title: 'Faculty Shared', description: 'Personality assessment from mentors.', completed: 65, category: 'PSYCHOMETRIC', subTopic: 'Professional Integrity' },
      { id: 'lp-psy-3', title: 'Self Practice Test', description: 'Self-assessment of work ethic and values.', completed: 78, category: 'PSYCHOMETRIC', subTopic: 'Professional Integrity' },
      
      // Domain Knowledge (3 cards)
      { id: 'lp-dom-1', title: 'Personalised Learning Path', description: 'Industry-specific expertise and trends.', completed: 20, category: 'DOMAIN', subTopic: 'Cloud Computing' },
      { id: 'lp-dom-2', title: 'Faculty Shared', description: 'Domain topics curated by experts.', completed: 35, category: 'DOMAIN', subTopic: 'Cloud Computing' },
      { id: 'lp-dom-3', title: 'Self Practice Test', description: 'Build domain knowledge through practice.', completed: 28, category: 'DOMAIN', subTopic: 'Cloud Computing' },
      
      // Communication Skill (3 cards)
      { id: 'lp-comm-1', title: 'Personalised Learning Path', description: 'Listening, speaking, reading, and writing excellence.', completed: 82, category: 'COMMUNICATION', subTopic: 'LSRW' },
      { id: 'lp-comm-2', title: 'Faculty Shared', description: 'Communication exercises from instructors.', completed: 75, category: 'COMMUNICATION', subTopic: 'LSRW' },
      { id: 'lp-comm-3', title: 'Self Practice Test', description: 'Improve communication skills independently.', completed: 88, category: 'COMMUNICATION', subTopic: 'LSRW' },
      
      // Projects Skill (3 cards)
      { id: 'lp-proj-1', title: 'Personalised Learning Path', description: 'Hands-on project development experience.', completed: 70, category: 'PROJECT', subTopic: 'Web Dev' },
      { id: 'lp-proj-2', title: 'Faculty Shared', description: 'Project assignments from faculty members.', completed: 55, category: 'PROJECT', subTopic: 'Web Dev' },
      { id: 'lp-proj-3', title: 'Self Practice Test', description: 'Personal projects and portfolio building.', completed: 68, category: 'PROJECT', subTopic: 'Web Dev' },
    ],
    assessments: [
      // Aptitude & Logic (3 cards)
      { id: 'a-quant', title: 'Quantitative Diagnostic', type: 'APTITUDE', subTopic: 'Quantitative', questions: 5, durationMins: 20, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-faculty-assigned', title: 'Faculty Assigned Evaluation', type: 'APTITUDE', subTopic: 'Quantitative', questions: 10, durationMins: 30, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-weekly-test', title: 'Weekly Progress Test', type: 'APTITUDE', subTopic: 'Quantitative', questions: 8, durationMins: 25, difficulty: 'Easy', status: 'ACTIVE' },
      
      // Technical Essentials (3 cards)
      { id: 'a-tech-1', title: 'Technical Fundamentals Test', type: 'TECHNICAL', subTopic: 'Operating Systems', questions: 10, durationMins: 25, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-tech-2', title: 'Faculty Technical Assessment', type: 'TECHNICAL', subTopic: 'Operating Systems', questions: 12, durationMins: 35, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-tech-3', title: 'Technical Practice Quiz', type: 'TECHNICAL', subTopic: 'Operating Systems', questions: 8, durationMins: 20, difficulty: 'Easy', status: 'ACTIVE' },
      
      // Coding & Tech (3 cards)
      { id: 'a-code-1', title: 'Algorithm Challenge', type: 'CODING', subTopic: 'Algorithms', questions: 3, durationMins: 90, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-code-2', title: 'Faculty Coding Assignment', type: 'CODING', subTopic: 'Algorithms', questions: 2, durationMins: 60, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-code-3', title: 'Coding Practice Set', type: 'CODING', subTopic: 'Algorithms', questions: 5, durationMins: 45, difficulty: 'Easy', status: 'ACTIVE' },
      
      // Psychometric Skill (3 cards)
      { id: 'a-psy-1', title: 'Workplace Ethics Review', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', questions: 15, durationMins: 30, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-psy-2', title: 'Faculty Behavior Assessment', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', questions: 20, durationMins: 40, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-psy-3', title: 'Personality Self-Test', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', questions: 10, durationMins: 25, difficulty: 'Easy', status: 'ACTIVE' },
      
      // Domain Knowledge (3 cards)
      { id: 'a-dom-1', title: 'Domain Expertise Test', type: 'DOMAIN', subTopic: 'Cloud Computing', questions: 10, durationMins: 30, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-dom-2', title: 'Faculty Domain Assessment', type: 'DOMAIN', subTopic: 'Cloud Computing', questions: 12, durationMins: 35, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-dom-3', title: 'Domain Practice Quiz', type: 'DOMAIN', subTopic: 'Cloud Computing', questions: 8, durationMins: 20, difficulty: 'Easy', status: 'ACTIVE' },
      
      // Communication Skill (3 cards)
      { id: 'a-comm-1', title: 'LSRW Comprehensive Test', type: 'COMMUNICATION', subTopic: 'LSRW', questions: 20, durationMins: 50, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-comm-2', title: 'Faculty Communication Evaluation', type: 'COMMUNICATION', subTopic: 'LSRW', questions: 15, durationMins: 40, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-comm-3', title: 'Communication Skills Practice', type: 'COMMUNICATION', subTopic: 'LSRW', questions: 10, durationMins: 30, difficulty: 'Easy', status: 'ACTIVE' },
      
      // Projects Skill (3 cards)
      { id: 'a-proj-1', title: 'Project Implementation Test', type: 'PROJECT', subTopic: 'Web Dev', questions: 1, durationMins: 120, difficulty: 'Hard', status: 'ACTIVE' },
      { id: 'a-proj-2', title: 'Faculty Project Review', type: 'PROJECT', subTopic: 'Web Dev', questions: 1, durationMins: 90, difficulty: 'Medium', status: 'ACTIVE' },
      { id: 'a-proj-3', title: 'Project Practice Lab', type: 'PROJECT', subTopic: 'Web Dev', questions: 1, durationMins: 60, difficulty: 'Easy', status: 'ACTIVE' },
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
      // Aptitude & Logic (3 cards)
      { id: 'ps-quant', title: 'Time and Distance Drill', type: 'APTITUDE', subTopic: 'Quantitative', items: 30 },
      { id: 'ps-faculty-practice', title: 'Faculty Practice Set', type: 'APTITUDE', subTopic: 'Quantitative', items: 25 },
      { id: 'ps-weekly-drills', title: 'Weekly Skill Drills', type: 'APTITUDE', subTopic: 'Quantitative', items: 20 },
      
      // Technical Essentials (3 cards)
      { id: 'ps-tech-1', title: 'Technical Concepts Practice', type: 'TECHNICAL', subTopic: 'Operating Systems', items: 35 },
      { id: 'ps-tech-2', title: 'Faculty Tech Drills', type: 'TECHNICAL', subTopic: 'Operating Systems', items: 28 },
      { id: 'ps-tech-3', title: 'Self-Study Tech Questions', type: 'TECHNICAL', subTopic: 'Operating Systems', items: 22 },
      
      // Coding & Tech (3 cards)
      { id: 'ps-code-1', title: 'Daily Coding Algorithms', type: 'CODING', subTopic: 'Algorithms', items: 40 },
      { id: 'ps-code-2', title: 'Faculty Coding Challenges', type: 'CODING', subTopic: 'Algorithms', items: 32 },
      { id: 'ps-code-3', title: 'Problem Solving Practice', type: 'CODING', subTopic: 'Algorithms', items: 25 },
      
      // Psychometric Skill (3 cards)
      { id: 'ps-psy-1', title: 'Behavioral Scenarios', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', items: 30 },
      { id: 'ps-psy-2', title: 'Faculty Personality Tests', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', items: 24 },
      { id: 'ps-psy-3', title: 'Work Ethics Practice', type: 'PSYCHOMETRIC', subTopic: 'Professional Integrity', items: 18 },
      
      // Domain Knowledge (3 cards)
      { id: 'ps-dom-1', title: 'Domain Knowledge Drills', type: 'DOMAIN', subTopic: 'Cloud Computing', items: 35 },
      { id: 'ps-dom-2', title: 'Faculty Domain Practice', type: 'DOMAIN', subTopic: 'Cloud Computing', items: 28 },
      { id: 'ps-dom-3', title: 'Industry Trends Quiz', type: 'DOMAIN', subTopic: 'Cloud Computing', items: 20 },
      
      // Communication Skill (3 cards)
      { id: 'ps-comm-1', title: 'LSRW Practice Sessions', type: 'COMMUNICATION', subTopic: 'LSRW', items: 40 },
      { id: 'ps-comm-2', title: 'Faculty Communication Drills', type: 'COMMUNICATION', subTopic: 'LSRW', items: 32 },
      { id: 'ps-comm-3', title: 'Speaking & Writing Practice', type: 'COMMUNICATION', subTopic: 'LSRW', items: 25 },
      
      // Projects Skill (3 cards)
      { id: 'ps-proj-1', title: 'Project Development Tasks', type: 'PROJECT', subTopic: 'Web Dev', items: 15 },
      { id: 'ps-proj-2', title: 'Faculty Project Assignments', type: 'PROJECT', subTopic: 'Web Dev', items: 12 },
      { id: 'ps-proj-3', title: 'Portfolio Building Exercises', type: 'PROJECT', subTopic: 'Web Dev', items: 10 },
    ],
    history: [
      { id: 'h1', title: 'Logical Reasoning Mock', type: 'APTITUDE', score: 82, date: 'Oct 12, 2023' },
      { id: 'h2', title: 'Algorithm Challenge', type: 'CODING', score: 78, date: 'Oct 18, 2023' },
      { id: 'h3', title: 'Communication Skills Test', type: 'COMMUNICATION', score: 88, date: 'Oct 25, 2023' },
      { id: 'h4', title: 'Technical Fundamentals Quiz', type: 'TECHNICAL', score: 75, date: 'Nov 02, 2023' },
      { id: 'h5', title: 'Domain Knowledge Assessment', type: 'DOMAIN', score: 85, date: 'Nov 10, 2023' },
    ],
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
