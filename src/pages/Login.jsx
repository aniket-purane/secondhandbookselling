import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Toast from '../components/Toast';
import physicsImg from '../assets/physics.png';
import calculusImg from '../assets/calculus.png';
import algorithmsImg from '../assets/algorithms.png';
import economicsImg from '../assets/economics.png';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.success) {
        setToast({ show: true, message: 'Logged in successfully! Redirecting...', type: 'success' });
        onLoginSuccess({ email });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (error) {
      setToast({ show: true, message: 'Login failed. Check your credentials.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-[#fbcfe8]/10">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      {/* The Reference-Style Login Card */}
      <div className="relative z-10 w-full max-w-[440px] px-10 fade-in">
        <div className="p-12 shadow-2xl" style={{ 
          background: 'linear-gradient(135deg, #0d9488 0%, #1e1b4b 100%)', 
          borderRadius: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 className="text-4xl font-normal text-white text-center mb-10" style={{ fontFamily: 'sans-serif' }}>Login</h1>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Email Address</label>
              <input 
                type="email" 
                placeholder="name@college.edu" 
                className="btn btn-outline w-full" 
                style={{ textAlign: 'left', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', fontSize: '0.9rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Password</label>
                <a href="#" className="text-[10px] text-slate-500 hover:text-white transition-colors">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="btn btn-outline w-full" 
                style={{ textAlign: 'left', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', fontSize: '0.9rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              className="w-full font-bold text-white shadow-lg transition-transform active:scale-95 mt-4" 
              style={{ 
                padding: '0.8rem', 
                borderRadius: '999px', 
                background: '#38bdf8',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-white/60">
              Don't have an account? <Link to="/signup" className="text-white font-bold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
