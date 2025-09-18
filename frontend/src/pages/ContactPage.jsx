import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="bg-slate-900 py-16 md:py-24 text-slate-100">
      <div className="container mx-auto px-4">
        {/* --- Header Section --- */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, please don't hesitate to reach out.
            </p>
          </div>
        </AnimatedSection>

        {/* --- Main Content Grid --- */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* --- Contact Information Section --- */}
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-900/50 p-3 rounded-full">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-200">Email</h3>
                    <a href="mailto:support@pantrychef.ai" className="text-teal-400 hover:underline">support@pantrychef.ai</a>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-900/50 p-3 rounded-full">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-200">Phone</h3>
                    <p className="text-slate-400">+91 123 456 7890</p>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-900/50 p-3 rounded-full">
                     <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-200">Address</h3>
                    <p className="text-slate-400">Bengaluru, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Contact Form Section --- */}
            <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
              <h2 className="text-2xl flex items-center justify-center font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-normal text-slate-300">Full Name</label>
                  <input type="text" placeholder='Enter your name' id="name" required className="w-full px-3 py-2 mt-1 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label htmlFor="email"  className="block text-sm font-medium text-slate-300">Email Address</label>
                  <input type="email" placeholder='Enter your email' id="email" required className="w-full px-4 py-2 mt-1 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                  <textarea id="message"  placeholder='Message' rows="5" required className="w-full px-4 py-2 mt-1 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
                </div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ContactPage;