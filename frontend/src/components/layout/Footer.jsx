import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12 shadow-inner">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; 2025 Dipankar Mandal. All Rights Reserved.
          </p>

          <div className="flex mt-4 sm:mt-0 space-x-6">
            <a href="/about" className="text-sm hover:text-white transition-colors duration-300">
              About
            </a>
            <a href="/privacy" className="text-sm hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/contact" className="text-sm hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;