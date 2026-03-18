import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Phone, Menu, X, LogIn, LogOut, LayoutDashboard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, login, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-medical-blue p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg leading-tight ${isScrolled || !isHome ? 'text-medical-blue' : 'text-white'}`}>Dr. Rajib Acharyya</span>
            <span className={`text-xs font-medium tracking-wider uppercase ${isScrolled || !isHome ? 'text-slate-500' : 'text-slate-200'}`}>Dental Clinic</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`font-medium transition-colors hover:text-medical-teal ${isScrolled || !isHome ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link 
                to="/admin"
                className={`flex items-center gap-1 font-medium transition-colors hover:text-medical-teal ${isScrolled || !isHome ? 'text-slate-700' : 'text-white'}`}
              >
                <LayoutDashboard size={16} />
                Admin
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isScrolled || !isHome ? 'text-slate-400' : 'text-blue-200'}`}>
                    {profile?.role || 'Patient'}
                  </span>
                  <span className={`text-xs font-bold ${isScrolled || !isHome ? 'text-slate-700' : 'text-white'}`}>
                    {profile?.displayName || user.displayName}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled || !isHome ? 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="btn-teal flex items-center gap-2 px-6 py-2 text-sm"
              >
                <LogIn size={18} />
                Login
              </button>
            )}
            <Link to="/contact#appointment" className="btn-blue text-sm py-2 px-4">Book Now</Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className={isScrolled || !isHome ? 'text-medical-blue' : 'text-white'} />
          ) : (
            <Menu className={isScrolled || !isHome ? 'text-medical-blue' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-800 font-semibold text-lg border-b border-slate-100 pb-2"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link 
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-slate-800 font-semibold text-lg border-b border-slate-100 pb-2"
              >
                <LayoutDashboard size={20} />
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center text-medical-blue">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{profile?.role || 'Patient'}</p>
                    <p className="font-bold text-slate-800">{profile?.displayName || user.displayName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { login(); setIsMobileMenuOpen(false); }}
                className="btn-teal flex items-center justify-center gap-2 w-full py-3"
              >
                <LogIn size={20} />
                Login
              </button>
            )}
            <Link to="/contact#appointment" onClick={() => setIsMobileMenuOpen(false)} className="btn-blue text-center py-3">Book Appointment</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
