import React from 'react';
import Hero from '../components/Hero';
import BookGrid from '../components/BookGrid';

const Home = ({ onPostClick }) => {
  return (
    <>
      <Hero onStartClick={onPostClick} />
      <div className="container py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Books</h2>
        <BookGrid />
      </div>
    </>
  );
};

export default Home;
