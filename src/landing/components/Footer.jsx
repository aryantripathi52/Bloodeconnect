import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">BloodConnect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-forest-green transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-forest-green transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-forest-green transition-colors"><Facebook /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Our Mission</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Camps</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Find a Camp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Organize a Camp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Partnerships</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 BloodConnect. All rights reserved.</p>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
