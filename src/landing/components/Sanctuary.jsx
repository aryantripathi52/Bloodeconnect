import React from 'react';
import { CheckCircle } from 'lucide-react';

const Sanctuary = () => {
  return (
    <section className="bg-forest-green-dark text-white py-20">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">Find a Sanctuary Near You</h2>
          <p className="text-gray-300 mb-8">
            Our donation centers are safe, clean, and staffed by friendly professionals. We make the donation process as comfortable and easy as possible.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center"><CheckCircle className="text-green-400 mr-3" /> Certified & Safe Environments</li>
            <li className="flex items-center"><CheckCircle className="text-green-400 mr-3" /> Quick & Easy Process</li>
          </ul>
          <a href="#" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-forest-green-dark transition-colors">
            Find Donation Centers
          </a>
        </div>
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="Map" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Sanctuary;
