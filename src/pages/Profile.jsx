import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import BookCard from '../components/BookCard';

const Profile = ({ user, onToggleWishlist }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'saved'
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (user) {
      fetchMyBooks();
      fetchSavedBooks();
    }
  }, [user, user?.wishlist]);

  const fetchMyBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books?email=${user.email}`);
      setMyBooks(response.data);
    } catch (error) {
      console.error('Error fetching my books:', error);
    }
  };

  const fetchSavedBooks = async () => {
    if (!user.wishlist || user.wishlist.length === 0) {
      setSavedBooks([]);
      setLoading(false);
      return;
    }
    try {
      const allBooksRes = await axios.get('http://localhost:5000/api/books');
      const saved = allBooksRes.data.filter(b => user.wishlist.includes(b.id));
      setSavedBooks(saved);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved books:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this listing?')) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setToast({ show: true, message: 'Listing removed successfully!', type: 'success' });
        fetchMyBooks();
      } catch (error) {
        setToast({ show: true, message: 'Failed to remove listing.', type: 'error' });
      }
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="pt-32 pb-20 bg-[#fbcfe8]/10 min-h-screen">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: User Card */}
          <div className="lg:col-span-1">
            <div className="glass p-8 text-center sticky top-32" style={{ borderRadius: '32px' }}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl font-bold uppercase">{user.email[0]}</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Student</h2>
              <p className="text-slate-500 text-sm mb-6">{user.email}</p>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setActiveTab('listings')}
                  className={`btn w-full justify-center ${activeTab === 'listings' ? 'btn-primary' : 'btn-outline'}`}
                >
                  My Listings
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`btn w-full justify-center ${activeTab === 'saved' ? 'btn-primary' : 'btn-outline'}`}
                >
                  Saved Books ({user.wishlist?.length || 0})
                </button>
              </div>
            </div>
          </div>

          {/* Right: Content Area */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-6 text-center" style={{ borderRadius: '24px' }}>
                <div className="text-3xl font-bold text-indigo-400">{myBooks.length}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Active Listings</div>
              </div>
              <div className="glass p-6 text-center" style={{ borderRadius: '24px' }}>
                <div className="text-3xl font-bold text-pink-400">{user.wishlist?.length || 0}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Saved Books</div>
              </div>
              <div className="glass p-6 text-center" style={{ borderRadius: '24px' }}>
                <div className="text-3xl font-bold text-violet-400">0</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Total Sales</div>
              </div>
            </div>

            <div className="glass p-8" style={{ borderRadius: '32px' }}>
              {activeTab === 'listings' ? (
                <>
                  <h3 className="text-xl font-bold mb-8">My Active Listings</h3>
                  {myBooks.length > 0 ? (
                    <div className="space-y-4">
                      {myBooks.map(book => (
                        <div key={book.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-slate-800 rounded-lg overflow-hidden">
                              <img src={book.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white">{book.title}</h4>
                              <p className="text-xs text-slate-500">{book.subject} • ${book.price}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDelete(book.id)}
                            className="p-2 px-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                      <p className="text-slate-400">No active listings yet.</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-8">Saved for Later</h3>
                  {savedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedBooks.map(book => (
                        <BookCard 
                          key={book.id} 
                          book={book} 
                          isSaved={true} 
                          onToggleWishlist={onToggleWishlist} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                      <div className="text-4xl mb-4">❤️</div>
                      <h4 className="font-bold mb-2">No saved books</h4>
                      <p className="text-sm text-slate-400">Books you "heart" will appear here!</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
