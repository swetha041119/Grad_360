
import React, { useState, useEffect } from 'react';
import { Student, Assessment, LSRWType } from '../types';
import { getStudentDashboardData } from '../services/mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Radar as RadarComponent, PolarRadiusAxis } from 'recharts';
import {
    CheckCircle2, TrendingUp, BrainCircuit, Zap, UserCheck,
    ArrowRight, Target, BookOpen, Terminal, Users,
    PlayCircle, ShieldCheck, Rocket, AlertCircle, Clock, Calendar,
    Code2, History as HistoryIcon, ChevronRight, Bookmark, Lock, HelpCircle, GraduationCap,
    MessageSquare, Headphones, Mic, BookText, PenTool, BriefcaseBusiness, Layout, Sparkles,
    Calculator, SearchCode, Languages, Quote, Star, Award, BarChart3, Activity
} from 'lucide-react';
import ExamPortal from './ExamPortal';

interface Props {
    user: Student;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

type AptitudeSub = 'Quantitative' | 'Logical' | 'Verbal';

const MOTIVATIONAL_QUOTES = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Your career is a marathon, not a sprint. Keep moving forward.",
    "Preparation today is the key to opportunity tomorrow.",
    "Believe in yourself and all that you are. You are capable of great things."
];

const StudentDashboard: React.FC<Props> = ({ user, activeTab, setActiveTab }) => {
    const [data, setData] = useState<any>(null);
    const [activeExam, setActiveExam] = useState<Assessment | null>(null);
    const [activeLSRW, setActiveLSRW] = useState<LSRWType>('LISTENING');
    const [activeAptitudeSub, setActiveAptitudeSub] = useState<AptitudeSub>('Quantitative');
    const [quoteIdx] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));

    // State for scroll animation - must be before early return to maintain hooks order
    // Initialize to true to ensure content is visible even if observer doesn't fire
    const [isSpectrumVisible, setIsSpectrumVisible] = useState(true);
    const spectrumRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        getStudentDashboardData(user.id).then((res) => {
            const foundationalAnalytics = res.analytics.filter((a: any) =>
                ['Aptitude', 'Coding', 'Technical', 'Domain', 'Communication', 'Projects', 'Psychometric'].includes(a.subject)
            );
            setData({ ...res, analytics: foundationalAnalytics });
        });
    }, [user.id]);

    // Intersection Observer for flower opening animation - must be before early return
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsSpectrumVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (spectrumRef.current) {
            observer.observe(spectrumRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (!data) return <div className="p-10 text-center text-primary-600 animate-pulse font-black uppercase tracking-widest">Accessing Portal...</div>;

    const renderSectionHeader = (title: string, desc: string, icon: any, colorClass: string, score?: number) => (
        <div className={`${colorClass} rounded-[40px] p-8 md:p-12 text-white shadow-xl relative overflow-hidden mb-8`}>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl">
                    <div className="bg-white/10 p-3 rounded-2xl w-fit mb-4 backdrop-blur-xl border border-white/20 shadow-lg">
                        {React.createElement(icon, { className: "w-7 h-7" })}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">{title}</h2>
                    <p className="mt-4 text-white/90 font-medium text-base md:text-lg leading-relaxed italic">{desc}</p>
                </div>
                <div className="shrink-0 flex gap-4">
                    <div className="bg-white/10 backdrop-blur-xl px-8 py-6 rounded-[32px] border border-white/20 text-center min-w-[140px] shadow-xl">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Readiness Index</p>
                        <p className="text-4xl font-black">{score || 0}<span className="text-xl ml-1 opacity-50">%</span></p>
                    </div>
                </div>
            </div>
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-black/5 rounded-full blur-[60px] pointer-events-none"></div>
        </div>
    );

    const renderModuleGrid = (category: string, subTopic?: string, lsrwType?: LSRWType) => {
        const paths = data.learningPaths.filter((p: any) =>
            p.category === category && (!subTopic || p.subTopic === subTopic)
        );
        const tests = data.assessments.filter((a: any) =>
            a.type === category && (!subTopic || a.subTopic === subTopic) && (!lsrwType || a.lsrwType === lsrwType)
        );
        const practice = data.practiceSets.filter((s: any) =>
            s.type === category && (!subTopic || s.subTopic === subTopic) && (!lsrwType || s.lsrwType === lsrwType)
        );

        return (
            <div className="space-y-16 animate-fadeIn">
                {paths.length > 0 && (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4 tracking-tighter">
                            <GraduationCap className="w-8 h-8 text-primary-600" /> Personalised Learning Path

                        </h3>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {paths.map((p: any) => (
                                <div key={p.id} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-4 bg-slate-50 rounded-2xl text-primary-600 border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                                            <PlayCircle className="w-7 h-7" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-lg">Level {p.id.slice(-1)}</span>
                                    </div>
                                    <h4 className="font-black text-slate-900 text-2xl mb-3 tracking-tighter">{p.title}</h4>
                                    <p className="text-slate-500 text-base font-medium mb-10 line-clamp-2">{p.description}</p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                            <span>Knowledge Progress</span>
                                            <span>{p.completed}%</span>
                                        </div>
                                        <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner">
                                            <div className="h-full bg-primary-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.3)] transition-all duration-1000" style={{ width: `${p.completed}%` }}></div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-10 py-5 bg-slate-950 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl active:scale-95">Continue Module</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4 tracking-tighter">
                        <ShieldCheck className="w-8 h-8 text-primary-600" /> Faculty Shared
                    </h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {tests.map((a: any) => (
                            <div key={a.id} className="bg-white p-10 rounded-[48px] border-2 border-primary-50/50 shadow-sm hover:border-primary-600 transition-all flex flex-col group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-40"></div>
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <span className="px-5 py-2 bg-primary-600 text-white text-[10px] font-black uppercase rounded-2xl shadow-lg shadow-primary-600/20">Assessment Ready</span>
                                    <Bookmark className="w-6 h-6 text-slate-200 group-hover:text-primary-600 transition-colors" />
                                </div>
                                <h4 className="font-black text-slate-900 text-2xl mb-4 tracking-tighter relative z-10 leading-tight">{a.title}</h4>
                                {a.description && <p className="text-base text-slate-500 mb-10 line-clamp-2 font-medium relative z-10">{a.description}</p>}
                                <div className="flex items-center gap-6 mt-auto relative z-10">
                                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                                        <Clock className="w-4 h-4 text-primary-500" /> {a.durationMins}m
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                                        <Target className="w-4 h-4 text-primary-500" /> {a.questions} Questions
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveExam(a)}
                                    className="w-full mt-10 py-5 bg-primary-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-700 shadow-2xl shadow-primary-600/30 transition-all active:scale-95 relative z-10"
                                >
                                    {a.type === 'PROJECT' ? 'Enter Lab' : 'Start Exam'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {practice.length > 0 && (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4 tracking-tighter">
                            <Target className="w-8 h-8 text-primary-600" /> Self Practice Test
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {practice.map((s: any) => (
                                <div key={s.id} className="bg-slate-50 p-10 rounded-[48px] border border-slate-100 hover:bg-white hover:border-primary-100 transition-all flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-xl">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm text-gray-400 group-hover:text-primary-600 transition-colors">
                                            <Terminal className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 text-xl tracking-tight">{s.title}</h4>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{s.items} Tasks</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Custom tooltip for radar chart
    const CustomRadarTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                        {payload[0].payload.subject}
                    </p>
                    <p className="text-2xl font-black tracking-tighter">
                        {payload[0].value}<span className="text-primary-500 text-sm ml-1">%</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderDashboard = () => (
        <div className="space-y-8 animate-fadeIn pb-16 font-inter">
            <style dangerouslySetInnerHTML={{
                __html: `
            @keyframes flowGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-flow {
                background: linear-gradient(-45deg, #fff, #fef2f2, #fff5f5, #fff);
                background-size: 400% 400%;
                animation: flowGradient 15s ease infinite;
            }
            @keyframes flowerBloom {
                0% {
                    transform: scale(0) rotate(-180deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.1) rotate(10deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }
            @keyframes radarPulse {
                0%, 100% {
                    filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.3));
                }
                50% {
                    filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.5));
                }
            }
            .spectrum-bloom {
                animation: flowerBloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            .spectrum-pulse {
                animation: radarPulse 3s ease-in-out infinite;
            }
            .spectrum-hidden {
                transform: scale(0) rotate(-180deg);
                opacity: 0;
            }
        ` }} />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">Welcome, {user.name.split(' ')[0]}</h1>
                    <div className="mt-4 flex items-start gap-4 max-w-2xl">
                        <Quote className="w-6 h-6 text-primary-600/20 shrink-0" />
                        <p className="text-slate-400 font-medium text-sm md:text-base tracking-tight leading-relaxed italic">
                            "{MOTIVATIONAL_QUOTES[quoteIdx]}"
                        </p>
                    </div>
                </div>
            </div>

            <section className="space-y-6 relative">
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <Rocket className="w-6 h-6 text-primary-600" />
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">Your Next Milestone</h2>
                    </div>
                </div>

                <div className="relative z-10">
                    {data.readinessExam && (
                        <div className="animate-flow rounded-[48px] p-8 md:p-14 shadow-xl transition-all group overflow-hidden border border-primary-100/50">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-white p-3 rounded-[20px] text-primary-600 shadow-lg border border-primary-50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <Zap className="w-7 h-7" fill="currentColor" />
                                        </div>
                                        <span className="px-4 py-2 bg-primary-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-primary-600/20 tracking-[0.2em]">Upcoming Exam</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
                                        {data.readinessExam.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-xl italic">
                                        {data.readinessExam.description}
                                    </p>

                                    <div className="mt-auto flex flex-wrap gap-3 mb-6">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-[16px] border border-primary-100 shadow-sm text-slate-500 font-black text-[10px] uppercase tracking-wider">
                                            <Clock className="w-4 h-4 text-primary-500" /> {data.readinessExam.durationMins}m Duration
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-[16px] border border-primary-100 shadow-sm text-slate-500 font-black text-[10px] uppercase tracking-wider">
                                            <ShieldCheck className="w-4 h-4 text-green-500" /> Verified Assessment
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setActiveExam(data.readinessExam)}
                                        className="w-full lg:w-fit px-10 bg-primary-600 text-white font-black py-4 rounded-[32px] shadow-xl shadow-primary-600/30 hover:bg-slate-900 transition-all duration-500 flex items-center justify-center text-xs uppercase tracking-[0.3em] active:scale-95 group/btn"
                                    >
                                        Initiate Exam <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
                                    </button>
                                </div>

                                <div className="lg:w-[280px] flex flex-col gap-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Preparation Schedule</h4>

                                    <div className="space-y-3">
                                        {[
                                            { day: 'Jan 15', time: '10:00 AM', title: 'Aptitude Mastery', slot: 'Step 01' },
                                            { day: 'Jan 16', time: '02:00 PM', title: 'Technical Interview', slot: 'Step 02' },
                                            { day: 'Jan 17', time: '11:00 AM', title: 'Coding Challenge', slot: 'Step 03' },
                                        ].map((slot, i) => (
                                            <div key={i} className="p-4 bg-white rounded-[24px] border border-primary-50 flex items-center gap-4 group/slot hover:shadow-lg transition-all duration-300">
                                                <div className="w-12 h-12 rounded-[16px] bg-primary-50 flex flex-col items-center justify-center shrink-0 border border-primary-100">
                                                    <span className="text-[8px] font-black text-primary-400 uppercase leading-none mb-0.5">{slot.slot}</span>
                                                    <span className="text-base font-black text-primary-600 leading-none">{slot.day.split(' ')[1]}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-slate-900 tracking-tight">{slot.title}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{slot.day} • {slot.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* PRI Placement Readiness Section */}
            <section className="space-y-6 relative">
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-primary-600" />
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">PRI Placement Readiness Score</h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Overall Readiness Score - Large Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-[48px] p-12 shadow-2xl relative overflow-hidden flex items-center">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

                        <div className="relative z-10 w-full">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Overall Placement Readiness Index</p>
                                    <h3 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2">
                                        {user.overallScore}<span className="text-3xl text-primary-400 ml-2">%</span>
                                    </h3>
                                    <p className="text-white/80 font-medium text-sm italic mt-4">Based on comprehensive skill assessment across all domains</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20">
                                    <Star className="w-8 h-8 text-primary-400" fill="currentColor" />
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                                    <span>Readiness Progress</span>
                                    <span>{user.overallScore}% Complete</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-1000"
                                        style={{ width: `${user.overallScore}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placement Readiness Status Card */}
                    <div className="bg-white rounded-[48px] p-12 shadow-xl border-2 border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-60"></div>

                        <div className="relative z-10 w-full">
                            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${user.overallScore >= 80 ? 'bg-green-100' :
                                user.overallScore >= 65 ? 'bg-yellow-100' :
                                    'bg-primary-100'
                                }`}>
                                {user.overallScore >= 80 ? (
                                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                                ) : user.overallScore >= 65 ? (
                                    <Activity className="w-12 h-12 text-yellow-600" />
                                ) : (
                                    <AlertCircle className="w-12 h-12 text-primary-600" />
                                )}
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Placement Status</p>
                            <h3 className={`text-4xl font-black tracking-tighter ${user.overallScore >= 80 ? 'text-green-600' :
                                user.overallScore >= 65 ? 'text-yellow-600' :
                                    'text-primary-600'
                                }`}>
                                {user.overallScore >= 80 ? 'Ready' :
                                    user.overallScore >= 65 ? 'Almost Ready' :
                                        'Need More Practice'}
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skill Analysis Spectrum Section */}
            <div className="space-y-8" ref={spectrumRef}>
                <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="w-6 h-6 text-primary-600" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Skill Analysis Spectrum</h2>
                    </div>
                    <p className="text-slate-400 text-sm uppercase tracking-[0.2em] font-bold mb-12">Comprehensive Readiness Breakdown</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        {/* Radar Chart with Flower Opening Animation */}
                        <div className="lg:col-span-1 flex items-center justify-center">
                            <div className={`relative w-full max-w-[320px] aspect-square ${isSpectrumVisible ? 'spectrum-bloom spectrum-pulse' : 'spectrum-hidden'}`}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={[
                                        { subject: 'Aptitude', score: user.skills.aptitude },
                                        { subject: 'Coding', score: user.skills.coding },
                                        { subject: 'Communication', score: user.skills.communication },
                                        { subject: 'Domain', score: user.skills.domain },
                                        { subject: 'Projects', score: user.skills.project },
                                        { subject: 'Technical', score: user.skills.technical },
                                    ]}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis
                                            dataKey="subject"
                                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                        />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                                        <Tooltip content={<CustomRadarTooltip />} />
                                        <Radar
                                            name="Skills"
                                            dataKey="score"
                                            stroke="#dc2626"
                                            fill="#dc2626"
                                            fillOpacity={0.15}
                                            strokeWidth={3}
                                            dot={{
                                                r: 6,
                                                fill: '#dc2626',
                                                stroke: '#fff',
                                                strokeWidth: 2,
                                                cursor: 'pointer'
                                            }}
                                            activeDot={{
                                                r: 10,
                                                fill: '#dc2626',
                                                stroke: '#fff',
                                                strokeWidth: 3,
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Mastery Indicators */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                                <p className="text-slate-300 text-xs uppercase tracking-[0.2em] font-black">Current Score</p>
                            </div>
                            <p className="text-slate-200 text-xs uppercase tracking-[0.2em] font-black mb-6">Mastery Indicators</p>

                            <div className="space-y-5">
                                {[
                                    { label: 'APTITUDE', sublabel: 'Mastery Level', value: user.skills.aptitude },
                                    { label: 'CODING', sublabel: 'Mastery Level', value: user.skills.coding },
                                    { label: 'COMMUNICATION', sublabel: 'Mastery Level', value: user.skills.communication },
                                    { label: 'DOMAIN', sublabel: 'Mastery Level', value: user.skills.domain },
                                    { label: 'PROJECTS', sublabel: 'Mastery Level', value: user.skills.project },
                                    { label: 'TECHNICAL', sublabel: 'Mastery Level', value: user.skills.technical },
                                ].map((skill, index) => (
                                    <div
                                        key={skill.label}
                                        className="flex items-center justify-between py-3 border-l-4 border-slate-100 pl-4 hover:border-primary-600 transition-all"
                                        style={{
                                            opacity: isSpectrumVisible ? 1 : 0,
                                            transform: isSpectrumVisible ? 'translateX(0)' : 'translateX(-20px)',
                                            transition: `all 0.5s ease ${index * 0.1}s`
                                        }}
                                    >
                                        <div>
                                            <p className="text-sm font-black text-slate-900 tracking-tight">{skill.label}</p>
                                            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">{skill.sublabel}</p>
                                        </div>
                                        <span className="text-2xl font-black text-slate-900 tracking-tighter">{skill.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Career Ready Card */}
                        <div
                            className="lg:col-span-1 bg-slate-50 rounded-[40px] p-10 flex flex-col items-center text-center"
                            style={{
                                opacity: isSpectrumVisible ? 1 : 0,
                                transform: isSpectrumVisible ? 'scale(1)' : 'scale(0.8)',
                                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
                            }}
                        >
                            <div className="bg-slate-900 p-6 rounded-[28px] mb-6">
                                <UserCheck className="w-10 h-10 text-white" />
                            </div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-3">Behavioral Profile</p>
<h3 className="text-4xl font-black text-emerald-500 tracking-tighter mb-6">PASS</h3>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAptitudeSection = () => (
        <div className="space-y-16 animate-fadeIn font-inter">
            {renderSectionHeader("Problem Solving", "Master advanced mathematical reasoning and logical deduction.", BrainCircuit, "bg-primary-600", user.skills.aptitude)}

            <div className="flex bg-slate-100 p-3 rounded-[40px] gap-3 w-fit mx-auto shadow-inner mb-20 border border-slate-200">
                {[
                    { id: 'Quantitative', label: 'Quant', icon: Calculator },
                    { id: 'Logical', label: 'Logical', icon: SearchCode },
                    { id: 'Verbal', label: 'Verbal', icon: Languages },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveAptitudeSub(tab.id as AptitudeSub)}
                        className={`flex items-center gap-4 px-12 py-5 rounded-[32px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${activeAptitudeSub === tab.id ? 'bg-white text-primary-600 shadow-2xl' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <tab.icon className="w-5 h-5" /> {tab.label}
                    </button>
                ))}
            </div>

            {renderModuleGrid('APTITUDE', activeAptitudeSub)}
        </div>
    );

    const renderCommunicationSection = () => (
        <div className="space-y-16 animate-fadeIn font-inter">
            {renderSectionHeader("English Proficiency", "Develop confidence in professional listening, speaking, reading, and writing.", MessageSquare, "bg-slate-950", user.skills.communication)}

            <div className="flex bg-slate-100 p-3 rounded-[40px] gap-3 w-fit mx-auto shadow-inner mb-20 border border-slate-200">
                {[
                    { id: 'LISTENING', label: 'Listen', icon: Headphones },
                    { id: 'SPEAKING', label: 'Speak', icon: Mic },
                    { id: 'READING', label: 'Read', icon: BookText },
                    { id: 'WRITING', label: 'Write', icon: PenTool },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveLSRW(tab.id as LSRWType)}
                        className={`flex items-center gap-4 px-12 py-5 rounded-[32px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${activeLSRW === tab.id ? 'bg-white text-primary-600 shadow-2xl' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <tab.icon className="w-5 h-5" /> {tab.label}
                    </button>
                ))}
            </div>

            {renderModuleGrid('COMMUNICATION', undefined, activeLSRW)}
        </div>
    );

    return (
        <div className="space-y-12 relative font-inter">
            {activeExam && <ExamPortal assessment={activeExam} onClose={() => setActiveExam(null)} />}

            {activeTab === 'dashboard' && renderDashboard()}

            {activeTab === 'aptitude' && renderAptitudeSection()}

            {activeTab === 'technical' && (
                <div className="animate-fadeIn">
                    {renderSectionHeader("Core Engineering", "Master the technical fundamentals required for high-tier recruitment.", Zap, "bg-slate-900", user.skills.technical)}
                    {renderModuleGrid('TECHNICAL')}
                </div>
            )}

            {activeTab === 'coding' && (
                <div className="animate-fadeIn">
                    {renderSectionHeader("Algorithm Labs", "Enhance your coding skills with real-world technical challenges.", Code2, "bg-slate-950", user.skills.coding)}
                    {renderModuleGrid('CODING')}
                </div>
            )}

            {activeTab === 'psychometric' && (
                <div className="animate-fadeIn">
                    {renderSectionHeader("Professional Ethics", "Understand professional behaviors and workplace cultural values.", UserCheck, "bg-slate-800", user.skills.psychometric)}
                    {renderModuleGrid('PSYCHOMETRIC')}
                </div>
            )}

            {activeTab === 'domain' && (
                <div className="animate-fadeIn">
                    {renderSectionHeader("Domain Knowledge", "Dive deep into your chosen specialization and industry trends.", BookOpen, "bg-red-700", user.skills.domain)}
                    {renderModuleGrid('DOMAIN')}
                </div>
            )}

            {activeTab === 'communication' && renderCommunicationSection()}

            {activeTab === 'projects' && (
                <div className="animate-fadeIn">
                    {renderSectionHeader("Project Lab", "Build and showcase real-world projects to strengthen your resume.", BriefcaseBusiness, "bg-slate-900", user.skills.project)}
                    {renderModuleGrid('PROJECT')}
                </div>
            )}

            {activeTab === 'history' && (
                <div className="space-y-12 animate-fadeIn">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center">
                            <HistoryIcon className="w-10 h-10 mr-6 text-primary-600" /> Exam History
                        </h2>
                        <p className="text-slate-400 mt-4 font-medium text-lg max-w-2xl italic">Review your past performance and track your growth over time.</p>
                    </div>

                    <div className="bg-white rounded-[64px] border border-slate-100 shadow-sm overflow-hidden p-4">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100 rounded-t-[48px]">
                                <tr>
                                    <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Evaluation</th>
                                    <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Category</th>
                                    <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Score</th>
                                    <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Date</th>
                                    <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Review</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.history.map((h: any) => (
                                    <tr key={h.id} className="hover:bg-slate-50 transition-all duration-300 group">
                                        <td className="px-12 py-10">
                                            <p className="font-black text-slate-900 text-xl tracking-tight leading-none mb-1">{h.title}</p>
                                            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Exam_ID_{h.id}</p>
                                        </td>
                                        <td className="px-12 py-10">
                                            <span className="px-5 py-2 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded-2xl border border-slate-200 tracking-widest group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">{h.type}</span>
                                        </td>
                                        <td className="px-12 py-10">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${h.score > 70 ? 'bg-green-500' : 'bg-primary-500'}`}></div>
                                                <span className="font-black text-slate-900 text-xl tracking-tighter">{h.score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-12 py-10 text-sm font-bold text-slate-400 uppercase tracking-widest">{h.date}</td>
                                        <td className="px-12 py-10 text-right">
                                            <button className="text-primary-600 font-black text-[11px] uppercase tracking-[0.3em] hover:text-slate-900 flex items-center justify-end ml-auto group-hover:translate-x-2 transition-all">
                                                View Details <ChevronRight className="w-5 h-5 ml-2" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
