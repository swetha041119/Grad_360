
import React, { useState, useEffect } from 'react';
import { Faculty, Student, Assessment, Announcement } from '../types';
import { getFacultyDashboardData, createAssessment } from '../services/mockData';
import { 
  Plus, Bell, Clock, FileText, TrendingUp, 
  Users, Zap, Search, Filter, Trash2, Edit3, 
  ChevronRight, Eye, GraduationCap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Faculty Command</h1>
                <p className="text-gray-500 mt-2 font-medium">Monitoring {data.students.length} students in real-time.</p>
            </div>
            <button onClick={() => setIsAssessmentModalOpen(true)} className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-700 transition-all">Assign New Test</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Avg Readiness</p>
                <div className="flex items-center justify-between mt-2">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">74.2%</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Registered Students</p>
                <div className="flex items-center justify-between mt-2">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{data.students.length}</h3>
                    <Users className="w-5 h-5 text-blue-500" />
                </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Tests</p>
                <div className="flex items-center justify-between mt-2">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{data.assessments.length}</h3>
                    <FileText className="w-5 h-5 text-orange-500" />
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="font-black text-gray-900 text-xl tracking-tight mb-8">Performance Spectrum</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.batches}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                            <Bar dataKey="avgScore" fill="#dc2626" radius={[6, 6, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <section className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold flex items-center mb-6"><Bell className="w-6 h-6 mr-3 text-primary-400" /> Faculty Brief</h3>
                    <div className="space-y-4">
                        {data.announcements.slice(0, 2).map((a: Announcement) => (
                            <div key={a.id} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-gray-100 text-sm">{a.title}</h4>
                                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{a.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Zap className="w-10 h-10 mr-4 text-primary-600" /> Evaluations</h2>
                <p className="text-gray-500 mt-2 font-medium">Coordinate department-level evaluations.</p>
            </div>
            <button onClick={() => setIsAssessmentModalOpen(true)} className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black flex items-center shadow-2xl hover:bg-primary-700 transition-all text-sm">
                <Plus className="w-5 h-5 mr-3" /> New Evaluation
            </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.assessments.map((a: Assessment) => (
                <div key={a.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${a.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{a.status}</span>
                    </div>
                    <h4 className="font-black text-xl text-gray-900 mb-2">{a.title}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">{a.type} • {a.difficulty}</p>
                    
                    <div className="mt-auto pt-8 border-t border-gray-50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Completed</p>
                            <p className="text-sm font-black text-gray-900">{a.completions} / {a.totalStudents}</p>
                        </div>
                        <button className="w-full py-3 bg-slate-50 text-primary-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all">View Results</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Users className="w-10 h-10 mr-4 text-primary-600" /> Student Ledger</h2>
                <p className="text-gray-500 mt-2 font-medium">Centralized academic and readiness monitoring.</p>
            </div>
            <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search students..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 pr-6 py-4 rounded-2xl border border-gray-100 bg-white shadow-sm outline-none w-72 transition-all font-medium" />
            </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-gray-100">
                    <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Score</th>
                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.students.filter((s: Student) => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s: Student) => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-10 py-6">
                                <p className="font-black text-gray-900">{s.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{s.department}</p>
                            </td>
                            <td className="px-10 py-6">
                                <span className="font-black text-gray-950">{s.overallScore}%</span>
                            </td>
                            <td className="px-10 py-6 text-right">
                                <button className="text-primary-600 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center justify-end ml-auto">
                                    Report <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  return (
      <div className="space-y-8 animate-fadeIn">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'assessments' && renderAssessments()}
          {activeTab === 'students' && renderStudents()}

          {isAssessmentModalOpen && (
               <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
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
      </div>
  );
};

export default FacultyDashboard;
