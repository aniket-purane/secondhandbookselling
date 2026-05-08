import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostBookModal from './components/PostBookModal';
import Home from './pages/Home';
import Browse from './pages/Browse';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import BookDetails from './pages/BookDetails';
import Portal from './pages/Portal';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('bookloop_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({ ...parsedUser, wishlist: parsedUser.wishlist || [] });
    }
  }, []);

  const toggleWishlist = (bookId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const isSaved = user.wishlist?.includes(bookId);
    const newWishlist = isSaved 
      ? user.wishlist.filter(id => id !== bookId)
      : [...(user.wishlist || []), bookId];
    
    const updatedUser = { ...user, wishlist: newWishlist };
    setUser(updatedUser);
    localStorage.setItem('bookloop_user', JSON.stringify(updatedUser));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('bookloop_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bookloop_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onPostClick={() => setIsModalOpen(true)} 
        onLogout={handleLogout}
      />
      
      <main>
        <Routes>
          <Route path="/" element={<Home onPostClick={() => setIsModalOpen(true)} />} />
          <Route path="/browse" element={<Browse user={user} onToggleWishlist={toggleWishlist} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile user={user} onToggleWishlist={toggleWishlist} />} />
          <Route path="/book/:id" element={<BookDetails user={user} onToggleWishlist={toggleWishlist} />} />
          <Route path="/portal" element={<Portal user={user} />} />
        </Routes>
        
        <PostBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>

      <footer className="py-12" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center" style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}>
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-xl">BookLoop</span>
            </div>
            
            <div className="flex gap-8 text-sm" style={{ color: 'var(--text-muted)' }}>
              <a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            </div>
            
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © 2026 BookLoop. Built for students.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
