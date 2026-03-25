import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    quote: 'The process was so easy and the staff were incredibly friendly. It felt great to know I was making a difference.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    name: 'Mike P.',
    quote: 'I’ve been donating for years, and BloodConnect makes it simple to find camps and track my donations.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e'
  },
  {
    name: 'Jessica T.',
    quote: 'As a recipient of a blood transfusion, I am so grateful for donors. Thank you for saving my life.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f'
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Voices of the Community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-left">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
