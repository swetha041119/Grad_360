
import React from 'react';
import { GraduationCap, ArrowRight, Users, Building2, Briefcase, CheckCircle2, TrendingUp, Code2, BrainCircuit, Rocket, LayoutDashboard, ChevronRight, Menu, X, Award, Star } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-3xl font-black tracking-tighter text-gray-900">
                <span className="text-primary-600">Grad</span>
                <span className="text-black">360<sup className="text-[0.6em] font-black">°</sup></span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <button
                onClick={onLoginClick}
                className="px-8 py-3.5 text-[10px] font-black text-white bg-primary-600 rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 uppercase tracking-[0.2em]"
              >
                Launch Demo
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-8 space-y-6">
            <button
              onClick={onLoginClick}
              className="w-full py-4 text-xs font-black text-white bg-primary-600 rounded-2xl uppercase tracking-widest"
            >
              Launch Demo
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 lg:pt-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary-400">
            <circle cx="20" cy="20" r="4" fill="currentColor" />
            <circle cx="40" cy="20" r="4" fill="currentColor" />
            <circle cx="60" cy="20" r="4" fill="currentColor" />
            <circle cx="20" cy="40" r="4" fill="currentColor" />
            <circle cx="40" cy="40" r="4" fill="currentColor" />
            <circle cx="60" cy="40" r="4" fill="currentColor" />
            <circle cx="20" cy="60" r="4" fill="currentColor" />
            <circle cx="40" cy="60" r="4" fill="currentColor" />
            <circle cx="60" cy="60" r="4" fill="currentColor" />
          </svg>
        </div>
        
        {/* Decorative curved lines */}
        <div className="absolute bottom-32 left-1/4 w-32 h-32 opacity-30 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary-300">
            <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-8 h-8 opacity-40 pointer-events-none">
          <svg viewBox="0 0 40 40" className="w-full h-full text-primary-400">
            <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(15 20 20)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-[calc(100vh-7rem)]">

            {/* Left Column - Text */}
            <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left mb-12 lg:mb-0 relative z-10">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-600 text-white text-[10px] font-black mb-10 shadow-lg self-center lg:self-start uppercase tracking-[0.15em]">
                <Rocket className="w-3.5 h-3.5 mr-2" />
                Industry Standard Readiness
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8 leading-[0.95]">
                Engineering<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 relative">
                  Industry-Ready
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-400" />
                  </svg>
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">Talent.</span>
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-lg text-gray-500 font-medium mb-12 leading-relaxed">
                A structured placement readiness system that verifies skills, evaluates behavioral safety, and aligns candidates with real-world hiring expectations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={onLoginClick}
                  className="w-full sm:w-auto px-10 py-5 text-sm font-black text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-all shadow-2xl shadow-primary-600/30 flex items-center justify-center transform hover:-translate-y-1 uppercase tracking-widest"
                >
                  Continue <ArrowRight className="ml-3 w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="lg:col-span-7 relative flex items-center justify-end">
              {/* Main Image Container */}
              <div className="relative w-full max-w-2xl lg:max-w-none lg:w-[140%] lg:-mr-32">
                {/* Gradient background blob */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary-100 via-orange-50 to-yellow-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-20 w-64 h-64 bg-gradient-to-tr from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-50"></div>
                
                {/* The main grad image */}
                <div className="relative">
                  <img
                    src="/grad.png"
                    alt="Graduates celebrating success"
                    className="w-full h-auto object-cover relative z-10 drop-shadow-2xl"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                    }}
                  />
                  
                  {/* Floating stat card - Top Left (moved up and left to avoid faces) */}
                  <div className="absolute -top-4 -left-4 lg:top-8 lg:-left-12 z-20 bg-white/95 backdrop-blur-md px-4 py-3 lg:px-6 lg:py-5 rounded-xl lg:rounded-2xl shadow-2xl border border-gray-100 animate-bounce-slow">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="bg-primary-50 p-2 lg:p-3 rounded-lg lg:rounded-xl">
                        <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-[8px] lg:text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Readiness Index</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-lg lg:text-2xl font-black text-gray-900 tracking-tighter">98.4</p>
                          <span className="text-[10px] lg:text-xs font-black text-primary-600">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating stat card - Bottom Right (moved to right edge to avoid faces) */}
                  <div className="absolute bottom-40 lg:bottom-48 -right-4 lg:right-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 lg:px-6 lg:py-5 rounded-xl lg:rounded-2xl shadow-2xl border border-gray-100">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="bg-green-50 p-2 lg:p-3 rounded-lg lg:rounded-xl">
                        <CheckCircle2 className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[8px] lg:text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Verified Skills</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-lg lg:text-2xl font-black text-gray-900 tracking-tighter">2.5K</p>
                          <span className="text-[10px] lg:text-xs font-bold text-green-600">+</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Small decorative badge - moved lower to avoid face overlap */}
                  <div className="absolute bottom-24 lg:bottom-28 right-4 lg:right-8 z-20 bg-primary-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-lg">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                      <span className="text-[10px] lg:text-xs font-bold">Top Rated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-8 md:mb-0">
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              <span className="text-primary-600">Grad</span>
              <span className="text-black">360<sup className="text-[0.6em] font-black">°</sup></span>
            </span>
          </div>
          <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} CORE PLACEMENT INFRASTRUCTURE.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
