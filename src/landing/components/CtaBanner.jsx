import React from 'react';

const CtaBanner = () => {
  return (
    <section className="bg-forest-green py-20">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to be a hero?</h2>
        <p className="mb-8 max-w-xl mx-auto">Join our community of lifesavers. Your donation can be the one that makes all the difference.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="bg-white text-forest-green font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
            Start Your Journey
          </a>
          <a href="#" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-forest-green transition-colors">
            Find Camps
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
