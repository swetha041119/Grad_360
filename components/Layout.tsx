
import React from 'react';
import { User } from '../types';
import {
  LogOut, LayoutDashboard, BrainCircuit, Code2,
  History, Zap, UserCheck, FileCheck, Users, Briefcase, BookOpen, MessageSquare, BriefcaseBusiness, Calendar, TrendingUp, Database
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, activeTab, setActiveTab }) => {
  if (!user) return <>{children}</>;

  const getNavItems = () => {
    switch (user.role) {
      case 'STUDENT':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'aptitude', label: 'Aptitude & Logic', icon: BrainCircuit },
          { id: 'technical', label: 'Technical Essentials', icon: Zap },
          { id: 'coding', label: 'Coding & Tech', icon: Code2 },
          { id: 'psychometric', label: 'Psychometric Skill', icon: UserCheck },
          { id: 'domain', label: 'Domain Knowledge', icon: BookOpen },
          { id: 'communication', label: 'Communication Skill', icon: MessageSquare },
          { id: 'projects', label: 'Projects Skill', icon: BriefcaseBusiness },
          { id: 'history', label: 'Assessment History', icon: History },
        ];
      case 'FACULTY':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'assessments', label: 'Assessments', icon: FileCheck },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'jobs', label: 'Jobs & Shortlist', icon: Briefcase },
          { id: 'intelligence', label: 'Visual Intelligence', icon: TrendingUp },
        ];
      case 'COMPANY':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'candidates', label: 'Candidates', icon: Users },
          { id: 'assessments', label: 'Assessments', icon: FileCheck },
          { id: 'jobs', label: 'My Job Postings', icon: Briefcase },
          { id: 'interviews', label: 'Interviews', icon: Calendar },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const isCompany = user?.role === 'COMPANY' || user?.role === 'FACULTY';

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter overflow-x-hidden">
      <aside className={`w-64 flex flex-col shadow-xl z-20 border-r transition-colors duration-300 ${
        isCompany ? 'bg-[#8B1E1E] border-[#701616] text-white' : 'bg-white text-gray-900 border-gray-100'
      }`}>
        <div className={`p-6 flex items-center justify-center border-b ${isCompany ? 'border-[#9F2525]' : 'border-gray-50'}`}>
          <span className="text-2xl font-black tracking-tighter">
             {/* Logo logic for company vs others */}
             {isCompany ? (
                 <div className="flex items-center gap-2">
                     <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                     </div>
                     <span className="text-white">GradEdge</span>
                 </div>
             ) : (
                <>
                    <span className="text-primary-600">Grad</span>
                    <span className="text-black">360<sup className="text-[0.6em] font-black">°</sup></span>
                </>
             )}
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? isCompany 
                    ? 'bg-[#A62828] text-white shadow-lg shadow-black/10' 
                    : 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                  : isCompany
                    ? 'text-red-100/70 hover:bg-[#952222] hover:text-white'
                    : 'text-gray-500 hover:bg-slate-50 hover:text-primary-600'
                }`}
            >
              {React.createElement(item.icon, { className: `h-5 w-5 ${activeTab !== item.id && isCompany ? 'opacity-70' : ''}` })}
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={`p-4 border-t ${isCompany ? 'border-[#9F2525]' : 'border-gray-50'}`}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 mb-4 px-3 py-3 rounded-2xl transition-all group ${
                isCompany 
                ? 'hover:bg-[#952222] text-white'
                : activeTab === 'profile' ? 'bg-slate-50 ring-1 ring-gray-100' : 'hover:bg-slate-50'
            }`}
          >
            <img src={user.avatar} alt="User" className="h-10 w-10 rounded-xl border border-gray-100 object-cover" />
            <div className="overflow-hidden text-left">
              <p className={`text-sm font-black truncate ${isCompany ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isCompany ? 'text-red-200' : 'text-gray-400'}`}>{user.companyName || user.role.toLowerCase()}</p>
            </div>
          </button>
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${
                isCompany 
                ? 'bg-[#5F1212] hover:bg-[#4A0E0E] text-white border border-[#701616]'
                : 'bg-slate-900 hover:bg-black text-white'
            }`}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
