import React from 'react';

const bloodGroups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

const BloodTypes = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Every Type Matters</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          From the most common to the rarest, every blood type is crucial for saving lives. Find out more about your type and how it can help.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {bloodGroups.map(type => (
            <div key={type} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-forest-green transition-all">
              <p className="text-3xl font-bold text-forest-green mb-2">{type}</p>
              <p className="text-sm text-gray-500">Universal Donor</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodTypes;
