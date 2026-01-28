
import React, { useState, useEffect } from 'react';
import { SuperAdmin, Institution, Plan, AuditLog, Contributor } from '../types';
import { getSuperAdminDashboardData } from '../services/mockData';
import { 
  Globe, ShieldAlert, Settings, Activity, BarChart3, TrendingUp, 
  MapPin, Plus, MoreHorizontal, Database, Cloud, Lock, Server,
  Building, Users, CreditCard, ClipboardList, Trash2, Edit3, X,
  Save, ShieldCheck, Mail, Info, RefreshCcw, Search, ChevronRight,
  PencilLine, CheckCircle, AlertCircle
} from 'lucide-react';

interface Props {
  user: SuperAdmin;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SuperAdminPortal: React.FC<Props> = ({ user, activeTab, setActiveTab }) => {
  const [data, setData] = useState<any>(null);
  const [isInstModalOpen, setIsInstModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  
  // Form States
  const [newInst, setNewInst] = useState({ 
    name: '', 
    location: '', 
    planId: 'p1', 
    contactName: '', 
    contactEmail: '', 
    subdomain: '',
    focus: 'General Engineering',
    placementTarget: '80%',
    infra: 'Cloud Based'
  });
  const [newPlan, setNewPlan] = useState({ name: '', adminSlots: 5, facultySlots: 50, studentSlots: 1000, recruiterSlots: 10, price: '$0' });

  useEffect(() => {
    getSuperAdminDashboardData().then(setData);
  }, []);

  if (!data) return <div className="p-10 text-center animate-pulse text-gray-900 font-black uppercase tracking-[0.4em] font-inter">Synchronizing Global Infrastructure...</div>;

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn font-inter">
        <header className="bg-slate-900 p-16 rounded-[64px] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                <div>
                    <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-primary-600 text-white text-[10px] font-black mb-10 uppercase tracking-[0.3em]">
                        <Globe className="w-4 h-4 mr-3" />
                        Root Authority Access
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter leading-none mb-8">Ecosystem Nexus</h1>
                    <p className="text-gray-400 max-w-2xl font-medium opacity-80 leading-relaxed text-xl border-l-4 border-primary-600 pl-10 italic">"Full spectrum oversight across institutional hierarchies and operational primitives."</p>
                </div>
                <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[48px] border border-white/10 text-center shadow-2xl">
                    <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-3">Projected Platform Revenue</p>
                    <p className="text-5xl font-black text-white tracking-tighter">{data.globalStats.revenueSim}</p>
                    <p className="text-[10px] text-green-400 font-black mt-4 tracking-widest">+12.4% PERFORMANCE DELTA</p>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-primary-600/10 blur-[120px] rounded-full"></div>
        </header>

        <div className="grid md:grid-cols-4 gap-8">
            {[
                { label: 'Partnerships', val: data.globalStats.totalInstitutions, icon: Globe, color: 'text-white', bg: 'bg-primary-600' },
                { label: 'Active Users', val: data.globalStats.totalStudents, icon: MapPin, color: 'text-white', bg: 'bg-gray-800' },
                { label: 'System Uptime', val: data.globalStats.systemUptime, icon: Activity, color: 'text-white', bg: 'bg-green-600' },
                { label: 'Audit Density', val: data.auditLogs.length, icon: Database, color: 'text-white', bg: 'bg-indigo-600' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-2xl transition-all duration-500 group">
                    <div className={`${stat.bg} ${stat.color} p-5 rounded-3xl shadow-xl mb-6 group-hover:scale-110 transition-transform`}><stat.icon className="w-8 h-8"/></div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                    <h3 className="text-4xl font-black text-gray-900 mt-2 tracking-tighter">{stat.val}</h3>
                </div>
            ))}
        </div>
        
        {/* Rest of the portal remains consistent in theme */}
    </div>
  );

  return (
    <div className="space-y-8 font-inter">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'institutions' && (
             <div className="space-y-8 animate-fadeIn">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center"><Building className="w-10 h-10 mr-4 text-primary-600" /> Global Ecosystem</h2>
                        <p className="text-gray-500 mt-2 font-medium">Manage and onboard partner universities and colleges.</p>
                    </div>
                    <button onClick={() => setIsInstModalOpen(true)} className="bg-primary-600 text-white px-10 py-5 rounded-[32px] font-black flex items-center shadow-2xl hover:bg-primary-700 transition-all active:scale-95 text-xs uppercase tracking-widest">
                        <Plus className="w-5 h-5 mr-3" /> New Partnership
                    </button>
                </div>
                <div className="bg-white rounded-[64px] border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-gray-100">
                            <tr>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Institution</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Service Tier</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">User Base</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data && data.institutions.map((inst: Institution) => (
                                <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-12 py-8">
                                        <p className="font-black text-gray-900 text-lg leading-tight">{inst.name}</p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{inst.subdomain}</p>
                                    </td>
                                    <td className="px-12 py-8">
                                        <span className="px-5 py-2 bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-primary-100">
                                            {data.plans.find((p: Plan) => p.id === inst.planId)?.name || 'ENTERPRISE'}
                                        </span>
                                    </td>
                                    <td className="px-12 py-8 font-black text-gray-900 text-lg tracking-tighter">{inst.students.toLocaleString()}</td>
                                    <td className="px-12 py-8">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${inst.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                                            {inst.status}
                                        </span>
                                    </td>
                                    <td className="px-12 py-8 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button className="p-3 bg-white text-gray-300 hover:text-primary-600 rounded-xl shadow-sm border border-gray-50 transition-all"><Edit3 className="w-5 h-5" /></button>
                                            <button className="p-3 bg-white text-gray-300 hover:text-red-600 rounded-xl shadow-sm border border-gray-50 transition-all"><Trash2 className="w-5 h-5" /></button>
                                        </div>
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

export default SuperAdminPortal;
