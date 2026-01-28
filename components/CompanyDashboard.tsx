
import React, { useState, useEffect } from 'react';
import { Company, Student, Job, Interview, Assessment } from '../types';
import { getCompanyDashboardData } from '../services/mockData';
import { Search, Briefcase, Filter, Mail, FileText, CheckCircle, Users, Download, Plus, Clock, Video, Calendar, MoreVertical, X, Award, ChevronRight, User as UserIcon, Send, Zap, Trash2, Eye, Star, Edit3 } from 'lucide-react';
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

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    getCompanyDashboardData().then(setData);
  }

  const handleCreateJob = (e: React.FormEvent) => {
      e.preventDefault();
      if(data) {
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
          setData({...data});
          setIsJobModalOpen(false);
      }
  }

  const handleCreateAssessment = (e: React.FormEvent) => {
      e.preventDefault();
      if(data) {
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
          setData({...data});
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
      if(data) {
          const student = data.candidates.find(s => s.id === newInterview.studentId);
          if(student) {
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
              setData({...data});
              setIsInterviewModalOpen(false);
              alert('Interview Scheduled!');
          }
      }
  }

  const handleSubmitFeedback = () => {
      if(data && selectedInterview) {
          selectedInterview.status = 'Completed';
          selectedInterview.feedback = {
              technical: feedbackData.technical,
              communication: feedbackData.communication,
              confidence: feedbackData.confidence,
              remarks: feedbackData.remarks,
              verdict: feedbackData.verdict as any
          };
          setData({...data});
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

        <div className="grid md:grid-cols-4 gap-6">
            {[
                { label: 'Qualified Talent', val: data.candidates.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Active Openings', val: data.jobs.filter(j => j.status === 'Active').length, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Daily Interviews', val: data.interviews.filter(i => i.status === 'Scheduled').length, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Avg Skill Baseline', val: '74.2%', icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                    <div className="flex justify-between items-end mt-4">
                        <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.val}</h3>
                        <div className={`${stat.bg} p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon className="w-7 h-7"/></div>
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
                            <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'black'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'black'}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontFamily: 'Inter'}} />
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
                          <button onClick={() => setSelectedCandidate(s)} className="px-6 py-3 bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-700 transition-all text-center shadow-lg shadow-primary-600/20">Profile</button>
                          <button onClick={() => { setSendTarget({...sendTarget, studentId: s.id}); setIsSendAssessmentModalOpen(true); }} className="px-6 py-3 bg-slate-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 text-center">Assign</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderJobs = () => (
      <div className="space-y-8 animate-fadeIn font-inter">
          <div className="flex justify-between items-end">
              <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Briefcase className="w-10 h-10 mr-4 text-primary-600" /> Active Openings</h2>
                  <p className="text-gray-500 mt-2 font-medium">Manage your corporate recruitment listings.</p>
              </div>
              <button onClick={() => setIsJobModalOpen(true)} className="bg-primary-600 text-white px-10 py-5 rounded-[32px] font-black flex items-center shadow-2xl hover:bg-primary-700 transition-all text-xs uppercase tracking-widest">
                  <Plus className="w-5 h-5 mr-3" /> Post New Role
              </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
              {data && data.jobs.map((j) => (
                  <div key={j.id} className="bg-white p-10 rounded-[56px] border border-gray-100 shadow-sm flex flex-col group hover:shadow-2xl transition-all duration-500">
                      <div className="flex justify-between items-start mb-8">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><Briefcase className="w-8 h-8 text-primary-600" /></div>
                          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${j.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-50 text-slate-500'}`}>{j.status}</span>
                      </div>
                      <h4 className="font-black text-3xl text-gray-900 mb-2 tracking-tighter">{j.title}</h4>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mb-10">{j.type} • {j.location}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-10">
                          {j.skills.map((s, idx) => (
                              <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">{s}</span>
                          ))}
                      </div>

                      <div className="mt-auto pt-10 border-t border-gray-50 flex items-center justify-between">
                          <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pipeline Volume</p>
                              <p className="text-2xl font-black text-gray-900 tracking-tighter">{j.applicants} Applicants</p>
                          </div>
                          <div className="flex gap-3">
                              <button className="p-4 bg-slate-50 text-gray-400 rounded-2xl hover:text-primary-600 hover:bg-white border border-transparent hover:border-slate-100 transition-all shadow-sm"><Edit3 className="w-6 h-6" /></button>
                              <button className="p-4 bg-slate-50 text-gray-400 rounded-2xl hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-100 transition-all shadow-sm"><Trash2 className="w-6 h-6" /></button>
                          </div>
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
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Zap className="w-10 h-10 mr-4 text-primary-600" /> Corporate Evaluations</h2>
                  <p className="text-gray-500 mt-2 font-medium">Custom diagnostics for screening candidates.</p>
              </div>
              <button onClick={() => setIsAssessmentModalOpen(true)} className="bg-primary-600 text-white px-10 py-5 rounded-[32px] font-black flex items-center shadow-2xl hover:bg-primary-700 transition-all text-xs uppercase tracking-widest">
                  <Plus className="w-5 h-5 mr-3" /> Create Evaluation
              </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data && data.activeAssessments.map((a) => (
                  <div key={a.id} className="bg-white p-10 rounded-[56px] border border-gray-100 shadow-sm flex flex-col hover:shadow-2xl transition-all duration-500">
                      <div className="flex justify-between items-start mb-10">
                          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${a.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-50 text-slate-500'}`}>{a.status}</span>
                      </div>
                      <h4 className="font-black text-2xl text-gray-900 mb-3 tracking-tighter">{a.title}</h4>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mb-12">{a.type} • {a.difficulty}</p>
                      
                      <div className="mt-auto pt-10 border-t border-gray-50 space-y-5">
                          <div className="flex items-center justify-between">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidate Flow</p>
                              <p className="text-base font-black text-gray-900">{a.candidatesCount} Tested</p>
                          </div>
                          <div className="flex items-center justify-between">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Average Score</p>
                              <p className="text-base font-black text-primary-600">{a.avgScore}%</p>
                          </div>
                          <button className="w-full py-4 bg-slate-50 text-primary-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all shadow-sm">View Insights</button>
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
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Calendar className="w-10 h-10 mr-4 text-primary-600" /> Interview Scheduler</h2>
                  <p className="text-gray-500 mt-2 font-medium">Coordinate and manage technical/HR screening rounds.</p>
              </div>
              <button onClick={() => setIsInterviewModalOpen(true)} className="bg-primary-600 text-white px-10 py-5 rounded-[32px] font-black flex items-center shadow-2xl hover:bg-primary-700 transition-all text-xs uppercase tracking-widest">
                  <Plus className="w-5 h-5 mr-3" /> Schedule Session
              </button>
          </div>

          <div className="bg-white rounded-[64px] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-gray-100">
                      <tr>
                          <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Candidate</th>
                          <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Specification</th>
                          <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Schedule</th>
                          <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {data && data.interviews.map((i) => (
                          <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-12 py-8">
                                  <div className="flex items-center gap-5">
                                      <img src={i.studentAvatar} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm object-cover" alt={i.studentName} />
                                      <p className="font-black text-gray-900 text-lg">{i.studentName}</p>
                                  </div>
                              </td>
                              <td className="px-12 py-8">
                                  <p className="text-sm font-black text-gray-900 leading-none">{i.jobTitle}</p>
                                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{i.type} Round</p>
                              </td>
                              <td className="px-12 py-8">
                                  <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                                      <Calendar className="w-4 h-4 text-primary-600" /> {i.date} • {i.time}
                                  </div>
                              </td>
                              <td className="px-12 py-8 text-right">
                                  {i.status === 'Completed' ? (
                                      <span className="px-5 py-2 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-green-100">Results Recorded</span>
                                  ) : (
                                      <button onClick={() => { setSelectedInterview(i); setIsFeedbackModalOpen(true); }} className="px-6 py-3 bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/10">Submit Evaluation</button>
                                  )}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
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
          {selectedCandidate && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                  <div className="bg-white rounded-[64px] p-16 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-start mb-12">
                          <div className="flex items-center gap-8">
                              <img src={selectedCandidate.avatar} className="w-32 h-32 rounded-[40px] border-8 border-slate-50 object-cover shadow-inner" alt={selectedCandidate.name} />
                              <div>
                                  <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{selectedCandidate.name}</h3>
                                  <p className="text-primary-600 font-black uppercase tracking-[0.3em] text-xs mt-3">{selectedCandidate.targetRole}</p>
                              </div>
                          </div>
                          <button onClick={() => setSelectedCandidate(null)} className="p-3 text-gray-200 hover:text-red-500 transition-colors"><X className="w-10 h-10" /></button>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-12">
                          <div className="bg-slate-50 p-8 rounded-[32px] border border-gray-100 shadow-inner">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Logic / Aptitude</p>
                              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${selectedCandidate.skills.aptitude}%` }}></div>
                              </div>
                              <p className="text-right mt-2 text-xs font-black text-blue-600">{selectedCandidate.skills.aptitude}%</p>
                          </div>
                          <div className="bg-slate-50 p-8 rounded-[32px] border border-gray-100 shadow-inner">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Engineering Logic</p>
                              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-gray-900 shadow-[0_0_10px_rgba(0,0,0,0.3)]" style={{ width: `${selectedCandidate.skills.coding}%` }}></div>
                              </div>
                              <p className="text-right mt-2 text-xs font-black text-gray-900">{selectedCandidate.skills.coding}%</p>
                          </div>
                      </div>

                      <div className="pt-12 border-t border-gray-100 flex gap-6">
                          <button onClick={() => { setSendTarget({...sendTarget, studentId: selectedCandidate.id}); setIsSendAssessmentModalOpen(true); }} className="flex-1 py-6 bg-primary-600 text-white rounded-[32px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary-600/30 hover:bg-primary-700 transition-all active:scale-95">Send Assessment</button>
                          <button onClick={() => { setNewInterview({...newInterview, studentId: selectedCandidate.id}); setIsInterviewModalOpen(true); }} className="flex-1 py-6 bg-slate-900 text-white rounded-[32px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-slate-900/30 hover:bg-black transition-all active:scale-95">Schedule Prep</button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

export default CompanyDashboard;
