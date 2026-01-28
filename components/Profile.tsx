import React, { useState } from 'react';
import { User, Student, Faculty, Company } from '../types';
import { updateUserProfile } from '../services/mockData';
import { Save, User as UserIcon, Mail, Link, Building, GraduationCap, Briefcase } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<any>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await updateUserProfile(formData);
      onUpdate(updated);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar / Avatar Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="relative inline-block mb-4">
              <img 
                src={formData.avatar} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-primary-50 object-cover mx-auto"
              />
              <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow border border-gray-200 cursor-pointer hover:bg-gray-50">
                 <Link className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wide">
                {formData.role}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-6 rounded-2xl text-white shadow-lg">
             <h3 className="font-bold mb-2">Pro Tip</h3>
             <p className="text-sm text-primary-100 opacity-90">
               Keeping your profile updated ensures you receive the most relevant assessment recommendations and job opportunities.
             </p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-primary-600" />
              Basic Information
            </h3>

            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                  <div className="relative">
                    <Link className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.avatar}
                      onChange={(e) => handleChange('avatar', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Role Specific Fields */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                  {user.role === 'STUDENT' ? 'Academic Details' : user.role === 'COMPANY' ? 'Company Details' : 'Faculty Details'}
                </h3>
                
                <div className="grid grid-cols-2 gap-5">
                  {user.role === 'STUDENT' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input
                          type="text"
                          value={(formData as Student).department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          value={(formData as Student).year}
                          onChange={(e) => handleChange('year', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
                        <input
                          type="text"
                          value={(formData as Student).targetRole}
                          onChange={(e) => handleChange('targetRole', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                        />
                      </div>
                    </>
                  )}

                  {user.role === 'FACULTY' && (
                     <div className="col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                       <div className="relative">
                         <Building className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                         <input
                           type="text"
                           value={(formData as Faculty).department}
                           onChange={(e) => handleChange('department', e.target.value)}
                           className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                         />
                       </div>
                     </div>
                  )}

                  {user.role === 'COMPANY' && (
                     <div className="col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                       <div className="relative">
                         <Building className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                         <input
                           type="text"
                           value={(formData as Company).companyName}
                           onChange={(e) => handleChange('companyName', e.target.value)}
                           className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                         />
                       </div>
                     </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary-600/20 transition-all flex items-center"
                >
                  {isSaving ? (
                     <>Saving...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;