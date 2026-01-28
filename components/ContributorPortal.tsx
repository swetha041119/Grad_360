
import React, { useState, useEffect } from 'react';
import { Contributor, AssessmentType, Question, QuestionOption, TestCase } from '../types';
import { getContributorDashboardData } from '../services/mockData';
import { 
  Plus, Upload, LayoutDashboard, BrainCircuit, Zap, Terminal, UserCheck, 
  FileText, CheckCircle2, AlertCircle, Trash2, Edit3, Eye, Send, 
  Image as ImageIcon, HelpCircle, ChevronRight, BarChart3, TrendingUp, X,
  Save, Code, Layers, MessageSquare, ClipboardList, Info, FileCode,
  ArrowRight, CheckSquare, PlusCircle
} from 'lucide-react';

interface Props {
  user: Contributor;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ContributorPortal: React.FC<Props> = ({ user, activeTab, setActiveTab }) => {
  const [data, setData] = useState<any>(null);
  const [isWorkstationOpen, setIsWorkstationOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<AssessmentType>('APTITUDE');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Storage for questions
  const [stagedQuestions, setStagedQuestions] = useState<Question[]>([]);
  const [publishedQuestions, setPublishedQuestions] = useState<Question[]>([]);

  // Specialized Coding Form State
  const initialCoding: Partial<Question> = {
    category: 'CODING',
    subTopic: '',
    difficulty: 'Medium',
    title: '',
    problemStatement: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    testCases: [
      { input: '', output: '', isHidden: false },
      { input: '', output: '', isHidden: true }
    ]
  };

  // MCQ Form State
  const initialMcq: Partial<Question> = {
    category: 'APTITUDE',
    subTopic: '',
    text: '',
    solution: '',
    difficulty: 'Medium',
    options: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  };

  const [formState, setFormState] = useState<Partial<Question>>(initialMcq);

  useEffect(() => {
    getContributorDashboardData().then(d => {
      setData(d);
      // Mock some published data for visualization
      setPublishedQuestions([
        { id: 'pq1', category: 'TECHNICAL', subTopic: 'Networking', difficulty: 'Medium', text: 'Which layer of OSI handles routing?', solution: 'The Network layer is responsible for routing packets.', options: [{text: 'Network', isCorrect: true}, {text: 'Data Link', isCorrect: false}, {text: 'Physical', isCorrect: false}, {text: 'Transport', isCorrect: false}], lastModified: '2023-11-15' },
        { id: 'pq2', category: 'CODING', subTopic: 'Algorithms', difficulty: 'Hard', title: 'Find Median in Stream', problemStatement: 'Given an input stream of n integers...', constraints: 'n < 100,000', sampleInput: '1, 2, 3', sampleOutput: '2', testCases: [], lastModified: '2023-11-18' }
      ]);
    });
  }, []);

  const openWorkstation = (category: AssessmentType, existing?: Question) => {
    setCurrentCategory(category);
    if (existing) {
      setFormState(existing);
      setEditingId(existing.id);
    } else {
      setFormState(category === 'CODING' ? { ...initialCoding, category } : { ...initialMcq, category });
      setEditingId(null);
    }
    setIsWorkstationOpen(true);
  };

  const handleStash = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuestion = { 
      ...formState, 
      id: editingId || `staged-${Date.now()}`,
      category: currentCategory,
      lastModified: new Date().toLocaleDateString()
    } as Question;

    if (editingId) {
      if (editingId.startsWith('staged-')) {
        setStagedQuestions(stagedQuestions.map(q => q.id === editingId ? newQuestion : q));
      } else {
        setPublishedQuestions(publishedQuestions.map(q => q.id === editingId ? newQuestion : q));
      }
    } else {
      setStagedQuestions([...stagedQuestions, newQuestion]);
    }
    
    setIsWorkstationOpen(false);
    alert('Question stashed in staging area.');
  };

  const deleteQuestion = (id: string, isPublished: boolean) => {
    if (confirm('Permanently delete this question?')) {
      if (isPublished) {
        setPublishedQuestions(publishedQuestions.filter(q => q.id !== id));
      } else {
        setStagedQuestions(stagedQuestions.filter(q => q.id !== id));
      }
    }
  };

  const submitBatch = () => {
    if (stagedQuestions.length === 0) return;
    setPublishedQuestions([...publishedQuestions, ...stagedQuestions]);
    setStagedQuestions([]);
    alert(`Batch of ${stagedQuestions.length} questions published successfully!`);
  };

  const getStats = () => {
    const counts: Record<string, number> = {
      total: publishedQuestions.length + stagedQuestions.length,
      APTITUDE: 0,
      TECHNICAL: 0,
      CODING: 0,
      PSYCHOMETRIC: 0
    };
    [...publishedQuestions, ...stagedQuestions].forEach(q => {
      if (counts[q.category] !== undefined) counts[q.category]++;
    });
    return counts;
  };

  const stats = getStats();

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
        <header className="bg-primary-900 p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Edit3 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-primary-200 font-bold uppercase text-[10px] tracking-widest">Editorial Workstation</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter">Contributor Overview</h1>
                <p className="text-primary-100 mt-4 max-w-xl font-medium opacity-80 leading-relaxed">Manage your question repository. All contributions are analyzed for industrial alignment and technical accuracy.</p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent"></div>
        </header>

        <div className="grid md:grid-cols-5 gap-4">
            {[
                { label: 'Total Questions', val: stats.total, icon: ClipboardList, color: 'text-gray-900' },
                { label: 'Aptitude & Logic', val: stats.APTITUDE, icon: BrainCircuit, color: 'text-blue-600' },
                { label: 'Technical', val: stats.TECHNICAL, icon: Zap, color: 'text-orange-600' },
                { label: 'Coding & Tech', val: stats.CODING, icon: Terminal, color: 'text-gray-900' },
                { label: 'Psychometric', val: stats.PSYCHOMETRIC, icon: UserCheck, color: 'text-teal-600' },
            ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center group hover:border-primary-200 transition-all">
                    <div className={`mx-auto mb-3 w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 ${s.color} group-hover:scale-110 transition-transform`}>
                        <s.icon className="w-5 h-5" />
                    </div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">{s.val}</h3>
                </div>
            ))}
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-gray-900 flex items-center"><Layers className="w-5 h-5 mr-3 text-primary-600" /> Staging Area</h3>
                {stagedQuestions.length > 0 && (
                    <button onClick={submitBatch} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center shadow-xl shadow-primary-600/30 active:scale-95 transition-all">
                        Publish Batch <Send className="w-4 h-4 ml-2" />
                    </button>
                )}
            </div>
            
            {stagedQuestions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-[32px] border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold">No questions in staging buffer.</p>
                    <button onClick={() => setActiveTab('aptitude')} className="mt-4 text-primary-600 font-black text-xs uppercase tracking-widest hover:underline">Start Contributing</button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {stagedQuestions.map(q => (
                        <div key={q.id} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 group relative">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[9px] font-black bg-white px-2 py-1 rounded text-gray-400 uppercase border border-gray-100">{q.category}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => openWorkstation(q.category, q)} className="p-2 bg-white text-gray-400 hover:text-primary-600 rounded-lg shadow-sm transition-all"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => deleteQuestion(q.id, false)} className="p-2 bg-white text-gray-400 hover:text-red-600 rounded-lg shadow-sm transition-all"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 line-clamp-2">{q.category === 'CODING' ? q.title : q.text}</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{q.subTopic} • {q.difficulty}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );

  const renderWorkplace = (category: AssessmentType, icon: any, label: string, colorClass: string) => {
    const list = [...publishedQuestions, ...stagedQuestions].filter(q => q.category === category);
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className={`text-4xl font-black text-gray-900 tracking-tighter flex items-center`}>
                        {React.createElement(icon, { className: `w-10 h-10 mr-4 ${colorClass}` })} {label} Hub
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">Create and maintain your contribution library for {label}.</p>
                </div>
                <button onClick={() => openWorkstation(category)} className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black flex items-center shadow-2xl hover:bg-primary-700 transition-all active:scale-95 text-sm">
                    <Plus className="w-5 h-5 mr-3" /> New {label === 'Coding & Tech' ? 'Problem' : 'Question'}
                </button>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-100">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sub-Topic</th>
                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Level</th>
                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">State</th>
                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {list.length === 0 ? (
                            <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold italic">No {label} content created yet.</td></tr>
                        ) : list.map(q => (
                            <tr key={q.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-10 py-6">
                                    <p className="font-black text-gray-900 line-clamp-1">{q.category === 'CODING' ? q.title : q.text}</p>
                                </td>
                                <td className="px-10 py-6 text-sm font-bold text-gray-500">{q.subTopic}</td>
                                <td className="px-10 py-6">
                                    <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-1 rounded">{q.difficulty}</span>
                                </td>
                                <td className="px-10 py-6">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded ${q.id.startsWith('staged-') ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                                        {q.id.startsWith('staged-') ? 'STAGED' : 'PUBLISHED'}
                                    </span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => openWorkstation(category, q)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><Edit3 className="w-4 h-4" /></button>
                                        <button onClick={() => deleteQuestion(q.id, !q.id.startsWith('staged-'))} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn font-inter">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'aptitude' && renderWorkplace('APTITUDE', BrainCircuit, 'Aptitude & Logic', 'text-blue-600')}
        {activeTab === 'technical' && renderWorkplace('TECHNICAL', Zap, 'Technical Essentials', 'text-orange-600')}
        {activeTab === 'coding' && renderWorkplace('CODING', Terminal, 'Coding & Tech', 'text-gray-900')}
        {activeTab === 'psychometric' && renderWorkplace('PSYCHOMETRIC', UserCheck, 'Psychometric Skill', 'text-teal-600')}

        {/* WORKSTATION MODAL */}
        {isWorkstationOpen && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                <div className="bg-white rounded-[40px] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-900 p-2 rounded-xl text-white">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">
                                    {editingId ? 'Edit Asset' : 'New Contribution'}
                                </h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{currentCategory} Workplace</p>
                            </div>
                        </div>
                        <button onClick={() => setIsWorkstationOpen(false)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><X className="w-8 h-8" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-12">
                        <form onSubmit={handleStash} className="grid lg:grid-cols-2 gap-12">
                            {/* LEFT SIDE: Primary Content */}
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Branch / Sub-Topic</label>
                                        <input type="text" required value={formState.subTopic} onChange={e => setFormState({...formState, subTopic: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-bold focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="e.g. Memory Sharding" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cognitive Load</label>
                                        <select value={formState.difficulty} onChange={e => setFormState({...formState, difficulty: e.target.value as any})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-bold cursor-pointer outline-none transition-all">
                                            <option>Easy</option>
                                            <option>Medium</option>
                                            <option>Hard</option>
                                        </select>
                                    </div>
                                </div>

                                {currentCategory === 'CODING' ? (
                                    <>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Problem Title</label>
                                            <input type="text" required value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-bold outline-none" placeholder="e.g. Efficient Graph Traversal" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Problem Statement</label>
                                            <textarea required value={formState.problemStatement} onChange={e => setFormState({...formState, problemStatement: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-medium h-40 outline-none" placeholder="Describe the challenge details..."></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Constraints</label>
                                            <textarea required value={formState.constraints} onChange={e => setFormState({...formState, constraints: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-mono text-xs h-24 outline-none" placeholder="e.g. 1 <= n <= 10^5..."></textarea>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Question Stem</label>
                                            <textarea required value={formState.text} onChange={e => setFormState({...formState, text: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-slate-50 font-medium h-40 outline-none" placeholder="Enter question text..."></textarea>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Options</label>
                                            {formState.options?.map((opt, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <button type="button" onClick={() => {
                                                        const opts = formState.options?.map((o, idx) => ({...o, isCorrect: i === idx}));
                                                        setFormState({...formState, options: opts});
                                                    }} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${opt.isCorrect ? 'bg-green-600 border-green-600 text-white' : 'border-gray-200 text-gray-200'}`}>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <input type="text" required value={opt.text} onChange={e => {
                                                        const opts = [...(formState.options || [])];
                                                        opts[i].text = e.target.value;
                                                        setFormState({...formState, options: opts});
                                                    }} className="flex-1 p-3 border border-gray-100 rounded-xl bg-white text-sm" placeholder={`Option ${i+1}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* RIGHT SIDE: Technical Specs / Logic */}
                            <div className="space-y-8 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                                {currentCategory === 'CODING' ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sample Input</label>
                                                <textarea value={formState.sampleInput} onChange={e => setFormState({...formState, sampleInput: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-white font-mono text-xs h-24 outline-none"></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sample Output</label>
                                                <textarea value={formState.sampleOutput} onChange={e => setFormState({...formState, sampleOutput: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-white font-mono text-xs h-24 outline-none"></textarea>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Industrial Test Cases</label>
                                                <button type="button" onClick={() => setFormState({...formState, testCases: [...(formState.testCases || []), {input: '', output: '', isHidden: true}]})} className="text-primary-600 p-1 hover:bg-white rounded-lg transition-colors"><PlusCircle className="w-5 h-5" /></button>
                                            </div>
                                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                                {formState.testCases?.map((tc, i) => (
                                                    <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 relative">
                                                        <button type="button" onClick={() => setFormState({...formState, testCases: formState.testCases?.filter((_, idx) => idx !== i)})} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <input type="text" value={tc.input} onChange={e => {
                                                                const tcs = [...(formState.testCases || [])];
                                                                tcs[i].input = e.target.value;
                                                                setFormState({...formState, testCases: tcs});
                                                            }} className="text-[10px] p-2 border border-gray-50 rounded bg-slate-50" placeholder="Input" />
                                                            <input type="text" value={tc.output} onChange={e => {
                                                                const tcs = [...(formState.testCases || [])];
                                                                tcs[i].output = e.target.value;
                                                                setFormState({...formState, testCases: tcs});
                                                            }} className="text-[10px] p-2 border border-gray-50 rounded bg-slate-50" placeholder="Output" />
                                                        </div>
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input type="checkbox" checked={tc.isHidden} onChange={e => {
                                                                const tcs = [...(formState.testCases || [])];
                                                                tcs[i].isHidden = e.target.checked;
                                                                setFormState({...formState, testCases: tcs});
                                                            }} className="w-3 h-3 accent-primary-600" />
                                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Hidden Test Case</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Solution / Logic</label>
                                        <textarea required value={formState.solution} onChange={e => setFormState({...formState, solution: e.target.value})} className="w-full p-4 border border-gray-200 rounded-2xl bg-white font-medium h-64 outline-none" placeholder="Explain the rationale behind the correct answer..."></textarea>
                                    </div>
                                )}

                                <div className="pt-8 border-t border-slate-200">
                                    <button type="submit" className="w-full py-5 bg-primary-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-600/30 hover:bg-primary-700 transition-all flex items-center justify-center">
                                        <Save className="w-4 h-4 mr-2" /> Stash to Workbench
                                    </button>
                                    <p className="text-[9px] text-gray-400 font-bold mt-4 text-center italic">Changes will be saved to your local workspace buffer first.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ContributorPortal;
