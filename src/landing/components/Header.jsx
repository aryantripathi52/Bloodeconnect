import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-forest-green-dark">BloodConnect</div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-forest-green">Home</a>
          <a href="#" className="text-gray-600 hover:text-forest-green">Find Camp</a>
          <a href="#" className="text-gray-600 hover:text-forest-green">Donate</a>
          <a href="#" className="text-gray-600 hover:text-forest-green">Register</a>
        </nav>
        <a href="#" className="hidden md:inline-block bg-forest-green text-white font-semibold px-6 py-2 rounded-full hover:bg-forest-green-dark transition-colors">
          Donate Now
        </a>
      </div>
    </header>
  );
};

export default Header;
