
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Users, GraduationCap, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, role: UserRole) => void;
  isLoading: boolean;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading, onBack }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [email, setEmail] = useState('student1@univ.edu');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'STUDENT') setEmail('student1@univ.edu');
    else if (role === 'FACULTY') setEmail('sarah@univ.edu');
    else if (role === 'COMPANY') setEmail('john@techcorp.com');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, selectedRole);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-inter">
      <div className="bg-white rounded-[48px] shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative border border-gray-100 p-12">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 text-gray-400 hover:text-primary-600 transition-colors flex items-center text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="text-center mb-12 mt-4">
            <h1 className="text-5xl font-black tracking-tighter mb-4">
                <span className="text-primary-600">Grad</span>
                <span className="text-black">360<sup className="text-[0.6em] font-black">°</sup></span>
            </h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Placement Readiness Ecosystem</p>
        </div>

        <div className="flex-1">
            <h2 className="text-sm font-black text-gray-900 mb-8 uppercase tracking-widest text-center">Account Access</h2>
            
            <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                    { id: 'STUDENT', label: 'Student', icon: Users },
                    { id: 'FACULTY', label: 'Institution', icon: GraduationCap },
                    { id: 'COMPANY', label: 'Recruiter', icon: Briefcase },
                ].map((role) => (
                    <button 
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleChange(role.id as UserRole)}
                        title={role.label}
                        className={`p-5 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${selectedRole === role.id ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-lg' : 'border-slate-50 hover:border-slate-200 text-gray-300'}`}
                    >
                        {React.createElement(role.icon, { className: "w-6 h-6 mb-2" })}
                        <span className="text-[10px] font-black uppercase tracking-tighter">{role.label}</span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Access Key / Email</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-5 rounded-3xl border border-gray-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all font-bold text-gray-900"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-6 rounded-3xl shadow-2xl shadow-primary-600/30 transition-all flex items-center justify-center text-xs uppercase tracking-[0.2em] active:scale-95"
                >
                    {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <>
                            Access Portal <ArrowRight className="ml-3 w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
