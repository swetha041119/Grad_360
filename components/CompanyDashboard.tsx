
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Company, Student, Job, Interview, Assessment } from '../types';
import { getCompanyDashboardData } from '../services/mockData';
import { Search, Briefcase, Filter, Mail, FileText, CheckCircle, Users, Download, Plus, Clock, Video, Calendar, MoreVertical, X, Award, ChevronRight, User as UserIcon, Send, Zap, Trash2, Eye, Star, Edit3, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
    user: Company;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const CompanyDashboard: React.FC<Props> = ({ user, activeTab, setActiveTab }) => {
    const [data, setData] = useState<{
        candidates: Student[],
        activeAssessments: Assessment[],
        jobs: Job[],
        interviews: Interview[]
    } | null>(null);

    // Modals & Search State
    const [selectedCandidate, setSelectedCandidate] = useState<Student | null>(null);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
    const [isSendAssessmentModalOpen, setIsSendAssessmentModalOpen] = useState(false);
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form States
    const [newJob, setNewJob] = useState({ title: '', role: '', type: 'Full-time', location: 'Remote', package: '', skills: '' });
    const [newInterview, setNewInterview] = useState({ studentId: '', date: '', time: '', type: 'Technical', link: '' });
    const [newAssessment, setNewAssessment] = useState({ title: '', type: 'CODING', questions: 10, durationMins: 30, difficulty: 'Medium' });
    const [sendTarget, setSendTarget] = useState({ assessmentId: '', studentId: '' });
    const [feedbackData, setFeedbackData] = useState({ technical: 0, communication: 0, confidence: 0, remarks: '', verdict: 'Hold' });
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
    const [clickedVertex, setClickedVertex] = useState<string | null>(null);
    const [isModalAnimating, setIsModalAnimating] = useState(false);

    // Handle modal open with animation
    const openCandidateModal = (candidate: Student) => {
        setIsModalAnimating(true);
        setSelectedCandidate(candidate);
        setClickedVertex(null);
    };

    // Handle modal close
    const closeCandidateModal = () => {
        setIsModalAnimating(false);
        setTimeout(() => setSelectedCandidate(null), 300);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        getCompanyDashboardData().then(setData);
    }

    const handleCreateJob = (e: React.FormEvent) => {
        e.preventDefault();
        if (data) {
            const job: Job = {
                id: `j${Date.now()}`,
                title: newJob.title,
                companyName: user.companyName,
                skills: newJob.skills.split(',').map(s => s.trim()),
                type: newJob.type as any,
                location: newJob.location,
                package: newJob.package,
                status: 'Active',
                applicants: 0,
                postedDate: 'Just now'
            };
            data.jobs.push(job);
            setData({ ...data });
            setIsJobModalOpen(false);
        }
    }

    const handleCreateAssessment = (e: React.FormEvent) => {
        e.preventDefault();
        if (data) {
            const assessment: Assessment = {
                id: `ca${Date.now()}`,
                title: newAssessment.title,
                type: newAssessment.type as any,
                questions: newAssessment.questions,
                durationMins: newAssessment.durationMins,
                difficulty: newAssessment.difficulty as any,
                status: 'ACTIVE',
                candidatesCount: 0,
                avgScore: 0
            };
            data.activeAssessments.push(assessment);
            setData({ ...data });
            setIsAssessmentModalOpen(false);
            alert('Custom Recruitment Assessment Created!');
        }
    }

    const handleSendAssessment = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation of sending
        alert('Assessment successfully dispatched to the candidate!');
        setIsSendAssessmentModalOpen(false);
    }

    const handleScheduleInterview = (e: React.FormEvent) => {
        e.preventDefault();
        if (data) {
            const student = data.candidates.find(s => s.id === newInterview.studentId);
            if (student) {
                const interview: Interview = {
                    id: `i${Date.now()}`,
                    studentId: student.id,
                    studentName: student.name,
                    studentAvatar: student.avatar,
                    jobTitle: 'Software Engineer (Screening)',
                    date: newInterview.date,
                    time: newInterview.time,
                    type: newInterview.type as any,
                    status: 'Scheduled',
                    meetingLink: newInterview.link
                };
                data.interviews.push(interview);
                setData({ ...data });
                setIsInterviewModalOpen(false);
                alert('Interview Scheduled!');
            }
        }
    }

    const handleSubmitFeedback = () => {
        if (data && selectedInterview) {
            selectedInterview.status = 'Completed';
            selectedInterview.feedback = {
                technical: feedbackData.technical,
                communication: feedbackData.communication,
                confidence: feedbackData.confidence,
                remarks: feedbackData.remarks,
                verdict: feedbackData.verdict as any
            };
            setData({ ...data });
            setIsFeedbackModalOpen(false);
            alert('Feedback Submitted!');
        }
    }

    if (!data) return <div className="p-10 text-center animate-pulse text-primary-600 font-bold uppercase tracking-widest font-inter">Initializing Console...</div>;

    // --- Render Sections ---

    const renderDashboardOverview = () => (
        <div className="space-y-8 animate-fadeIn font-inter">
            <header className="bg-slate-900 p-12 rounded-[48px] text-white shadow-xl relative overflow-hidden mb-12">
                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-white/10 p-2.5 rounded-xl">
                            <Briefcase className="w-6 h-6 text-primary-500" />
                        </div>
                        <span className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em]">Recruitment Operations</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter">
                        {user.companyName} Command Center
                    </h1>
                    <p className="text-gray-400 mt-6 max-w-2xl font-medium opacity-80 leading-relaxed text-lg">Source talent, manage custom assessments, and coordinate interview rounds with data-driven insights.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary-600/10 to-transparent"></div>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: 'Qualified Talent', val: data.candidates.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Openings', val: data.jobs.filter(j => j.status === 'Active').length, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Avg Skill Baseline', val: '74.2%', icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        <div className="flex justify-between items-end mt-4">
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.val}</h3>
                            <div className={`${stat.bg} p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon className="w-7 h-7" /></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10 mt-12">
                <div className="lg:col-span-2 bg-white p-12 rounded-[56px] border border-gray-100 shadow-sm">
                    <h3 className="font-black text-gray-900 text-2xl tracking-tighter mb-12">Talent Insights Pipeline</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { stage: 'Applied', count: 120 },
                                { stage: 'Screening', count: 85 },
                                { stage: 'Interview', count: 32 },
                                { stage: 'Offer', count: 8 },
                                { stage: 'Hired', count: 5 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontFamily: 'Inter' }} />
                                <Bar dataKey="count" fill="#dc2626" radius={[8, 8, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[56px] border border-gray-100 shadow-sm">
                    <h3 className="font-black text-gray-900 text-2xl tracking-tighter mb-8">Quick Actions</h3>
                    <div className="space-y-5">
                        {[
                            { label: 'Post Opening', icon: Plus, sub: 'New Listing', color: 'text-green-600', bg: 'bg-green-50', act: () => setIsJobModalOpen(true) },
                            { label: 'Schedule Round', icon: Calendar, sub: 'Interview Prep', color: 'text-blue-600', bg: 'bg-blue-50', act: () => setIsInterviewModalOpen(true) },
                            { label: 'Assess Skill', icon: Zap, sub: 'Evaluation', color: 'text-primary-600', bg: 'bg-primary-50', act: () => setActiveTab('assessments') },
                        ].map((btn, i) => (
                            <button key={i} onClick={btn.act} className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-[32px] hover:bg-white border-2 border-transparent hover:border-slate-100 transition-all group">
                                <div className="flex items-center space-x-5 text-left">
                                    <div className={`${btn.bg} p-4 rounded-2xl ${btn.color} group-hover:scale-110 transition-transform shadow-sm`}><btn.icon className="w-6 h-6" /></div>
                                    <div>
                                        <span className="font-black text-gray-900 block text-base">{btn.label}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{btn.sub}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-primary-600 transition-all" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCandidates = () => (
        <div className="space-y-8 animate-fadeIn font-inter">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Users className="w-10 h-10 mr-4 text-primary-600" /> Talent Pool</h2>
                    <p className="text-gray-500 mt-2 font-medium">Verified student profiles from partner institutions.</p>
                </div>
                <div className="relative">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by name or skill..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 pr-6 py-5 rounded-[24px] border border-gray-100 bg-white shadow-sm outline-none w-80 transition-all font-bold" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {data && data.candidates.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <div key={s.id} className="bg-white p-10 rounded-[48px] border border-gray-100 flex items-center justify-between hover:shadow-2xl transition-all group">
                        <div className="flex items-center gap-6">
                            <img src={s.avatar} className="w-20 h-20 rounded-[28px] border-4 border-slate-50 object-cover" alt={s.name} />
                            <div>
                                <p className="font-black text-gray-900 text-xl leading-tight">{s.name}</p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">{s.targetRole} • {s.department}</p>
                                <div className="flex gap-2 mt-4">
                                    <span className="text-[10px] font-black bg-primary-50 px-3 py-1.5 rounded-xl border border-primary-100 text-primary-600 uppercase tracking-widest">Score: {s.overallScore}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => openCandidateModal(s)} className="px-6 py-3 bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-700 transition-all text-center shadow-lg shadow-primary-600/20">Profile</button>
                            <button onClick={() => { setSendTarget({ ...sendTarget, studentId: s.id }); setIsSendAssessmentModalOpen(true); }} className="px-6 py-3 bg-slate-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 text-center">Assign</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderJobs = () => (
        <div className="space-y-6 animate-fadeIn font-inter">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center"><Briefcase className="w-9 h-9 mr-3 text-primary-600" /> Job Postings</h2>
                    <p className="text-gray-500 mt-1 font-normal text-base">Maintain and monitor your corporate openings within GradUp.</p>
                </div>
                <button onClick={() => setIsJobModalOpen(true)} className="bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold flex items-center shadow-lg hover:bg-primary-700 transition-all text-sm">
                    <Plus className="w-4 h-4 mr-2" /> Post New Job
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {data && data.jobs.map((j) => (
                    <div key={j.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase bg-green-100 text-green-700">Active</span>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">{j.postedDate}</span>
                        </div>

                        <h4 className="font-black text-2xl text-slate-900 mb-2 tracking-tight">{j.title}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">{j.location} • {j.type}</p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {j.skills.map((s, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wide">{s}</span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-black text-primary-600 tracking-tight">{j.applicants}</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Active Applicants</p>
                            </div>
                            <button className="p-2 hover:bg-gray-50 rounded-lg transition-all">
                                <span className="text-gray-400 text-2xl">⋮</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAssessments = () => (
        <div className="space-y-8 animate-fadeIn font-inter">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Zap className="w-10 h-10 mr-4 text-red-600" /> Assessment Hub</h2>
                    <p className="text-gray-500 mt-2 font-medium">Create custom coding/logic tests and dispatch them to potential hires.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg hover:bg-black transition-all text-sm">
                        <Send className="w-4 h-4 mr-2" /> Send to Candidates
                    </button>
                    <button onClick={() => setIsAssessmentModalOpen(true)} className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg hover:bg-red-700 transition-all text-sm">
                        <Plus className="w-4 h-4 mr-2" /> Create Logic Test
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-8 border-b border-gray-100 bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <div className="col-span-4">Test Profile</div>
                    <div className="col-span-2 text-center">Category</div>
                    <div className="col-span-2 text-center">Participants</div>
                    <div className="col-span-2 text-center">Success Rate</div>
                    <div className="col-span-2 text-right">Action</div>
                </div>

                {data && data.activeAssessments.map((a) => (
                    <div key={a.id} className="grid grid-cols-12 gap-4 p-8 items-center border-b border-gray-50 hover:bg-gray-50 transition-all">
                        <div className="col-span-4">
                            <h4 className="font-black text-xl text-gray-900 tracking-tight">{a.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{a.questions} Items • {a.durationMins}M</span>
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-200">{a.type}</span>
                        </div>
                        <div className="col-span-2 text-center font-bold text-gray-900">{a.candidatesCount} students</div>
                        <div className="col-span-2 flex items-center gap-3 justify-center">
                            <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${a.avgScore}%` }} />
                            </div>
                            <span className="text-sm font-black text-green-600">{a.avgScore}%</span>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button className="text-[10px] font-black text-red-600 hover:text-red-700 uppercase tracking-widest flex items-center gap-1 hover:underline">
                                Detailed Audit <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderInterviews = () => (
        <div className="space-y-8 animate-fadeIn font-inter">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Calendar className="w-10 h-10 mr-4 text-red-600" /> Scheduled Interviews</h2>
                    <p className="text-gray-500 mt-2 font-medium">Coordinate live video rounds and submit real-time feedback scores.</p>
                </div>
                <button onClick={() => setIsInterviewModalOpen(true)} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg hover:bg-black transition-all text-sm">
                    <Calendar className="w-4 h-4 mr-2" /> New Live Round
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data && data.interviews.map((i) => (
                    <div key={i.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">Scheduled</span>
                            <button className="text-gray-300 hover:text-gray-500"><MoreVertical className="w-5 h-5" /></button>
                        </div>

                        <div className="flex items-center gap-5 mb-8">
                            <img src={i.studentAvatar} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100" alt={i.studentName} />
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">{i.studentName}</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">SDE-1</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                <Calendar className="w-4 h-4 text-red-500" />
                                <span>{i.date} @ {i.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                <Video className="w-4 h-4 text-red-500" />
                                <span className="uppercase">{i.type} Round</span>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/20">
                                Launch Meet
                            </button>
                            <button onClick={() => { setSelectedInterview(i); setIsFeedbackModalOpen(true); }} className="flex-1 py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all border border-slate-100">
                                Score
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fadeIn font-inter">
            {activeTab === 'dashboard' && renderDashboardOverview()}
            {activeTab === 'candidates' && renderCandidates()}
            {activeTab === 'jobs' && renderJobs()}
            {activeTab === 'assessments' && renderAssessments()}
            {activeTab === 'interviews' && renderInterviews()}

            {/* Candidate Profile Modal */}
            {selectedCandidate && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                    <style>{`
                    @keyframes flowerBloom {
                      0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
                      50% { transform: scale(1.05) rotate(2deg); opacity: 1; }
                      100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    }
                    @keyframes flowerClose {
                      0% { transform: scale(1) rotate(0deg); opacity: 1; }
                      100% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
                    }
                    .flower-bloom { animation: flowerBloom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                    .flower-close { animation: flowerClose 0.3s ease-in forwards; }
                    .spectrum-vertex { cursor: pointer; }
                  `}</style>
                    <div className={`bg-white rounded-[32px] max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${isModalAnimating ? 'flower-bloom' : 'flower-close'}`}>
                        {/* Header - Fixed */}
                        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-100 flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <img src={selectedCandidate.avatar} className="w-14 h-14 rounded-2xl border-2 border-slate-50 object-cover shadow-sm" alt={selectedCandidate.name} />
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedCandidate.name}</h3>
                                    <p className="text-primary-600 font-black uppercase tracking-[0.2em] text-[9px] mt-0.5">{selectedCandidate.targetRole}</p>
                                </div>
                            </div>
                            <button onClick={closeCandidateModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-slate-100 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* Two Column Layout: Radar Chart + Resume */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                {/* Radar Chart Section */}
                                <div className="bg-slate-50/80 rounded-[20px] p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp className="w-4 h-4 text-primary-600" />
                                        <h4 className="text-sm font-black text-slate-900 tracking-tight">Skill Analysis Spectrum</h4>
                                        <span className="text-[8px] text-gray-400 ml-auto">(Click vertices to view %)</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="relative w-full max-w-[200px] aspect-square">
                                            <svg viewBox="0 0 400 400" className="w-full h-full">
                                                {[1, 0.75, 0.5, 0.25].map((scale, idx) => {
                                                    const angles = [0, 60, 120, 180, 240, 300].map(a => (a * Math.PI) / 180);
                                                    const radius = 140;
                                                    const points = angles.map(angle => [
                                                        200 + radius * scale * Math.sin(angle),
                                                        200 - radius * scale * Math.cos(angle)
                                                    ]);
                                                    return (
                                                        <polygon key={idx} points={points.map(p => p.join(',')).join(' ')} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                                                    );
                                                })}
                                                {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                                                    const rad = (angle * Math.PI) / 180;
                                                    return <line key={idx} x1="200" y1="200" x2={200 + 140 * Math.sin(rad)} y2={200 - 140 * Math.cos(rad)} stroke="#e2e8f0" strokeWidth="1.5" />;
                                                })}
                                                <polygon
                                                    points={[
                                                        { angle: 0, value: selectedCandidate.skills.aptitude },
                                                        { angle: 60, value: selectedCandidate.skills.coding },
                                                        { angle: 120, value: selectedCandidate.skills.communication },
                                                        { angle: 180, value: selectedCandidate.skills.domain },
                                                        { angle: 240, value: selectedCandidate.skills.project },
                                                        { angle: 300, value: selectedCandidate.skills.technical }
                                                    ].map(({ angle, value }) => {
                                                        const rad = (angle * Math.PI) / 180;
                                                        const r = 140 * (value / 100);
                                                        return `${200 + r * Math.sin(rad)},${200 - r * Math.cos(rad)}`;
                                                    }).join(' ')}
                                                    fill="rgba(220, 38, 38, 0.15)" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round"
                                                />
                                                {/* Clickable Vertex Points with Percentages */}
                                                {[
                                                    { angle: 0, value: selectedCandidate.skills.aptitude, label: 'Aptitude', labelX: 200, labelY: 50 },
                                                    { angle: 60, value: selectedCandidate.skills.coding, label: 'Coding', labelX: 315, labelY: 130 },
                                                    { angle: 120, value: selectedCandidate.skills.communication, label: 'Comm', labelX: 315, labelY: 275 },
                                                    { angle: 180, value: selectedCandidate.skills.domain, label: 'Domain', labelX: 200, labelY: 355 },
                                                    { angle: 240, value: selectedCandidate.skills.project, label: 'Projects', labelX: 85, labelY: 275 },
                                                    { angle: 300, value: selectedCandidate.skills.technical, label: 'Technical', labelX: 85, labelY: 130 }
                                                ].map(({ angle, value, label, labelX, labelY }) => {
                                                    const rad = (angle * Math.PI) / 180;
                                                    const r = 140 * (value / 100);
                                                    const x = 200 + r * Math.sin(rad);
                                                    const y = 200 - r * Math.cos(rad);
                                                    const isClicked = clickedVertex === label;
                                                    return (
                                                        <g key={label}>
                                                            {/* Label */}
                                                            <text
                                                                x={labelX}
                                                                y={labelY}
                                                                textAnchor={labelX < 200 ? 'end' : labelX > 200 ? 'start' : 'middle'}
                                                                className="fill-gray-500 text-[11px] font-bold cursor-pointer hover:fill-primary-600"
                                                                onClick={() => setClickedVertex(isClicked ? null : label)}
                                                            >
                                                                {label}
                                                            </text>
                                                            {/* Clickable Vertex Circle */}
                                                            <circle
                                                                cx={x}
                                                                cy={y}
                                                                r={isClicked ? 12 : 8}
                                                                fill={isClicked ? '#dc2626' : '#fef2f2'}
                                                                stroke="#dc2626"
                                                                strokeWidth="2"
                                                                className="spectrum-vertex"
                                                                onClick={() => setClickedVertex(isClicked ? null : label)}
                                                            />
                                                            {/* Percentage Tooltip on Click */}
                                                            {isClicked && (
                                                                <g>
                                                                    <rect
                                                                        x={x - 25}
                                                                        y={y - 35}
                                                                        width="50"
                                                                        height="24"
                                                                        rx="8"
                                                                        fill="#1e293b"
                                                                    />
                                                                    <polygon
                                                                        points={`${x - 6},${y - 11} ${x + 6},${y - 11} ${x},${y - 5}`}
                                                                        fill="#1e293b"
                                                                    />
                                                                    <text
                                                                        x={x}
                                                                        y={y - 18}
                                                                        textAnchor="middle"
                                                                        className="fill-white text-[13px] font-black"
                                                                    >
                                                                        {value}%
                                                                    </text>
                                                                </g>
                                                            )}
                                                        </g>
                                                    );
                                                })}
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Resume Document Preview */}
                                <div className="bg-white rounded-[20px] border-2 border-slate-200 shadow-sm overflow-hidden">
                                    <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-white/80" />
                                            <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">{selectedCandidate.name.split(' ')[0]}_Resume.pdf</span>
                                        </div>
                                        <button className="text-[9px] font-bold text-primary-400 uppercase tracking-wider hover:text-primary-300 flex items-center gap-1">
                                            <Eye className="w-3 h-3" /> Open
                                        </button>
                                    </div>
                                    <div className="p-4 bg-white space-y-3">
                                        {/* Resume Header */}
                                        <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                                            <img src={selectedCandidate.avatar} className="w-12 h-12 rounded-lg object-cover border border-slate-200" alt="" />
                                            <div className="flex-1">
                                                <h5 className="text-base font-black text-slate-900">{selectedCandidate.name}</h5>
                                                <p className="text-[10px] text-primary-600 font-bold">{selectedCandidate.targetRole}</p>
                                                <p className="text-[9px] text-slate-400 mt-0.5">📧 {selectedCandidate.name.toLowerCase().replace(' ', '.')}@email.com</p>
                                            </div>
                                        </div>
                                        {/* Resume Sections */}
                                        <div>
                                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">🎓 Education</p>
                                            <p className="text-[10px] text-slate-600 font-medium pl-4">{selectedCandidate.department}</p>
                                            <p className="text-[9px] text-slate-400 pl-4">CGPA: 8.5 | 2022 - 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">💼 Experience</p>
                                            <p className="text-[10px] text-slate-600 font-medium pl-4">Software Engineering Intern - TechCorp</p>
                                            <p className="text-[9px] text-slate-400 pl-4">Built REST APIs, React dashboards | 6 months</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">⚡ Skills</p>
                                            <div className="flex flex-wrap gap-1 pl-4">
                                                {['React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'AWS'].map((s) => (
                                                    <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[8px] font-bold rounded">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skill Score Cards - 2 Rows of 3 */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {[
                                    { label: 'APTITUDE', value: selectedCandidate.skills.aptitude, color: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
                                    { label: 'CODING', value: selectedCandidate.skills.coding, color: 'bg-green-500', lightBg: 'bg-green-50', textColor: 'text-green-600' },
                                    { label: 'COMMUNICATION', value: selectedCandidate.skills.communication, color: 'bg-purple-500', lightBg: 'bg-purple-50', textColor: 'text-purple-600' },
                                    { label: 'DOMAIN', value: selectedCandidate.skills.domain, color: 'bg-orange-500', lightBg: 'bg-orange-50', textColor: 'text-orange-600' },
                                    { label: 'PROJECTS', value: selectedCandidate.skills.project, color: 'bg-pink-500', lightBg: 'bg-pink-50', textColor: 'text-pink-600' },
                                    { label: 'TECHNICAL', value: selectedCandidate.skills.technical, color: 'bg-cyan-500', lightBg: 'bg-cyan-50', textColor: 'text-cyan-600' },
                                ].map((skill) => (
                                    <div key={skill.label} className={`${skill.lightBg} rounded-xl p-3 flex items-center justify-between`}>
                                        <div>
                                            <p className={`text-[9px] font-black ${skill.textColor} tracking-tight`}>{skill.label}</p>
                                            <p className="text-[7px] text-slate-400 uppercase font-bold">Mastery</p>
                                        </div>
                                        <span className="text-base font-black text-slate-900">{skill.value}%</span>
                                    </div>
                                ))}
                            </div>

                            {/* Job Ready Card */}
                            <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/10 p-2.5 rounded-xl">
                                        <UserIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-[8px] uppercase tracking-[0.15em] font-bold">Behavioral Profile</p>
                                        <h3 className="text-lg font-black text-white tracking-tight">Job Ready</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-slate-500 italic text-[9px] max-w-[150px] hidden md:block">"Highly aligned with modern workplace values."</p>
                                    <div className="text-right">
                                        <p className="text-[7px] font-bold text-slate-400 uppercase">Alignment</p>
                                        <p className="text-xl font-black text-primary-400">96%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button onClick={() => { setSendTarget({ ...sendTarget, studentId: selectedCandidate.id }); setIsSendAssessmentModalOpen(true); }} className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-primary-700 transition-all">Send Assessment</button>
                                <button onClick={() => { setNewInterview({ ...newInterview, studentId: selectedCandidate.id }); setIsInterviewModalOpen(true); }} className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-black transition-all">Schedule Interview</button>
                                <button className="px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </div>, document.body
            )}
        </div>

    );
};

export default CompanyDashboard;
