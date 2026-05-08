import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Toast from '../components/Toast';

const BookDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className="pt-40 text-center">Loading book details...</div>;
  if (!book) return <div className="pt-40 text-center">Book not found.</div>;

  const handleBuy = () => {
    if (!user) {
      setToast({ show: true, message: 'Login Required! Please log in to contact the seller.', type: 'error' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    const message = `Hi ${book.seller}, I saw your book "${book.title}" on BookLoop and I'm interested in buying it!`;
    const whatsappUrl = `https://wa.me/${book.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-32 pb-20">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      
      <div className="container">
        <Link to="/browse" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors" style={{ textDecoration: 'none' }}>
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image Box */}
          <div className="glass overflow-hidden" style={{ borderRadius: '32px', height: 'fit-content' }}>
            <img 
              src={book.image} 
              alt={book.title} 
              className="w-full h-full object-cover" 
              style={{ minHeight: '500px' }}
            />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                {book.subject}
              </div>
              <h1 className="text-5xl font-bold mb-4">{book.title}</h1>
              <p className="text-xl text-slate-400">by {book.author}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-4xl font-bold text-white">
                {book.price === 0 ? 'FREE' : `$${book.price}`}
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold">
                Condition: <span className="text-indigo-400">{book.condition}</span>
              </div>
            </div>

            <div className="glass p-8" style={{ borderRadius: '24px' }}>
              <h3 className="font-bold mb-4 text-lg">Description</h3>
              <p className="text-slate-400 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="glass p-8 border-indigo-500/30 bg-indigo-500/5" style={{ borderRadius: '24px' }}>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700"></div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Seller</div>
                    <div className="font-bold text-white text-lg">{book.seller}</div>
                  </div>
                </div>
                <button 
                  onClick={handleBuy}
                  className="btn btn-primary px-10 py-4 text-lg shadow-2xl shadow-indigo-500/40"
                >
                  Buy Now via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
