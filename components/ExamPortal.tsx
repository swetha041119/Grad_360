
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Assessment, Question, LSRWType } from '../types';
import {
    SIMULATION_QUESTIONS,
    DEMO_APTITUDE_QUESTIONS,
    DEMO_CODING_QUESTIONS,
    DEMO_TECHNICAL_QUESTIONS,
    DEMO_DOMAIN_QUESTIONS,
    DEMO_PSYCHOMETRIC_QUESTIONS,
    DEMO_PROJECT_QUESTIONS,
    DEMO_COMMUNICATION_QUESTIONS
} from '../services/mockData';
import {
    Clock, Info, ArrowRight, CheckCircle2,
    AlertTriangle, ChevronLeft, ChevronRight,
    Award, Layers, Tags, Headphones, Mic, BookText, PenTool, CheckCircle,
    Play, Square, FileCheck, MessageSquare,
    Check, Target, Activity, Layout, ShieldCheck, Flag, Zap,
    Sparkles, Code2, Loader2, BarChart3, Star, Download, Printer, Share2,
    Terminal, PlayCircle, ClipboardList, BookOpen, UserCheck, Database, FileCode, CheckSquare
} from 'lucide-react';

interface Props {
    assessment: Assessment;
    onClose: () => void;
}

type ExamStatus = 'INSTRUCTIONS' | 'PHASE_START' | 'ACTIVE' | 'REPORT';

const ExamPortal: React.FC<Props> = ({ assessment, onClose }) => {
    const [status, setStatus] = useState<ExamStatus>('INSTRUCTIONS');
    const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
    const [currentSkillIdx, setCurrentSkillIdx] = useState(0);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(assessment.durationMins * 60);
    const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
    const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
    const [isRunning, setIsRunning] = useState(false);

    // Specific states for modules
    const [currentMilestone, setCurrentMilestone] = useState(0);
    const [codeValue, setCodeValue] = useState<string>(`// Engineering Workspace\nfunction solve() {\n  return true;\n}`);
    const [isRecording, setIsRecording] = useState(false);
    const [expandedSection, setExpandedSection] = useState<number | null>(0);

    // Resizable panel state for coding questions
    const [leftWidth, setLeftWidth] = useState(360);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setExpandedSection(Math.floor(currentQuestionIdx / 5));
    }, [currentQuestionIdx]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newWidth = Math.max(300, Math.min(600, e.clientX));
                setLeftWidth(newWidth);
            }
        };
        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // Grouping 7 Skills into 3 Parts
    const phases = useMemo(() => {
        if (assessment.type === 'SIMULATION') {
            return [
                {
                    day: 1,
                    label: 'Part 1: Foundational Framework',
                    desc: 'Cognitive reasoning, engineering fundamentals, and algorithmic logic evaluation.',
                    sections: [
                        { label: 'Cognitive', category: 'APTITUDE', questions: [...DEMO_APTITUDE_QUESTIONS] },
                        { label: 'Technical', category: 'TECHNICAL', questions: [...DEMO_TECHNICAL_QUESTIONS] },
                        { label: 'Engineering Logic', category: 'CODING', questions: [...DEMO_CODING_QUESTIONS] }
                    ],
                    guidelines: [
                        'Cognitive: Solve Quant (5), Logical (5), and Verbal (5) reasoning problems.',
                        'Technical: 10 Core Fundamental engineering MCQs.',
                        'Engineering Logic: Implement high-performance algorithms.',
                        'Navigate between sections using the top bar.'
                    ]
                },
                {
                    day: 2,
                    label: 'Part 2: Domain & Project Execution',
                    desc: 'Domain knowledge assessment and project milestone implementation.',
                    sections: [
                        { label: 'Domain', category: 'DOMAIN', questions: [...DEMO_DOMAIN_QUESTIONS] },
                        { label: 'Project', category: 'PROJECT', questions: [...DEMO_PROJECT_QUESTIONS] }
                    ],
                    guidelines: [
                        'Domain: Answer 5 MCQs on Cloud Computing, System Design, and DevOps.',
                        'Project: Execute a 5-milestone assessment: Solution -> Schema -> Pseudocode -> MCQ -> Justification.',
                        'Navigate between Domain and Project sections using the top bar.'
                    ]
                },
                {
                    day: 3,
                    label: 'Part 3: Professional Spectrum',
                    desc: 'Communication proficiency (LSRW) and behavioral integrity.',
                    sections: [
                        { label: 'Listening', category: 'COMMUNICATION', questions: DEMO_COMMUNICATION_QUESTIONS.filter(q => q.lsrwType === 'LISTENING') },
                        { label: 'Reading', category: 'COMMUNICATION', questions: DEMO_COMMUNICATION_QUESTIONS.filter(q => q.lsrwType === 'READING') },
                        { label: 'Speaking', category: 'COMMUNICATION', questions: DEMO_COMMUNICATION_QUESTIONS.filter(q => q.lsrwType === 'SPEAKING') },
                        { label: 'Writing', category: 'COMMUNICATION', questions: DEMO_COMMUNICATION_QUESTIONS.filter(q => q.lsrwType === 'WRITING') },
                        { label: 'Behavioral', category: 'PSYCHOMETRIC', questions: [...DEMO_PSYCHOMETRIC_QUESTIONS] }
                    ],
                    guidelines: [
                        'Listening: 5 audio-based comprehension questions.',
                        'Reading: 5 paragraph-based comprehension questions.',
                        'Speaking: 5 oral articulation tasks (record your response).',
                        'Writing: 5 professional writing scenarios.',
                        'Behavioral: Psychometric assessment of professional values.',
                        'Navigate between sections using the top bar.'
                    ]
                }
            ];
        } else {
            // Single skill assessment (from Skills section)
            const filteredQuestions = SIMULATION_QUESTIONS.filter(q =>
                q.category === assessment.type &&
                (!assessment.subTopic || q.subTopic === assessment.subTopic)
            );

            return [
                {
                    day: 1,
                    label: assessment.title,
                    desc: assessment.description || `Specialized ${assessment.type} diagnostic.`,
                    sections: [
                        {
                            label: assessment.subTopic || assessment.type,
                            category: assessment.type as any,
                            questions: filteredQuestions.length > 0 ? filteredQuestions : [SIMULATION_QUESTIONS[0]]
                        }
                    ],
                    guidelines: [
                        `This is a specialized diagnostic for ${assessment.type}${assessment.subTopic ? ` (${assessment.subTopic})` : ''}.`,
                        `The assessment contains ${filteredQuestions.length || assessment.questions} questions.`,
                        `Total time allowed is ${assessment.durationMins} minutes.`
                    ]
                }
            ];
        }
    }, [assessment]);

    const activePhase = phases[currentPhaseIdx];
    const activeSection = activePhase.sections[currentSkillIdx];
    const q = activeSection.questions[currentQuestionIdx];

    useEffect(() => {
        if (status !== 'ACTIVE' || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setStatus('REPORT');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const handleNext = () => {
        if (currentQuestionIdx < activeSection.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else if (currentSkillIdx < activePhase.sections.length - 1) {
            setCurrentSkillIdx(currentSkillIdx + 1);
            setCurrentQuestionIdx(0);
        } else if (currentPhaseIdx < phases.length - 1) {
            setCurrentPhaseIdx(currentPhaseIdx + 1);
            setCurrentSkillIdx(0);
            setCurrentQuestionIdx(0);
            setStatus('PHASE_START');
        } else {
            setStatus('REPORT');
        }
    };

    const handlePrev = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
        } else if (currentSkillIdx > 0) {
            setCurrentSkillIdx(currentSkillIdx - 1);
            setCurrentQuestionIdx(activePhase.sections[currentSkillIdx - 1].questions.length - 1);
        }
    };

    const handleAnswerSelect = (answer: any) => {
        setUserAnswers({ ...userAnswers, [q.id]: answer });
        if (q.options && q.category !== 'PROJECT' && q.category !== 'CODING') {
            setTimeout(handleNext, 400);
        }
    };

    const handleDryRun = () => {
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            alert("Dry Run Result: Test passed with sample inputs.");
        }, 1200);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderProjectMilestoneUI = () => {
        const milestoneLabels = ["Solution Proposal", "Database Schema", "Pseudocode Modules", "Strategic MCQ", "Critical Justification"];
        const milestoneIcons = [Layout, Database, FileCode, CheckSquare, ShieldCheck];

        return (
            <div className="h-full overflow-y-auto">
                <div className="max-w-4xl mx-auto py-8">
                    <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl mb-12 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                            <div className="flex items-center gap-6">
                                <div className="bg-primary-600 p-5 rounded-[28px] shadow-xl">
                                    {React.createElement(milestoneIcons[currentMilestone], { className: "w-10 h-10" })}
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter leading-none">{milestoneLabels[currentMilestone]}</h2>
                                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] mt-3">Milestone {currentMilestone + 1} of 5</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {milestoneLabels.map((_, i) => (
                                    <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${currentMilestone >= i ? 'bg-primary-600' : 'bg-white/10'}`}></div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/4 bg-primary-600/5 blur-[100px] pointer-events-none"></div>
                    </div>

                    <div className="space-y-10 animate-fadeIn">
                        {currentMilestone === 0 && (
                            <div className="space-y-8">
                                <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100 shadow-inner">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">M1: Core Problem Statement</h4>
                                    <p className="text-2xl font-medium text-slate-700 leading-relaxed italic">"{q.problemStatement}"</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Proposed Structural Solution</h4>
                                    <textarea
                                        value={userAnswers[`${q.id}_m1`] || ''}
                                        onChange={(e) => setUserAnswers({ ...userAnswers, [`${q.id}_m1`]: e.target.value })}
                                        placeholder="Outline your architectural approach and core logic flow..."
                                        className="w-full h-80 p-10 bg-white rounded-[48px] border-2 border-slate-100 outline-none focus:border-primary-600 focus:ring-8 focus:ring-primary-600/5 transition-all font-medium text-lg leading-relaxed shadow-xl"
                                    />
                                </div>
                            </div>
                        )}

                        {currentMilestone === 1 && (
                            <div className="space-y-8">
                                <div className="bg-blue-50 p-12 rounded-[48px] border border-blue-100 shadow-inner">
                                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">M2: Database Requirements</h4>
                                    <p className="text-2xl font-medium text-blue-800 leading-relaxed">{q.text}</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Relation Definitions (SQL/Schema)</h4>
                                    <textarea
                                        value={userAnswers[`${q.id}_m2`] || ''}
                                        onChange={(e) => setUserAnswers({ ...userAnswers, [`${q.id}_m2`]: e.target.value })}
                                        placeholder="Define tables, constraints, and relationships..."
                                        className="w-full h-96 p-10 bg-white rounded-[48px] border-2 border-slate-100 outline-none focus:border-primary-600 transition-all font-mono text-sm leading-relaxed shadow-xl"
                                    />
                                </div>
                            </div>
                        )}

                        {currentMilestone === 2 && (
                            <div className="space-y-10">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">M3: Modular Implementation (Pseudocode)</h4>
                                <div className="grid gap-8">
                                    {q.modules?.map((m, idx) => (
                                        <div key={idx} className="bg-white p-10 rounded-[48px] border-2 border-slate-50 shadow-sm hover:border-primary-200 transition-all group">
                                            <div className="flex items-center gap-6 mb-6">
                                                <span className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-sm text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">{idx + 1}</span>
                                                <h5 className="font-black text-slate-900 uppercase tracking-tighter text-2xl">{m.name}</h5>
                                            </div>
                                            <p className="text-base text-slate-500 mb-8 italic leading-relaxed">Task: {m.task}</p>
                                            <textarea
                                                value={userAnswers[`${q.id}_m3_${idx}`] || ''}
                                                onChange={(e) => setUserAnswers({ ...userAnswers, [`${q.id}_m3_${idx}`]: e.target.value })}
                                                placeholder="Write algorithmic logic here..."
                                                className="w-full h-40 p-8 bg-slate-50 rounded-[32px] border border-slate-100 outline-none focus:bg-white focus:border-primary-600 font-mono text-xs transition-all shadow-inner"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentMilestone === 3 && (
                            <div className="space-y-12">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">M4: Implementation Strategy Validation</h4>
                                <div className="grid gap-4">
                                    {q.options?.map((opt, i) => (
                                        <button key={i} onClick={() => setUserAnswers({ ...userAnswers, [`${q.id}_m4`]: i })} className={`flex items-center p-10 rounded-[48px] border-2 text-left transition-all ${userAnswers[`${q.id}_m4`] === i ? 'border-primary-600 bg-primary-50 shadow-2xl scale-[1.02]' : 'border-slate-50 bg-white hover:border-slate-200'}`}>
                                            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-xl mr-8 ${userAnswers[`${q.id}_m4`] === i ? 'bg-primary-600 border-primary-600 text-white' : 'border-slate-100 text-gray-300'}`}>{String.fromCharCode(65 + i)}</div>
                                            <span className={`font-black text-2xl ${userAnswers[`${q.id}_m4`] === i ? 'text-slate-900' : 'text-slate-500'}`}>{opt.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentMilestone === 4 && (
                            <div className="space-y-12">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">M5: Strategic Justification & Defense</h4>
                                {q.justificationQs?.map((jq, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter pl-6 border-l-4 border-primary-600">{jq}</p>
                                        <textarea
                                            value={userAnswers[`${q.id}_m5_${idx}`] || ''}
                                            onChange={(e) => setUserAnswers({ ...userAnswers, [`${q.id}_m5_${idx}`]: e.target.value })}
                                            placeholder="Articulate your technical rationale..."
                                            className="w-full h-48 p-10 bg-slate-50 rounded-[48px] border-2 border-slate-100 outline-none focus:bg-white focus:border-primary-600 transition-all font-medium text-lg leading-relaxed shadow-inner"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderQuestionUI = () => {
        const questionTitle = q.title || q.text || q.scenario || "Operational Task:";

        if (q.category === 'PROJECT') {
            return renderProjectMilestoneUI();
        }

        if (q.category === 'CODING') {
            const handleMouseDown = () => setIsDragging(true);

            return (
                <div className="h-full flex flex-col md:flex-row bg-white overflow-hidden -mx-10 -my-8">
                    <aside style={{ width: `${leftWidth}px` }} className="border-r border-slate-100 p-10 bg-slate-50 overflow-y-auto shrink-0">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.95]">{q.title}</h2>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10">{q.problemStatement}</p>

                        <div className="p-8 bg-white rounded-[32px] border border-slate-200 shadow-inner mb-6">
                            <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-4 flex items-center gap-2"><Zap className="w-4 h-4" /> Operational Constraints</h4>
                            <pre className="font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{q.constraints}</pre>
                        </div>

                        {q.sampleInput && q.sampleOutput && (
                            <div className="space-y-4">
                                <div className="p-6 bg-blue-50 rounded-[24px] border border-blue-200">
                                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-3">Sample Input</h4>
                                    <pre className="font-mono text-sm text-slate-800 leading-relaxed">{q.sampleInput}</pre>
                                </div>
                                <div className="p-6 bg-green-50 rounded-[24px] border border-green-200">
                                    <h4 className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-3">Sample Output</h4>
                                    <pre className="font-mono text-sm text-slate-800 leading-relaxed">{q.sampleOutput}</pre>
                                </div>
                            </div>
                        )}
                    </aside>

                    <div
                        onMouseDown={handleMouseDown}
                        className={`w-1 bg-slate-200 hover:bg-primary-400 cursor-col-resize transition-colors ${isDragging ? 'bg-primary-500' : ''}`}
                    />

                    <main className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
                        <div className="flex-1 p-8 relative">
                            <div className="absolute top-4 right-8 z-10 flex gap-2">
                                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[9px] font-mono text-slate-500 uppercase tracking-widest shadow-sm">Workspace V1</span>
                            </div>
                            <div className="w-full h-full bg-white rounded-2xl border-2 border-slate-200 shadow-inner overflow-hidden">
                                <div className="h-full flex">
                                    <div className="w-12 bg-slate-50 border-r border-slate-200 py-4 flex flex-col items-center gap-2 text-[10px] font-mono text-slate-400">
                                        {codeValue.split('\n').map((_, i) => (
                                            <div key={i} className="leading-relaxed">{i + 1}</div>
                                        ))}
                                    </div>
                                    <textarea
                                        value={codeValue}
                                        onChange={(e) => setCodeValue(e.target.value)}
                                        className="flex-1 p-4 bg-transparent text-slate-800 font-mono text-sm outline-none resize-none leading-relaxed"
                                        spellCheck={false}
                                        style={{ tabSize: 4 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 flex justify-end gap-4 bg-white/80 backdrop-blur-sm">
                            <button
                                onClick={handleDryRun}
                                className="px-8 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300 flex items-center gap-3 transition-all shadow-sm"
                            >
                                {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />} Execution Dry Run
                            </button>
                            <button
                                onClick={() => handleAnswerSelect(codeValue)}
                                className="px-10 py-3.5 bg-primary-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all border-2 border-primary-600"
                            >
                                Publish Solution
                            </button>
                        </div>
                    </main>
                </div>
            );
        }

        return (
            <div className="max-w-3xl mx-auto w-full py-4 animate-fadeIn">
                {q.category === 'APTITUDE' && (
                    <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 bg-primary-50 text-primary-600 rounded-full border border-primary-100 shadow-sm">
                        <Target className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">{q.subTopic} Reasoning Sub-Topic</span>
                    </div>
                )}

                {q.audioUrl && (
                    <div className="mb-10 p-8 bg-slate-950 rounded-[48px] text-white flex items-center gap-10 shadow-2xl border border-white/5">
                        <button className="w-16 h-16 bg-primary-600 text-white rounded-[24px] flex items-center justify-center shadow-xl hover:bg-primary-700 transition-all"><Play className="w-7 h-7 fill-white" /></button>
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] opacity-40"><span>Aural Comprehension Data</span><span>0:14 / 1:30</span></div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-primary-600 w-1/5 shadow-[0_0_15px_rgba(220,38,38,0.7)]"></div></div>
                        </div>
                    </div>
                )}

                {q.paragraph && <div className="mb-10 p-10 bg-blue-50 border border-blue-100 rounded-[48px] text-slate-700 italic font-medium leading-relaxed text-xl shadow-inner">"{q.paragraph}"</div>}

                <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">{questionTitle}</h3>

                {q.lsrwType === 'SPEAKING' ? (
                    <div className="flex flex-col items-center gap-10 py-16 bg-slate-50 rounded-[64px] border border-slate-100 shadow-inner">
                        <button onClick={() => setIsRecording(!isRecording)} className={`w-32 h-32 rounded-[48px] flex items-center justify-center shadow-3xl transition-all relative group ${isRecording ? 'bg-red-600 scale-110' : 'bg-slate-950 hover:bg-primary-600'}`}>
                            {isRecording && <div className="absolute inset-0 rounded-[48px] bg-red-600 animate-ping opacity-25"></div>}
                            {isRecording ? <Square className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />}
                        </button>
                        <p className={`text-[12px] font-black uppercase tracking-[0.6em] ${isRecording ? 'text-red-600 animate-pulse' : 'text-gray-400'}`}>{isRecording ? 'CAPTURING AURAL INPUT...' : 'INITIATE VOICE CAPTURE'}</p>
                    </div>
                ) : q.category === 'COMMUNICATION' && q.lsrwType === 'WRITING' ? (
                    <div className="space-y-8">
                        <div className="p-8 bg-slate-50 border border-slate-200 rounded-[40px] text-slate-600 text-lg italic font-medium leading-relaxed shadow-sm">Scenario Input: {q.scenario || "Write a professional email regarding a project delay."}</div>
                        <textarea value={userAnswers[q.id] || ''} onChange={(e) => handleAnswerSelect(e.target.value)} placeholder="Type your professional articulation here..." className="w-full h-80 p-10 bg-slate-50 rounded-[48px] border-2 border-slate-100 outline-none focus:ring-8 focus:ring-primary-600/5 focus:border-primary-600 transition-all font-medium text-xl leading-relaxed shadow-inner" />
                    </div>
                ) : q.lsrwType === 'WRITING' || (q.category === 'PSYCHOMETRIC' && !q.options) ? (
                    <textarea value={userAnswers[q.id] || ''} onChange={(e) => handleAnswerSelect(e.target.value)} placeholder="Provide detailed behavioral response..." className="w-full h-80 p-10 bg-slate-50 rounded-[48px] border-2 border-slate-100 outline-none focus:ring-8 focus:ring-primary-600/5 focus:border-primary-600 transition-all font-medium text-xl leading-relaxed shadow-inner" />
                ) : (
                    <div className="grid gap-3">
                        {q.options?.map((opt, i) => (
                            <button key={i} onClick={() => handleAnswerSelect(i)} className={`flex items-center p-5 rounded-[32px] border-2 text-left transition-all ${userAnswers[q.id] === i ? 'border-primary-600 bg-primary-50 shadow-lg scale-[1.01]' : 'border-slate-50 hover:border-slate-200 bg-white'}`}>
                                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-lg mr-6 ${userAnswers[q.id] === i ? 'bg-primary-600 border-primary-600 text-white' : 'border-slate-100 text-gray-300'}`}>{String.fromCharCode(65 + i)}</div>
                                <span className={`font-black text-lg md:text-xl ${userAnswers[q.id] === i ? 'text-slate-900' : 'text-slate-500'}`}>{opt.text}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] bg-white overflow-hidden font-inter flex flex-col animate-fadeIn">
            {status === 'INSTRUCTIONS' && (
                <div className="fixed inset-0 z-[110] bg-white flex items-center justify-center p-6">
                    <div className="max-w-4xl w-full bg-white rounded-[48px] shadow-3xl p-8 border border-slate-100 text-center relative">
                        <div className="bg-primary-50 p-4 rounded-2xl w-fit mx-auto mb-6 border border-primary-100 shadow-sm"><ShieldCheck className="w-12 h-12 text-primary-600" /></div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900">Grad360<sup className="text-[0.6em] font-black text-primary-600">°</sup> Framework</h1>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Universal Placement Readiness Protocol</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {phases.map((p, idx) => (
                                <div key={idx} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-left hover:border-primary-300 hover:bg-white transition-all group shadow-sm">
                                    <span className="text-[9px] font-black text-primary-600 uppercase mb-2 block tracking-widest">Evaluation Node {idx + 1}</span>
                                    <h4 className="font-black text-slate-900 text-lg leading-tight mb-3 group-hover:text-primary-700">{assessment.type === 'SIMULATION' ? p.label.split(':')[1] : p.label}</h4>
                                    <div className="space-y-2 mt-4">{p.sections.map(s => (<div key={s.label} className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div> {s.label}</div>))}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setStatus('PHASE_START')} className="w-full py-6 bg-slate-950 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-primary-600 transition-all active:scale-95">Accept Protocol & Initiate <ArrowRight className="inline-block ml-4 w-5 h-5" /></button>
                    </div>
                </div>
            )}

            {status === 'PHASE_START' && (
                <div className="fixed inset-0 z-[115] bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
                    <div className="max-w-2xl animate-scaleUp">
                        <div className="w-20 h-20 bg-primary-600 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-3xl shadow-primary-600/30 ring-4 ring-white/5"><span className="text-3xl font-black">P{activePhase.day}</span></div>
                        <h2 className="text-[10px] font-black text-primary-500 uppercase tracking-[0.6em] mb-4">Phase Deployment Logic</h2>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
                            {assessment.type === 'SIMULATION' ? activePhase.label.split(':')[1] : activePhase.label}
                        </h1>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[40px] text-left mb-8 shadow-2xl backdrop-blur-xl">
                            <h4 className="text-[9px] font-black text-primary-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Operational Guidelines</h4>
                            <div className="space-y-3">{activePhase.guidelines.map((line, i) => (<div key={i} className="flex items-start gap-4"><CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" /><p className="text-gray-300 text-sm font-medium leading-relaxed italic">"{line}"</p></div>))}</div>
                        </div>
                        <button onClick={() => setStatus('ACTIVE')} className="px-16 py-5 bg-white text-slate-950 rounded-[32px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-primary-600 hover:text-white transition-all active:scale-95">Synchronize & Enter</button>
                    </div>
                    <div className="absolute inset-0 bg-primary-600/5 blur-[150px] pointer-events-none"></div>
                </div>
            )}

            {status === 'ACTIVE' && (
                <>
                    <header className="bg-white border-b border-slate-100 px-8 py-3 flex justify-between items-center shrink-0 z-30 shadow-sm">
                        <div className="flex items-center gap-16">
                            <span className="text-2xl font-black tracking-tighter"><span className="text-primary-600">Grad</span><span className="text-black">360<sup className="text-[0.6em] font-black">°</sup></span></span>

                            {/* Section switcher for all parts */}
                            <div className="hidden lg:flex items-center gap-5 bg-slate-100 p-2 rounded-[24px] border border-slate-200">
                                {activePhase.sections.map((s, idx) => (
                                    <button
                                        key={s.label}
                                        onClick={() => { setCurrentSkillIdx(idx); setCurrentQuestionIdx(0); setCurrentMilestone(0); }}
                                        className={`px-10 py-3.5 rounded-[18px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 ${currentSkillIdx === idx ? 'bg-white text-primary-600 shadow-xl border border-slate-200 scale-[1.05]' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-10 py-4 bg-slate-950 rounded-2xl text-white shadow-2xl ring-8 ring-slate-50">
                            <Clock className={`w-6 h-6 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-primary-500'}`} />
                            <span className="text-2xl font-black tabular-nums tracking-tighter leading-none">{formatTime(timeLeft)}</span>
                        </div>
                    </header>

                    <div className="flex-1 flex overflow-hidden">
                        <div className={`flex-1 bg-white relative shadow-inner ${q.category === 'PROJECT' || q.category === 'CODING' ? 'overflow-hidden p-8' : 'overflow-y-auto p-4'}`}>{renderQuestionUI()}</div>

                        {q.category !== 'PROJECT' && q.category !== 'CODING' && (
                            <aside className="w-[360px] bg-slate-50 border-l border-slate-100 flex flex-col shrink-0">
                                <div className="p-8 border-b border-slate-200/50">
                                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter">Question Navigation</h4>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Module: {activeSection.label}</p>
                                </div>
                                <div className="flex-1 overflow-y-auto p-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {activeSection.label !== 'Cognitive' && activeSection.category !== 'APTITUDE' ? (
                                        <div className="grid grid-cols-4 gap-4">
                                            {activeSection.questions.map((item, idx) => {
                                                const isAnswered = userAnswers[item.id] !== undefined || (item.category === 'PROJECT' && Object.keys(userAnswers).some(k => k.startsWith(item.id)));
                                                const isNow = currentQuestionIdx === idx;
                                                const isFlagged = flaggedQuestions[item.id];
                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => setCurrentQuestionIdx(idx)}
                                                        className={`aspect-square rounded-2xl flex items-center justify-center font-black text-sm transition-all border-2 ${isNow ? 'bg-primary-600 border-primary-600 text-white shadow-2xl scale-110 z-10' :
                                                            isFlagged ? 'bg-orange-50 border-orange-400 text-orange-600' :
                                                                isAnswered ? 'bg-green-500 border-green-500 text-white shadow-lg' :
                                                                    'bg-white border-slate-200 text-slate-400 hover:border-primary-300 hover:text-primary-600'
                                                            }`}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        Array.from({ length: Math.ceil(activeSection.questions.length / 5) }, (_, sectionIdx) => {
                                            const customLabels = ['Quants', 'Reasoning', 'Verbal'];
                                            const sectionLetter = String.fromCharCode(65 + sectionIdx);
                                            const sectionName = customLabels[sectionIdx] || `Section ${sectionLetter}`;
                                            const startIdx = sectionIdx * 5;
                                            const endIdx = Math.min(startIdx + 5, activeSection.questions.length);
                                            const sectionQuestions = activeSection.questions.slice(startIdx, endIdx);
                                            const isExpanded = expandedSection === sectionIdx;

                                            return (
                                                <div id={`section-${sectionIdx}`} key={sectionIdx} className={`mb-4 border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-primary-100 shadow-md bg-white' : 'border-slate-100 shadow-sm bg-slate-50/50'}`}>
                                                    <button
                                                        onClick={() => {
                                                            const nextState = isExpanded ? null : sectionIdx;
                                                            setExpandedSection(nextState);
                                                            if (nextState !== null) {
                                                                setTimeout(() => {
                                                                    document.getElementById(`section-${sectionIdx}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                                                }, 300);
                                                            }
                                                        }}
                                                        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-white border border-slate-200 text-slate-400'}`}>
                                                                <span className="text-xs font-black">{sectionLetter}</span>
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <span className={`text-[10px] font-black uppercase tracking-widest ${isExpanded ? 'text-primary-600' : 'text-slate-400'}`}>{sectionName}</span>
                                                                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">{startIdx + 1}-{endIdx}</span>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary-500' : ''}`} />
                                                    </button>

                                                    {isExpanded && (
                                                        <div className="p-4 pt-0 bg-white animate-fadeIn">
                                                            <div className="h-px w-full bg-slate-50 mb-4"></div>
                                                            <div className="grid grid-cols-5 gap-3">
                                                                {sectionQuestions.map((item, localIdx) => {
                                                                    const idx = startIdx + localIdx;
                                                                    const isAnswered = userAnswers[item.id] !== undefined || (item.category === 'PROJECT' && Object.keys(userAnswers).some(k => k.startsWith(item.id)));
                                                                    const isNow = currentQuestionIdx === idx;
                                                                    const isFlagged = flaggedQuestions[item.id];
                                                                    return (
                                                                        <button
                                                                            key={item.id}
                                                                            onClick={() => setCurrentQuestionIdx(idx)}
                                                                            className={`aspect-square rounded-xl flex items-center justify-center font-black text-sm transition-all border-2 ${isNow ? 'bg-primary-600 border-primary-600 text-white shadow-2xl scale-110 z-10' :
                                                                                isFlagged ? 'bg-orange-50 border-orange-400 text-orange-600' :
                                                                                    isAnswered ? 'bg-green-500 border-green-500 text-white shadow-lg' :
                                                                                        'bg-white border-slate-200 text-slate-400 hover:border-primary-300 hover:text-primary-600'
                                                                                }`}
                                                                        >
                                                                            {idx + 1}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-200 pl-4">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 text-center">Status Legend</p>
                                    <div className="grid grid-cols-2 gap-3 justify-center">
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><div className="w-3 h-3 rounded bg-green-500 shadow-sm"></div> Answered</div>
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><div className="w-3 h-3 rounded bg-orange-50 border border-orange-400 shadow-sm"></div> Review</div>
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6"><div className="w-3 h-3 rounded bg-white border border-slate-200 shadow-sm"></div> Pending</div>
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6"><div className="w-3 h-3 rounded bg-primary-600 shadow-sm"></div> Current</div>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>

                    <footer className="bg-white border-t border-slate-100 p-4 flex justify-between items-center px-8 shrink-0 z-30 shadow-2xl">
                        <div className="flex gap-4">
                            <button disabled={currentQuestionIdx === 0 && currentSkillIdx === 0} onClick={handlePrev} className="px-10 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 disabled:opacity-0 transition-all flex items-center gap-3 border border-slate-200"><ChevronLeft className="w-5 h-5" /> Back</button>
                            <button onClick={() => setFlaggedQuestions(prev => ({ ...prev, [q.id]: !prev[q.id] }))} className={`px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center gap-3 border ${flaggedQuestions[q.id] ? 'bg-orange-50 text-orange-600 border-orange-200 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100'}`}><Flag className={`w-5 h-5 ${flaggedQuestions[q.id] ? 'fill-orange-600 text-orange-600' : ''}`} /> Review Later</button>
                        </div>
                        {q.category === 'PROJECT' ? (
                            <button
                                onClick={() => {
                                    if (currentMilestone < 4) setCurrentMilestone(m => m + 1);
                                    else handleNext();
                                }}
                                className="px-20 py-6 bg-primary-600 text-white rounded-[32px] font-black text-[12px] uppercase tracking-[0.4em] flex items-center gap-5 transition-all shadow-3xl active:scale-95 group hover:bg-primary-700"
                            >
                                {currentMilestone === 4 ? 'Complete Lab' : 'Next Milestone'} <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        ) : (
                            <button onClick={handleNext} className="px-20 py-6 bg-slate-950 text-white rounded-[32px] font-black text-[12px] uppercase tracking-[0.4em] flex items-center gap-5 transition-all shadow-3xl active:scale-95 group hover:bg-primary-600">
                                {currentPhaseIdx === phases.length - 1 && currentSkillIdx === activePhase.sections.length - 1 && currentQuestionIdx === activeSection.questions.length - 1 ? 'Finalize Evaluation' : 'Next Question'} <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        )}
                    </footer>
                </>
            )}

            {
                status === 'REPORT' && (
                    <div className="fixed inset-0 z-[150] bg-slate-50 overflow-y-auto animate-fadeIn p-6 md:p-20 flex flex-col items-center">
                        <div className="max-w-7xl w-full bg-white rounded-[80px] shadow-3xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[85vh]">
                            <aside className="md:w-2/5 bg-slate-950 text-white p-20 flex flex-col justify-between relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-5 mb-20"><span className="text-3xl font-black tracking-tighter text-white"><span className="text-primary-600">Grad</span><span>360<sup className="text-[0.6em] font-black">°</sup></span></span></div>
                                    <h2 className="text-[12px] font-black text-primary-500 uppercase tracking-[0.8em] mb-8">Performance Validated</h2>
                                    <h1 className="text-6xl font-black tracking-tighter leading-[0.95] mb-12">Recruitment<br />Optimized.</h1>
                                    <div className="space-y-16">
                                        <div><p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Composite Score Matrix</p><div className="flex items-baseline gap-5"><span className="text-9xl font-black tracking-tighter">94</span><span className="text-5xl font-black text-primary-600">%</span></div></div>
                                        <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 flex items-center gap-8 backdrop-blur-xl shadow-2xl"><div className="p-5 bg-primary-600 rounded-[28px] shadow-2xl shadow-primary-600/30"><Award className="w-10 h-10 text-white" /></div><div><h4 className="font-black text-2xl uppercase tracking-tighter">Elite Grade Tier</h4><p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] mt-2">Placement Benchmark Exceeded</p></div></div>
                                    </div>
                                </div>
                                <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] bg-primary-600/10 blur-[150px] rounded-full pointer-events-none"></div>
                            </aside>
                            <main className="flex-1 p-16 md:p-20 bg-white flex flex-col">
                                <div className="flex justify-between items-center mb-8"><h3 className="text-4xl font-black text-slate-900 tracking-tighter">Evaluation Breakdown</h3><div className="flex gap-5"><button className="p-5 bg-slate-50 text-slate-400 rounded-3xl hover:text-primary-600 border border-slate-100 shadow-sm transition-all"><Download className="w-8 h-8" /></button><button className="p-5 bg-slate-50 text-slate-400 rounded-3xl hover:text-primary-600 border border-slate-100 shadow-sm transition-all"><Share2 className="w-8 h-8" /></button></div></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {phases.map((p, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 text-center group hover:bg-white hover:border-primary-200 transition-all duration-700 shadow-sm">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-3">Metric Phase {idx + 1}</p>
                                            <h4 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">9{idx + 2}%</h4>
                                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-4 shadow-inner"><div className="h-full bg-primary-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-2000" style={{ width: `9${idx + 2}%` }}></div></div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] leading-relaxed italic">"{assessment.type === 'SIMULATION' ? p.label.split(':')[1] : p.label}"</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-6">
                                    <button onClick={onClose} className="flex-1 py-6 bg-slate-950 text-white rounded-[32px] font-black text-sm uppercase tracking-[0.5em] shadow-3xl hover:bg-primary-600 transition-all active:scale-95">Return to Dashboard</button>
                                    <button className="flex-1 py-6 bg-slate-50 text-slate-900 rounded-[32px] font-black text-sm uppercase tracking-[0.5em] border-4 border-slate-100 hover:bg-white hover:border-primary-100 transition-all active:scale-95">Archive Results</button>
                                </div>
                            </main>
                        </div>
                        <p className="mt-16 text-slate-400 font-black text-[11px] uppercase tracking-[0.8em]">Grad360 Universal Certification Node: #G360-V2-88219-X</p>
                    </div>
                )
            }
        </div >
    );
};

export default ExamPortal;
