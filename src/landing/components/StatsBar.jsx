import React from 'react';

const StatsBar = () => {
  return (
    <section className="bg-gray-50 py-20 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-forest-green">1.2M+</p>
            <p className="text-gray-500">Blood Donations</p>
          </div>
          <div className="flex items-center justify-center">
            <a href="#" className="text-xl font-semibold text-forest-green border-b-2 border-forest-green hover:border-transparent transition-colors">Become a Partner</a>
          </div>
          <div>
            <p className="text-4xl font-bold text-forest-green">5,000+</p>
            <p className="text-gray-500">Camps Organized</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-forest-green">10,000+</p>
            <p className="text-gray-500">Volunteers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
