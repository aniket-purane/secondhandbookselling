import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onPostClick, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'py-3 glass shadow-lg' : 'py-5'}`} style={{ transition: 'all 0.3s' }}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center shadow-lg" style={{ width: '40px', height: '40px', background: 'var(--gradient-main)', borderRadius: '12px' }}>
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent">
            BookLoop
          </h1>
        </div>
        
        <div className="flex items-center gap-8" style={{ display: 'flex' }}>
          <Link to="/" className="font-medium" style={{ color: isActive('/') ? 'white' : 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <Link to="/browse" className="font-medium" style={{ color: isActive('/browse') ? 'white' : 'var(--text-muted)', textDecoration: 'none' }}>Browse</Link>
          <Link to="/about" className="font-medium" style={{ color: isActive('/about') ? 'white' : 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:border-indigo-500 transition-all">
                  <span className="text-indigo-400 font-bold uppercase">{user.email[0]}</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-xs text-slate-500 font-medium">Welcome</div>
                  <div className="text-sm font-bold text-white leading-tight">Student</div>
                </div>
              </Link>
              <button onClick={onLogout} className="btn btn-outline" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>Logout</button>
              <Link to="/portal" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sell a Book</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>Log In</Link>
              <Link to="/portal" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sell a Book</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
