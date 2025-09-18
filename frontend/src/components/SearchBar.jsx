import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="max-w-2xl mx-auto mb-8 flex shadow-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a recipe (e.g., 'curry')"
        className="w-full px-5 py-3 bg-slate-700 text-slate-200 border border-slate-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-teal-500 text-white font-bold rounded-r-lg hover:bg-teal-600 transition-colors"
      >
        Search
      </motion.button>
    </form>
  );
};

export default SearchBar;