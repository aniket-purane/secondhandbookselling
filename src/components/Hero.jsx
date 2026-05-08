import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onStartClick }) => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute blur-blob" style={{ top: '-80px', left: '-80px', background: 'rgba(99, 102, 241, 0.15)', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(100px)' }}></div>
      <div className="absolute blur-blob" style={{ bottom: '-80px', right: '-80px', background: 'rgba(168, 85, 247, 0.15)', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(100px)' }}></div>

      <div className="container text-center relative" style={{ zIndex: 10 }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 fade-in" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '100px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <span className="animate-pulse" style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Passing knowledge to the next generation</span>
        </div>
        
        <h2 className="font-bold mb-6 tracking-tight fade-in" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1 }}>
          Your Senior's Books,<br />
          <span className="bg-gradient-to-r bg-clip-text text-transparent">
            Your Success Story.
          </span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg mb-10 fade-in" style={{ animationDelay: '0.2s', color: 'var(--text-muted)', margin: '0 auto 2.5rem auto' }}>
          Join the community of students saving money and saving the planet. 
          Buy, sell, or donate textbooks directly within your campus network.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/portal" className="btn btn-primary px-5 py-2.5 font-bold" style={{ textDecoration: 'none', minWidth: '160px', justifyContent: 'center' }}>
            Post Your Book
          </Link>
          <Link to="/browse" className="btn btn-outline px-5 py-2.5 font-bold" style={{ textDecoration: 'none', minWidth: '160px', justifyContent: 'center' }}>
            Browse Marketplace
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 fade-in" style={{ animationDelay: '0.6s' }}>
          <div>
            <div className="text-3xl font-bold text-white">5k+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Books Listed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">12k</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Active Juniors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">80%</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Avg. Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Colleges</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
