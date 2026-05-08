import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Our Mission</h1>
        <div className="glass p-8 space-y-6" style={{ padding: '2rem' }}>
          <p className="text-lg">
            BookLoop was founded on a simple idea: <strong>Knowledge should never go to waste.</strong>
          </p>
          <p className="text-slate-400">
            Every year, millions of textbooks are thrown away or left gathering dust on shelves, 
            while new students struggle to afford the rising costs of academic materials.
          </p>
          <p className="text-slate-400">
            Our platform bridges the gap between seniors who no longer need their books and 
            juniors who are just starting their journey. By creating a sustainable loop of 
            sharing and selling, we help students save money and reduce environmental waste.
          </p>
          <div className="pt-8 flex gap-4">
            <div className="flex-1 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
              <div className="text-2xl font-bold text-indigo-400 mb-1">Sustainable</div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Recycle Knowledge</div>
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-center">
              <div className="text-2xl font-bold text-violet-400 mb-1">Affordable</div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Save Money</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
