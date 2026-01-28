
import React from 'react';
import { GraduationCap, ArrowRight, Users, Building2, Briefcase, CheckCircle2, TrendingUp, Code2, BrainCircuit, Rocket, LayoutDashboard, ChevronRight, Menu, X, Award, Star } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900">
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
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

            {/* Left Column - Text */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-primary-700 text-[10px] font-black mb-10 border border-primary-100 shadow-sm self-center lg:self-start uppercase tracking-[0.2em]">
                <Rocket className="w-3.5 h-3.5 mr-2" />
                Industry Standard Readiness
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8 leading-[0.9]">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">Career Success.</span>
              </h1>
              <p className="max-w-2xl mx-auto lg:mx-0 text-xl text-gray-500 font-medium mb-12 leading-relaxed">
                The definitive placement ecosystem for high-performing students. Automated skill checks, specialized domain labs, and real-time recruitment matching.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <button
                  onClick={onLoginClick}
                  className="w-full sm:w-auto px-12 py-6 text-sm font-black text-white bg-primary-600 rounded-[32px] hover:bg-primary-700 transition-all shadow-2xl shadow-primary-600/30 flex items-center justify-center transform hover:-translate-y-1 uppercase tracking-widest"
                >
                  Start Assessment <ArrowRight className="ml-3 w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto px-12 py-6 text-sm font-black text-gray-700 bg-white border border-gray-200 rounded-[32px] hover:bg-gray-50 transition-all flex items-center justify-center hover:shadow-xl uppercase tracking-widest">
                  Institutional Access
                </button>
              </div>
            </div>

            {/* Right Column - Image & Elements */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative z-10 w-full max-w-lg">
                <div className="relative rounded-[64px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden border-[16px] border-white transform rotate-3 hover:rotate-0 transition-all duration-1000">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Collaborative Success"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="font-black text-3xl tracking-tight">Enterprise Scale</p>
                    <p className="text-[10px] font-black opacity-80 uppercase tracking-[0.3em] mt-2">Placement Readiness Check</p>
                  </div>
                </div>

                <div className="absolute -top-12 -left-12 z-20 bg-white/95 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border border-white/50 animate-bounce-slow">
                  <div className="flex items-center gap-5">
                    <div className="bg-primary-50 p-4 rounded-[20px]">
                      <TrendingUp className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Readiness Index</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-3xl font-black text-gray-900 tracking-tighter">98.4</p>
                        <span className="text-xs font-black text-primary-600">%</span>
                      </div>
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
