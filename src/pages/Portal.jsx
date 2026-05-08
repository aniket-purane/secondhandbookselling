import React, { useState } from 'react';
import api from '../services/api';
import Toast from '../components/Toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Portal = ({ user }) => {
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" />;

  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    price: '', 
    subject: 'Science', 
    condition: 'Like New',
    description: '',
    phone: '',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop'
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', {
        ...formData,
        seller: 'Student Seller',
        sellerEmail: user.email
      });
      setToast({ show: true, message: 'Book listed successfully in the marketplace!', type: 'success' });
      setFormData({ title: '', author: '', price: '', subject: '🧪 Science', condition: 'Like New', description: '', phone: '9922864133', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop' });
      
      // Automatically take them to the browse page to see their book
      setTimeout(() => {
        navigate('/browse');
      }, 1500);
    } catch (error) {
      setToast({ show: true, message: 'Failed to post book. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="pt-32 pb-20">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: SENIOR SECTION (The Sellers) */}
          <div className="fade-in">
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              For Seniors
            </div>
            <h1 className="text-4xl font-bold mb-6 text-white">Post Your Books</h1>
            <p className="text-slate-400 mb-10 text-lg">
              Don't let your knowledge gather dust. List your old textbooks and help a junior student get ahead.
            </p>

            <form className="glass p-8 space-y-6" style={{ borderRadius: '32px' }} onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Book Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Organic Chemistry" 
                    className="btn btn-outline w-full" 
                    style={{ textAlign: 'left', padding: '1rem' }}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Author</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Paula Bruice" 
                    className="btn btn-outline w-full" 
                    style={{ textAlign: 'left', padding: '1rem' }}
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price ($)</label>
                  <input 
                    type="number" 
                    placeholder="0 for Free" 
                    className="btn btn-outline w-full" 
                    style={{ textAlign: 'left', padding: '1rem' }}
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                  <select 
                    className="btn btn-outline w-full" 
                    style={{ padding: '1rem' }}
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option>🧪 Science</option>
                    <option>📐 Math</option>
                    <option>💻 Computer Science</option>
                    <option>🎨 Art</option>
                    <option>📊 Economics</option>
                    <option>📚 Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Book Cover Image URL</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Paste image link here..." 
                    className="btn btn-outline flex-1" 
                    style={{ textAlign: 'left', padding: '1rem' }}
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                  <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden border border-white/10">
                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest WhatsApp Number">WhatsApp Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. +1234567890" 
                  className="btn btn-outline w-full" 
                  style={{ textAlign: 'left', padding: '1rem' }}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                <textarea 
                  placeholder="Condition, highlights, etc..." 
                  className="btn btn-outline w-full" 
                  style={{ textAlign: 'left', padding: '1rem', minHeight: '100px', resize: 'none' }}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center py-4 text-lg font-bold">
                List Book in Marketplace
              </button>
            </form>
          </div>

          {/* RIGHT: JUNIOR SECTION (The Buyers) */}
          <div className="space-y-8 sticky top-32">
            <div className="glass p-10 overflow-hidden relative" style={{ borderRadius: '32px' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
                For Juniors
              </div>
              <h2 className="text-3xl font-bold mb-4">Looking to Buy?</h2>
              <p className="text-slate-400 mb-8">
                Find textbooks from your seniors at a fraction of the original price. Save money and get the exact materials you need for your courses.
              </p>
              <a href="/browse" className="btn btn-outline w-full justify-center py-4 font-bold" style={{ textDecoration: 'none' }}>
                Go to Marketplace →
              </a>
            </div>

            <div className="glass p-10" style={{ borderRadius: '32px', background: 'rgba(99, 102, 241, 0.05)' }}>
              <h3 className="text-xl font-bold mb-6">Why BookLoop?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">✓</div>
                  <span className="text-slate-300 text-sm">Save up to 80% on textbooks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">✓</div>
                  <span className="text-slate-300 text-sm">Direct contact with sellers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">✓</div>
                  <span className="text-slate-300 text-sm">Environmentally friendly reuse</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Portal;
