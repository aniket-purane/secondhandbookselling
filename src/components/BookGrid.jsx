import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

const BookGrid = ({ search = '', subject = 'All Subjects', user, onToggleWishlist }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/books?search=${search}&subject=${subject}`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [search, subject]);

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold mb-2">Marketplace Listings</h2>
          <p className="text-slate-500">Connecting you with the right knowledge.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="text-center col-span-4 py-10 text-slate-400">Loading books...</div>
          ) : books.length > 0 ? (
            books.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                isSaved={user?.wishlist?.includes(book.id)} 
                onToggleWishlist={onToggleWishlist} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-2xl font-bold text-white">No books found</h3>
              <p className="text-slate-400 max-w-xs">We couldn't find any books matching your search. Try a different keyword!</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link to="/browse" className="btn btn-outline px-12 py-3" style={{ textDecoration: 'none' }}>
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookGrid;
