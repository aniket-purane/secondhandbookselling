import React, { useState } from 'react';
import axios from 'axios';

const PostBookModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ title: '', price: '', subject: 'Science', author: 'Senior User' });
  
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', formData);
      alert('Book listed successfully!');
      onClose();
      window.location.reload(); // Refresh to show new book
    } catch (error) {
      console.error('Error listing book:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="glass p-8 w-full max-w-lg fade-in" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">List Your Book</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Book Title</label>
            <input 
              type="text" 
              placeholder="e.g. Advanced Mathematics" 
              className="btn btn-outline" 
              style={{ textAlign: 'left', cursor: 'text', padding: '1rem' }}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Price ($)</label>
              <input 
                type="number" 
                placeholder="0 for Free" 
                className="btn btn-outline" 
                style={{ textAlign: 'left', cursor: 'text', padding: '1rem' }}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Subject</label>
              <select 
                className="btn btn-outline" 
                style={{ padding: '1rem' }}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option>Science</option>
                <option>Math</option>
                <option>Art</option>
                <option>History</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Description</label>
            <textarea 
              placeholder="Tell juniors about the condition of the book..." 
              className="btn btn-outline" 
              style={{ textAlign: 'left', cursor: 'text', padding: '1rem', minHeight: '100px', resize: 'none' }}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary justify-center mt-4 py-4">
            List Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostBookModal;
