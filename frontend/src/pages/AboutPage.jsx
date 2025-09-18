import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const AboutPage = () => {
  return (
    <div className="bg-slate-900 py-16 md:py-24 text-slate-100">
      <div className="container mx-auto px-4">
        {/* --- Header Section --- */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Revolutionizing Your Kitchen
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              PantryChef AI was born from a simple idea: to end the daily "what's for dinner?" struggle and reduce food waste, one delicious recipe at a time.
            </p>
          </div>
        </AnimatedSection>

        {/* --- How It Works Section --- */}
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Step 1 */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700"
              >
                <div className="bg-blue-900/50 text-blue-400 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">Log Your Pantry</h3>
                <p className="text-slate-400">Quickly add the ingredients you have on hand using our simple virtual pantry manager.</p>
              </motion.div>
              {/* Step 2 */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700"
              >
                <div className="bg-green-900/50 text-green-400 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">Set Preferences</h3>
                <p className="text-slate-400">Tell our AI your dietary needs, favorite cuisines, and how much time you have.</p>
              </motion.div>
              {/* Step 3 */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700"
              >
                <div className="bg-purple-900/50 text-purple-400 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">Get Inspired</h3>
                <p className="text-slate-400">Receive instant, creative recipes tailored just for you, with smart suggestions.</p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* --- Call to Action Section --- */}
        <AnimatedSection>
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Cooking?</h2>
            <Link
              to="/creative-cooking"
              className="inline-block bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition duration-300 text-lg shadow-lg"
            >
              Join Now for Free
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutPage;