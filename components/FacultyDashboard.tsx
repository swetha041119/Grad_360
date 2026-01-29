
import React, { useState, useEffect } from 'react';
import { Faculty, Student, Assessment, Announcement } from '../types';
import { getFacultyDashboardData, createAssessment } from '../services/mockData';
import { 
  Plus, Bell, Clock, FileText, TrendingUp, 
  Users, Zap, Search, Filter, Trash2, Edit3, 
  ChevronRight, Eye, GraduationCap, Calendar, Video, MapPin, Briefcase, 
  Download, Send, Database, BarChart3, PieChart, Activity, Target, 
  CheckCircle, AlertCircle, BookOpen, Award, FileCheck, X
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

interface Props {
  user: Faculty;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FacultyDashboard: React.FC<Props> = ({ user, activeTab, setActiveTab }) => {
  const [data, setData] = useState<any>(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAssessment, setNewAssessment] = useState({ title: '', type: 'APTITUDE', questions: 20, durationMins: 45, batch: 'All Batches', difficulty: 'Medium' });
  const [showTopCandidates, setShowTopCandidates] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    getFacultyDashboardData().then(setData);
  }, []);

  const handleCreateAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAssessment({ ...newAssessment, type: newAssessment.type as any, difficulty: newAssessment.difficulty as any });
    getFacultyDashboardData().then(setData);
    setIsAssessmentModalOpen(false);
  };

  if (!data) return <div className="p-10 text-center animate-pulse text-primary-600 font-bold uppercase tracking-widest">Syncing Faculty Dashboard...</div>;


  const handleShortlist = () => {
    setShowTopCandidates(true);
    setActiveTab('students');
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Faculty Institution</h1>
            </div>
            <div className="flex gap-3">
                <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all">New Session</button>
                <button onClick={() => setIsAssessmentModalOpen(true)} className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-700 transition-all">New Test</button>
            </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-3">Avg Readiness</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter">74.2%</h3>
                    <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-green-600 text-xs font-bold mt-2">+5.1% this month</p>
            </div>
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-3">Placement Ready</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter">48</h3>
                    <Users className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-500 text-xs font-bold mt-2">Candidates Identified</p>
            </div>
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-3">Active Tests</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter">1</h3>
                    <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-gray-500 text-xs font-bold mt-2">Active evaluations</p>
            </div>
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-3">Sessions</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter">2</h3>
                    <Calendar className="w-6 h-6 text-indigo-500" />
                </div>
                <p className="text-primary-600 text-xs font-bold mt-2">Managed sessions</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-gray-900 text-2xl tracking-tight">Batch Readiness Analysis</h3>
                    <button className="text-primary-600 font-black text-xs uppercase tracking-widest hover:underline">Download Stats</button>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Batch A', score: 75 },
                            { name: 'Batch B', score: 65 },
                            { name: 'Batch C', score: 82 }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} domain={[0, 100]} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                            <Bar dataKey="score" fill="#dc2626" radius={[8, 8, 0, 0]} barSize={60} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                    <Clock className="w-6 h-6 text-primary-600" />
                    <h3 className="font-black text-gray-900 text-2xl tracking-tight">Upcoming Schedule</h3>
                </div>
                <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-indigo-700" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-gray-900 text-sm">Algorithm Deep Dive</h4>
                            <p className="text-xs text-gray-500 font-bold mt-1">10:00 AM • BATCH A</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-indigo-700" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-gray-900 text-sm">Mock Interview Prep</h4>
                            <p className="text-xs text-gray-500 font-bold mt-1">02:00 PM • BATCH B</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-indigo-700" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-gray-900 text-sm">System Design Masterclass</h4>
                            <p className="text-xs text-gray-500 font-bold mt-1">Tomorrow, 11:00 AM • BATCH C</p>
                        </div>
                    </div>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Attendance Center</button>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-6 h-6 text-primary-400" />
                    <h3 className="text-2xl font-black tracking-tight">Institution Notices</h3>
                </div>
                <div className="space-y-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base mb-2">Hackathon Registration</h4>
                                <p className="text-sm text-gray-400">Register for the internal hackathon by next Monday.</p>
                            </div>
                        </div>
                        <span className="text-xs font-black text-primary-400 uppercase tracking-wider">2H Ago</span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Target className="w-8 h-8 text-red-900" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight">Shortlisting Pending</h3>
                    </div>
                </div>
                <p className="text-gray-200 text-sm mb-6 leading-relaxed">Google SE role has 450 applicants. Help companies filter top candidates based on internal audits.</p>
                <button onClick={() => setActiveTab('jobs')} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg">Open Portal</button>
            </div>
        </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="space-y-6 animate-fadeIn">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Zap className="w-10 h-10 mr-3 text-primary-600" /> Assessments Hub</h2>
                <p className="text-gray-500 mt-1 font-medium text-sm">Create, manage and track department evaluations and results.</p>
            </div>
            <button onClick={() => setIsAssessmentModalOpen(true)} className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-black flex items-center shadow-lg hover:bg-primary-700 transition-all text-xs uppercase tracking-widest">
                <Plus className="w-4 h-4 mr-2" /> Create New Test
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Python Basics Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-green-100 text-green-700">Active</span>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Edit3 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>
                <h4 className="font-black text-2xl text-gray-900 mb-2 tracking-tight">Python Basics</h4>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-8">Coding • Medium</p>
                
                <div className="mt-auto">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Submissions</p>
                            <p className="text-sm font-black text-gray-900">45 / 50</p>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-600 rounded-full" style={{ width: '90%' }} />
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> View Student Status
                    </button>
                </div>
            </div>

            {/* Data Structures Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-green-100 text-green-700">Active</span>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Edit3 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>
                <h4 className="font-black text-2xl text-gray-900 mb-2 tracking-tight">Data Structures</h4>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-8">Technical • Hard</p>
                
                <div className="mt-auto">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Submissions</p>
                            <p className="text-sm font-black text-gray-900">38 / 50</p>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-600 rounded-full" style={{ width: '76%' }} />
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> View Student Status
                    </button>
                </div>
            </div>

            {/* Aptitude Test Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-blue-100 text-blue-700">Scheduled</span>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Edit3 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>
                <h4 className="font-black text-2xl text-gray-900 mb-2 tracking-tight">Aptitude Test</h4>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-8">Aptitude • Easy</p>
                
                <div className="mt-auto">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Submissions</p>
                            <p className="text-sm font-black text-gray-900">0 / 50</p>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-300 rounded-full" style={{ width: '0%' }} />
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> View Student Status
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  const renderStudents = () => {
    let displayedStudents = [...data.students];
    
    // Filter by search term
    if (searchTerm) {
        displayedStudents = displayedStudents.filter((s: Student) => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Filter by shortlist (Top 10 by overallScore)
    if (showTopCandidates) {
        displayedStudents = displayedStudents
            .sort((a, b) => b.overallScore - a.overallScore)
            .slice(0, 10);
    }

    return (
    <div className="space-y-5 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by name, ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm outline-none w-64 transition-all font-medium text-sm" />
                </div>
                <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                    <Filter className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead className="border-b border-gray-100">
                    <tr>
                        <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Candidate</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Batch</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Readiness</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Skill Split</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {displayedStudents.map((s: Student, idx: number) => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                                        {showTopCandidates && idx < 3 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-[10px] font-black">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">{s.name}</p>
                                        <p className="text-xs text-gray-400 font-medium uppercase">{s.department}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <p className="text-gray-600 font-bold text-xs">{s.batch}</p>
                            </td>
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 max-w-[100px]">
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary-600 rounded-full" style={{ width: `${s.overallScore}%` }} />
                                        </div>
                                    </div>
                                    <span className="font-black text-gray-900 text-sm min-w-[40px]">{s.overallScore}%</span>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-black">{s.skills.coding}</span>
                                    <span className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-black">{s.skills.aptitude}</span>
                                    <span className="px-2.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-black">{s.skills.communication}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <button onClick={() => setSelectedStudent(s)} className="text-primary-600 font-black text-xs uppercase tracking-wider hover:underline flex items-center gap-1.5">
                                    View Full Profiles <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
  };


  const renderSessions = () => (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Training Sessions</h2>
                <p className="text-gray-500 mt-2 font-medium">Schedule and manage live training sessions.</p>
            </div>
            <button className="px-8 py-4 bg-primary-600 text-white rounded-3xl font-black shadow-xl hover:bg-primary-700 transition-all text-sm uppercase tracking-widest flex items-center gap-3">
                <Plus className="w-5 h-5" /> Schedule Session
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-[32px] text-white shadow-2xl">
                <Calendar className="w-12 h-12 mb-4 opacity-80" />
                <div className="text-5xl font-black tracking-tighter mb-2">12</div>
                <p className="text-blue-100 font-bold text-sm uppercase tracking-wider">Upcoming Sessions</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-[32px] text-white shadow-2xl">
                <Video className="w-12 h-12 mb-4 opacity-80" />
                <div className="text-5xl font-black tracking-tighter mb-2">8</div>
                <p className="text-green-100 font-bold text-sm uppercase tracking-wider">Live Sessions</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-[32px] text-white shadow-2xl">
                <Users className="w-12 h-12 mb-4 opacity-80" />
                <div className="text-5xl font-black tracking-tighter mb-2">340</div>
                <p className="text-purple-100 font-bold text-sm uppercase tracking-wider">Total Attendees</p>
            </div>
        </div>

        <div className="grid gap-6">
            {[
                { id: 1, title: 'Advanced Data Structures', type: 'Technical', date: 'Jan 30, 2026', time: '10:00 AM', duration: '2 hrs', attendees: 45, status: 'Scheduled', batch: 'Batch A' },
                { id: 2, title: 'System Design Fundamentals', type: 'Domain', date: 'Jan 31, 2026', time: '2:00 PM', duration: '3 hrs', attendees: 38, status: 'Scheduled', batch: 'Batch B' },
                { id: 3, title: 'Mock Interview Practice', type: 'Communication', date: 'Feb 1, 2026', time: '11:00 AM', duration: '1.5 hrs', attendees: 28, status: 'Live', batch: 'All Batches' },
                { id: 4, title: 'Aptitude Quick Review', type: 'Aptitude', date: 'Feb 2, 2026', time: '9:00 AM', duration: '1 hr', attendees: 52, status: 'Scheduled', batch: 'Batch A' },
            ].map(session => (
                <div key={session.id} className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                                    session.status === 'Live' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                }`}>{session.status}</span>
                                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-black uppercase tracking-wider">{session.type}</span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">{session.title}</h3>
                            <div className="flex items-center gap-6 text-gray-500 font-bold text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {session.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {session.time}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {session.attendees} Students
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration:</span>
                                <span className="ml-2 text-sm font-black text-gray-900">{session.duration}</span>
                                <span className="ml-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Batch:</span>
                                <span className="ml-2 text-sm font-black text-gray-900">{session.batch}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {session.status === 'Live' && (
                                <button className="px-6 py-3 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-green-700 transition-all">
                                    Join Now
                                </button>
                            )}
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-gray-200 transition-all">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderJobsShortlist = () => (
    <div className="space-y-5 animate-fadeIn">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center"><Briefcase className="w-8 h-8 mr-2 text-primary-600" /> Jobs & Shortlist</h2>
                <p className="text-gray-500 mt-1 font-medium text-xs">Bridge the gap by recommending high-performing students to company postings.</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {[
                { 
                    id: 1, 
                    company: 'Google', 
                    role: 'Software Engineer', 
                    logo: 'https://www.google.com/favicon.ico',
                    salary: '120K USD', 
                    applicants: 450,
                    logoColor: 'bg-white',
                    icon: '🔴'
                },
                { 
                    id: 2, 
                    company: 'Microsoft', 
                    role: 'Product Manager', 
                    logo: 'https://www.microsoft.com/favicon.ico',
                    salary: '115K USD', 
                    applicants: 230,
                    logoColor: 'bg-gray-100',
                    icon: '⊞'
                },
            ].map(job => (
                <div key={job.id} className="bg-white p-6 rounded-[24px] shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 ${job.logoColor} rounded-xl flex items-center justify-center shadow-sm border border-gray-100`}>
                                <span className="text-2xl">{job.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 tracking-tight">{job.role}</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{job.company}</p>
                            </div>
                        </div>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                            <span className="text-gray-400 text-lg">⋮</span>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-6 mb-5">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-600 font-bold text-xs uppercase tracking-wider">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-bold text-xs uppercase tracking-wider">{job.applicants} Applicants</span>
                        </div>
                    </div>
                    
                    <button onClick={handleShortlist} className="w-full py-3 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg">
                        Shortlist Top 10%
                    </button>
                </div>
            ))}
        </div>
    </div>
  );

  const renderVisualIntelligence = () => (
    <div className="space-y-6 animate-fadeIn">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Visual Intelligence</h2>
                <p className="text-gray-500 mt-1 font-medium text-sm">Analytics and insights dashboard for data-driven decisions.</p>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all text-xs uppercase tracking-widest flex items-center gap-2">
                <Download className="w-4 h-4" /> Export Report
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-slate-900 to-black p-6 rounded-[24px] text-white shadow-lg">
                <TrendingUp className="w-10 h-10 mb-3 opacity-80" />
                <div className="text-4xl font-black tracking-tighter mb-2">82%</div>
                <p className="text-gray-300 font-bold text-xs uppercase tracking-wider">Average Performance</p>
            </div>
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-[24px] text-white shadow-lg">
                <Activity className="w-10 h-10 mb-3 opacity-80" />
                <div className="text-4xl font-black tracking-tighter mb-2">94%</div>
                <p className="text-red-100 font-bold text-xs uppercase tracking-wider">Engagement Rate</p>
            </div>
            <div className="bg-white p-6 rounded-[24px] border-2 border-gray-900 shadow-lg">
                <Target className="w-10 h-10 mb-3 text-gray-900" />
                <div className="text-4xl font-black tracking-tighter mb-2 text-gray-900">76%</div>
                <p className="text-gray-600 font-bold text-xs uppercase tracking-wider">Placement Target</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[24px] shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Skill Distribution</h3>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                    {[
                        { skill: 'Aptitude', value: 85 },
                        { skill: 'Coding', value: 72 },
                        { skill: 'Communication', value: 90 },
                        { skill: 'Technical', value: 78 },
                        { skill: 'Domain', value: 68 },
                    ].map(item => (
                        <div key={item.skill}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-gray-700">{item.skill}</span>
                                <span className="text-sm font-black text-gray-900">{item.value}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-600 rounded-full" style={{ width: `${item.value}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Performance Trends</h3>
                    <PieChart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Excellent', count: 45, color: 'bg-slate-900 text-white', icon: CheckCircle },
                        { label: 'Good', count: 78, color: 'bg-gray-200 text-gray-900', icon: TrendingUp },
                        { label: 'Average', count: 32, color: 'bg-gray-100 text-gray-700', icon: Activity },
                        { label: 'Needs Focus', count: 18, color: 'bg-primary-100 text-primary-700', icon: AlertCircle },
                    ].map(item => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className={`p-4 rounded-[18px] ${item.color}`}>
                                <Icon className="w-6 h-6 mb-2" />
                                <div className="text-2xl font-black tracking-tighter mb-1">{item.count}</div>
                                <p className="font-bold text-[10px] uppercase tracking-wider">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-gray-900 tracking-tighter">1,240</div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Assessments Taken</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-gray-900 tracking-tighter">892</div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Certifications</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-gray-900 tracking-tighter">3,456</div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Study Hours</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderDataRepository = () => (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Data Repository</h2>
                <p className="text-gray-500 mt-2 font-medium">Access and manage educational resources and materials.</p>
            </div>
            <button className="px-8 py-4 bg-primary-600 text-white rounded-3xl font-black shadow-xl hover:bg-primary-700 transition-all text-sm uppercase tracking-widest flex items-center gap-3">
                <Plus className="w-5 h-5" /> Upload Resource
            </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <Database className="w-10 h-10 text-blue-600 mb-4" />
                <div className="text-4xl font-black text-gray-900 tracking-tighter mb-2">245</div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Resources</p>
            </div>
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <BookOpen className="w-10 h-10 text-green-600 mb-4" />
                <div className="text-4xl font-black text-gray-900 tracking-tighter mb-2">128</div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Study Materials</p>
            </div>
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <FileText className="w-10 h-10 text-purple-600 mb-4" />
                <div className="text-4xl font-black text-gray-900 tracking-tighter mb-2">89</div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Question Banks</p>
            </div>
            <div className="bg-white p-6 rounded-[28px] shadow-lg border border-gray-100">
                <Video className="w-10 h-10 text-orange-600 mb-4" />
                <div className="text-4xl font-black text-gray-900 tracking-tighter mb-2">28</div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Video Lectures</p>
            </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search resources..." className="pl-12 pr-6 py-3 border border-gray-200 rounded-2xl bg-white font-bold outline-none w-full" />
                </div>
                <select className="px-6 py-3 border border-gray-200 rounded-2xl bg-white font-bold outline-none">
                    <option>All Categories</option>
                    <option>Aptitude</option>
                    <option>Coding</option>
                    <option>Communication</option>
                    <option>Technical</option>
                </select>
            </div>

            <div className="grid gap-4">
                {[
                    { id: 1, title: 'Data Structures & Algorithms Complete Guide', category: 'Coding', type: 'PDF', size: '12.5 MB', downloads: 156, date: 'Jan 15, 2026' },
                    { id: 2, title: 'System Design Interview Questions', category: 'Technical', type: 'PDF', size: '8.2 MB', downloads: 243, date: 'Jan 20, 2026' },
                    { id: 3, title: 'Quantitative Aptitude Practice Set', category: 'Aptitude', type: 'PDF', size: '5.8 MB', downloads: 198, date: 'Jan 22, 2026' },
                    { id: 4, title: 'Communication Skills Workshop Recording', category: 'Communication', type: 'Video', size: '245 MB', downloads: 87, date: 'Jan 25, 2026' },
                    { id: 5, title: 'Database Management Systems Notes', category: 'Technical', type: 'PDF', size: '10.3 MB', downloads: 134, date: 'Jan 28, 2026' },
                ].map(resource => (
                    <div key={resource.id} className="p-6 border border-gray-100 rounded-[24px] hover:bg-gray-50 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                    resource.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
                                }`}>
                                    {resource.type === 'PDF' ? (
                                        <FileText className={`w-7 h-7 ${
                                            resource.type === 'PDF' ? 'text-red-600' : 'text-blue-600'
                                        }`} />
                                    ) : (
                                        <Video className="w-7 h-7 text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight mb-1">{resource.title}</h3>
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                        <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg uppercase tracking-wider">{resource.category}</span>
                                        <span>{resource.type} • {resource.size}</span>
                                        <span>{resource.downloads} Downloads</span>
                                        <span>{resource.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all">
                                    <Download className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

    return (
      <>
        <div className="space-y-8 animate-fadeIn">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'assessments' && renderAssessments()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'jobs' && renderJobsShortlist()}
            {activeTab === 'intelligence' && renderVisualIntelligence()}
        </div>

        {selectedStudent && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
              <div className="bg-white rounded-[32px] p-6 max-w-4xl w-full shadow-2xl relative">
                  <button 
                      onClick={() => setSelectedStudent(null)}
                      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                      <X className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-4 mb-5">
                      <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                      <div>
                          <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{selectedStudent.name}</h3>
                          <p className="text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Full Stack Developer</p>
                      </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-[28px] p-6 mb-5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                           <TrendingUp className="w-4 h-4 text-red-500" />
                           <h4 className="font-black text-gray-900 text-base tracking-tight">Readiness Spectrum</h4>
                      </div>
                      
                      <div className="flex flex-col xl:flex-row items-center gap-6">
                          <div className="flex-1 w-full h-52 flex items-center justify-center -ml-4">
                              <ResponsiveContainer width="100%" height="100%">
                                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                                          { subject: 'Aptitude', A: selectedStudent.skills.aptitude, fullMark: 100 },
                                          { subject: 'Technical', A: selectedStudent.skills.technical || 75, fullMark: 100 }, 
                                          { subject: 'Coding', A: selectedStudent.skills.coding, fullMark: 100 },
                                          { subject: 'Communication', A: selectedStudent.skills.communication, fullMark: 100 },
                                          { subject: 'Projects', A: selectedStudent.skills.project || 80, fullMark: 100 },
                                          { subject: 'Domain', A: selectedStudent.skills.domain || 85, fullMark: 100 },
                                          { subject: 'Psychometric', A: selectedStudent.skills.psychometric || 88, fullMark: 100 },
                                      ]}>
                                      <PolarGrid stroke="#e2e8f0" />
                                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                      <Radar
                                          name="Student"
                                          dataKey="A"
                                          stroke="#dc2626"
                                          strokeWidth={2}
                                          fill="#fef2f2"
                                          fillOpacity={0.6}
                                      />
                                  </RadarChart>
                              </ResponsiveContainer>
                          </div>

                          <div className="flex-1 w-full space-y-2">
                              <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Mastery Indicators</p>
                              {[
                                  { skill: 'Aptitude', value: selectedStudent.skills.aptitude },
                                  { skill: 'Coding', value: selectedStudent.skills.coding },
                                  { skill: 'Communication', value: selectedStudent.skills.communication },
                                  { skill: 'Domain', value: selectedStudent.skills.domain || 88 },
                                  { skill: 'Projects', value: selectedStudent.skills.project || 80 },
                                  { skill: 'Technical', value: selectedStudent.skills.technical || 82 },
                                  { skill: 'Psychometric', value: selectedStudent.skills.psychometric || 88 },
                              ].map((item) => (
                                  <div key={item.skill} className="flex items-center justify-between p-2.5 bg-white rounded-xl shadow-sm border border-gray-100/50 hover:border-gray-200 transition-all group">
                                      <div className="flex items-center gap-3">
                                          <div className="w-1 h-6 bg-gray-100 rounded-full group-hover:bg-red-500 transition-colors" />
                                          <div>
                                              <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{item.skill}</h4>
                                              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Mastery Level</p>
                                          </div>
                                      </div>
                                      <span className="text-lg font-black text-gray-900 tracking-tighter">{item.value}%</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="flex gap-4">
                      <button className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg hover:shadow-xl">
                          Send Assessment
                      </button>
                      <button className="flex-1 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
                          Schedule Prep
                      </button>
                      <button className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2">
                          <Download className="w-4 h-4" /> Resume
                      </button>
                  </div>
              </div>
          </div>
        )}

        {isAssessmentModalOpen && (
             <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
                 <div className="bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl">
                     <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-8">Deploy Test</h3>
                     <form onSubmit={handleCreateAssessment} className="space-y-6">
                         <div>
                             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Title</label>
                             <input type="text" value={newAssessment.title} onChange={e => setNewAssessment({...newAssessment, title: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-bold outline-none" required />
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                                 <select value={newAssessment.type} onChange={e => setNewAssessment({...newAssessment, type: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-bold outline-none">
                                     <option value="APTITUDE">Aptitude</option>
                                     <option value="CODING">Coding</option>
                                     <option value="TECHNICAL">Technical Core</option>
                                 </select>
                             </div>
                             <div>
                                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Level</label>
                                 <select value={newAssessment.difficulty} onChange={e => setNewAssessment({...newAssessment, difficulty: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-bold outline-none">
                                     <option>Easy</option>
                                     <option>Medium</option>
                                     <option>Hard</option>
                                 </select>
                             </div>
                         </div>
                         <button type="submit" className="w-full py-5 bg-primary-600 text-white rounded-3xl font-black shadow-2xl hover:bg-primary-700 transition-all text-xs uppercase tracking-widest">Publish Diagnostic</button>
                         <button type="button" onClick={() => setIsAssessmentModalOpen(false)} className="w-full py-5 bg-slate-100 text-gray-500 rounded-3xl font-black text-xs uppercase tracking-widest mt-2">Cancel</button>
                     </form>
                 </div>
             </div>
        )}
      </>
    );
};

export default FacultyDashboard;
