import React, { useState } from 'react';
import BookGrid from '../components/BookGrid';

const Browse = ({ user, onToggleWishlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState('All Subjects');

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        {/* Search Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent">
            Explore the Marketplace
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Search for textbooks across all subjects and connect with seniors instantly.
          </p>

          <div className="max-w-2xl mx-auto mt-10 relative">
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              className="w-full btn btn-outline" 
              style={{ padding: '1.2rem 2rem', textAlign: 'left', borderRadius: '999px', fontSize: '1.1rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-2xl font-bold">Latest Listings</h2>
          <select 
            className="btn btn-outline" 
            style={{ padding: '0.8rem 2rem', borderRadius: '999px' }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>🔍 All Subjects</option>
            <option>🧪 Science</option>
            <option>📐 Math</option>
            <option>💻 Computer Science</option>
            <option>📊 Economics</option>
            <option>🎨 Art</option>
            <option>📚 Other</option>
          </select>
        </div>

        <BookGrid search={searchTerm} subject={subject} user={user} onToggleWishlist={onToggleWishlist} />
      </div>
    </div>
  );
};

export default Browse;
