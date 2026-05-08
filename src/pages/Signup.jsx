import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import physicsImg from '../assets/physics.png';
import calculusImg from '../assets/calculus.png';

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://axios.post', formData); // Corrected to use real backend later
      // Using dummy local endpoint for now
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      if (res.data.success) {
        setToast({ show: true, message: 'Account created! Redirecting to login...', type: 'success' });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      setToast({ show: true, message: 'Signup failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#fbcfe8] pt-24 pb-12">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      {/* Background Decor */}
      <div className="relative z-10 w-full max-w-[420px] px-6 fade-in">
        <div className="p-8 shadow-2xl" style={{ 
          background: 'linear-gradient(135deg, #0d9488 0%, #1e1b4b 100%)', 
          borderRadius: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 className="text-2xl font-normal text-white text-center mb-6">Create Account</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/60 ml-3 uppercase tracking-widest">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '999px', border: 'none', background: '#d1d5db', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/60 ml-3 uppercase tracking-widest">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '999px', border: 'none', background: '#d1d5db', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-[10px] text-white/60 ml-3 uppercase tracking-widest">College Email</label>
              <input 
                type="email" 
                placeholder="john@university.edu" 
                style={{ padding: '0.6rem 1.2rem', borderRadius: '999px', border: 'none', background: '#d1d5db', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-[10px] text-white/60 ml-3 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                style={{ padding: '0.6rem 1.2rem', borderRadius: '999px', border: 'none', background: '#d1d5db', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button 
              className="w-full font-bold text-white shadow-lg transition-transform active:scale-95 mt-4" 
              style={{ padding: '0.8rem', borderRadius: '999px', background: '#38bdf8', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-white/60">
            Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
