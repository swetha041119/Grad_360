
import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import { User, UserRole, Student, Faculty, Company } from './types';
import { loginUser } from './services/mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = async (email: string, role: UserRole) => {
    setLoading(true);
    try {
      const loggedInUser = await loginUser(email, role);
      setUser(loggedInUser);
      setActiveTab('dashboard'); 
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setShowLogin(false);
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (!user) {
    if (showLogin) {
      return <Login onLogin={handleLogin} isLoading={loading} onBack={() => setShowLogin(false)} />;
    }
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  const renderContent = () => {
    if (activeTab === 'profile') {
      return <Profile user={user} onUpdate={handleProfileUpdate} />;
    }

    switch (user.role) {
      case 'STUDENT':
        return <StudentDashboard user={user as Student} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'FACULTY':
        return <FacultyDashboard user={user as Faculty} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'COMPANY':
        return <CompanyDashboard user={user as Company} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
