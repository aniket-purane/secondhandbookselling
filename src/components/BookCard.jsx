import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, isSaved, onToggleWishlist }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="glass group cursor-pointer text-left overflow-hidden relative"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(book.id);
        }}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-black/20 backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95"
        style={{ color: isSaved ? '#ef4444' : 'white' }}
      >
        {isSaved ? '❤️' : '🤍'}
      </button>

      <div className="book-image-container">
        <img 
          src={book.image || `https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop`} 
          alt={book.title}
        />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold shadow-lg" style={{ backgroundColor: 'var(--primary)', borderRadius: '20px' }}>
          {book.price === 0 ? 'FREE' : `$${book.price}`}
        </div>
      </div>
      
      <div className="p-5 text-left">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">{book.subject}</div>
        <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-indigo-300 transition-colors">{book.title}</h3>
        <p className="text-sm text-slate-400 mb-4">by {book.author}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-700"></div>
            <span className="text-xs text-slate-400">{book.seller}</span>
          </div>
          <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
