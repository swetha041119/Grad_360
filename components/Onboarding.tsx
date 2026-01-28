
import React, { useState } from 'react';
import { Student } from '../types';
import { completeStudentOnboarding, ONBOARDING_QUESTIONS } from '../services/mockData';
import { ChevronRight, Upload, CheckCircle2, Monitor, Cpu, Database, TrendingUp, Radio, User, BookOpen, Layers, ArrowRight } from 'lucide-react';

interface Props {
  user: Student;
  onComplete: (updatedUser: Student) => void;
}

const steps = [
  { id: 1, title: "Basic Profile" },
  { id: 2, title: "Career Path" },
  { id: 3, title: "Resume" },
  { id: 4, title: "Skill Check" }
];

const Onboarding: React.FC<Props> = ({ user, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: user.name,
    department: 'Computer Science',
    year: '3rd Year',
    collegeCode: '',
    careerInterest: '',
    selfRating: { coding: 5, communication: 5, aptitude: 5 },
    resumeFile: null as File | null
  });

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
        const updatedUser = await completeStudentOnboarding(user.id, {
            department: formData.department,
            year: formData.year,
            careerInterest: formData.careerInterest,
        });
        // Artificial delay for UX
        setTimeout(() => {
            if (updatedUser) onComplete(updatedUser as Student);
        }, 1500);
    } catch (e) {
        console.error(e);
        setIsLoading(false);
    }
  };

  const handleQuizAnswer = (questionId: number, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const isStepValid = () => {
      if (currentStep === 1) return formData.department && formData.year && formData.collegeCode;
      if (currentStep === 2) return formData.careerInterest;
      if (currentStep === 3) return true; // Optional
      if (currentStep === 4) return Object.keys(quizAnswers).length === ONBOARDING_QUESTIONS.length;
      return true;
  };

  const renderStep1 = () => (
      <div className="space-y-6 animate-fadeIn">
          <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Let's get to know you</h2>
              <p className="text-gray-500">Fill in your academic details to get started.</p>
          </div>
          
          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={formData.name} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none bg-white hover:bg-red-50 hover:border-red-500 cursor-pointer transition-colors"
                  >
                      <option>Computer Science</option>
                      <option>Electronics (ECE)</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                      <option>Information Technology</option>
                  </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                    <select 
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none bg-white hover:bg-red-50 hover:border-red-500 cursor-pointer transition-colors"
                    >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">College Code</label>
                    <input 
                        type="text" 
                        placeholder="e.g. UNIV2024"
                        value={formData.collegeCode}
                        onChange={(e) => setFormData({...formData, collegeCode: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                    />
                </div>
              </div>
          </div>
      </div>
  );

  const renderStep2 = () => (
      <div className="space-y-8 animate-fadeIn">
          <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose your path</h2>
              <p className="text-gray-500">We will personalize your learning modules based on this.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                  { id: 'IT', label: 'IT / Software', icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { id: 'Core', label: 'Core Eng.', icon: Layers, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { id: 'Data', label: 'Data Science', icon: Database, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { id: 'Finance', label: 'Finance/FinTech', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                  { id: 'Electronics', label: 'Electronics', icon: Cpu, color: 'text-red-600', bg: 'bg-red-50' },
                  { id: 'Non-Tech', label: 'Management', icon: User, color: 'text-gray-600', bg: 'bg-gray-50' },
              ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormData({...formData, careerInterest: item.id})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
                        formData.careerInterest === item.id 
                        ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                      <div className={`p-3 rounded-full ${item.bg} ${item.color}`}>
                          <item.icon className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-sm text-gray-700">{item.label}</span>
                  </button>
              ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
              <h3 className="font-bold text-gray-800">Rate yourself (Honesty helps!)</h3>
              {['coding', 'communication', 'aptitude'].map((skill) => (
                  <div key={skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                          <span className="capitalize text-gray-600 font-medium">{skill}</span>
                          <span className="font-bold text-primary-600">{(formData.selfRating as any)[skill]}/10</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={(formData.selfRating as any)[skill]}
                        onChange={(e) => setFormData({
                            ...formData, 
                            selfRating: { ...formData.selfRating, [skill]: parseInt(e.target.value) }
                        })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                  </div>
              ))}
          </div>
      </div>
  );

  const renderStep3 = () => (
      <div className="space-y-8 animate-fadeIn text-center">
          <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Upload Resume</h2>
              <p className="text-gray-500">Optional. We use this to extract existing skills.</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer group">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:shadow-md transition-all">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary-600" />
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">Drag & Drop or Click to Upload</p>
              <p className="text-sm text-gray-400">PDF, DOCX up to 5MB</p>
              <input type="file" className="hidden" />
          </div>

          <button 
            onClick={handleNext} 
            className="text-gray-500 hover:text-gray-700 font-medium text-sm underline"
          >
              Skip for now
          </button>
      </div>
  );

  const renderStep4 = () => (
      <div className="space-y-6 animate-fadeIn">
          <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mini Skill Check</h2>
              <p className="text-gray-500">5 quick questions to baseline your aptitude.</p>
          </div>

          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {ONBOARDING_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                      <p className="font-semibold text-gray-800 mb-4 flex">
                          <span className="text-primary-600 mr-2">{idx + 1}.</span> 
                          {q.question}
                      </p>
                      <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                              <label 
                                key={optIdx} 
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                                    quizAnswers[q.id] === optIdx 
                                    ? 'border-primary-500 bg-primary-50 text-primary-800 font-medium' 
                                    : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                                }`}
                              >
                                  <input 
                                    type="radio" 
                                    name={`q-${q.id}`} 
                                    className="hidden"
                                    onChange={() => handleQuizAnswer(q.id, optIdx)}
                                  />
                                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                                      quizAnswers[q.id] === optIdx ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
                                  }`}>
                                      {quizAnswers[q.id] === optIdx && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                  </div>
                                  {opt}
                              </label>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
          {/* Progress Header */}
          <div className="bg-slate-900 p-8 text-white">
              <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                      <span className="font-black tracking-tight text-xl">
                        <span className="text-primary-500">Grad</span>
                        <span className="text-white">360<sup className="text-[0.6em] font-black">°</sup></span>
                      </span>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Step {currentStep} of 4</span>
              </div>
              <div className="flex gap-2">
                  {steps.map(s => (
                      <div key={s.id} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
                          <div className={`h-full bg-primary-500 transition-all duration-500 ${currentStep >= s.id ? 'w-full' : 'w-0'}`}></div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
          </div>

          {/* Footer Navigation */}
          <div className="p-8 border-t border-gray-50 flex justify-between items-center bg-slate-50/30">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1 || isLoading}
                className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all flex items-center"
              >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary-600/30 hover:bg-primary-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center uppercase text-xs tracking-widest"
              >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                        {currentStep === 4 ? 'Confirm Profile' : 'Next Step'} <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
              </button>
          </div>
      </div>
    </div>
  );
};

const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export default Onboarding;
