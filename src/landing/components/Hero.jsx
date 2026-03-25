import React from 'react';
import { MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-4 leading-tight">Every Drop is a Lifeline.</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Join thousands of donors saving lives every day. Your blood donation can make the critical difference for someone in need.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="#" className="bg-forest-green text-white font-semibold px-8 py-3 rounded-full hover:bg-forest-green-dark transition-colors">
              Donate Now
            </a>
            <a href="#" className="border-2 border-forest-green text-forest-green font-semibold px-8 py-3 rounded-full hover:bg-forest-green hover:text-white transition-colors">
              Find Camp
            </a>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1581091224003-05e3c14b3b3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="Medical professional" className="rounded-lg shadow-2xl" />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-11/12 lg:w-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 flex items-center space-x-6">
          <div>
            <p className="text-sm text-gray-500">Lives Saved This Year</p>
            <p className="text-4xl font-bold text-gray-800">42,895</p>
            <p className="text-forest-green font-semibold">214k+ Total</p>
          </div>
          <div className="text-forest-green">
            <MapPin size={48} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
