import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  // Variants for mobile menu animation
  const menuVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  // Small underline animation for nav links
  const NavLink = ({ to, children, onClick }) => (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        to={to}
        onClick={onClick}
        className="relative text-gray-700 dark:text-gray-300 hover:text-teal-500 font-medium transition"
      >
        {children}
        <motion.span
          className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );

  return (
    <header className="bg-gray-900 dark:bg-gray-900/70 backdrop-blur-md shadow-md sticky top-0 z-50 transition-colors">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight"
        >
          PantryChef AI
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/creative-cooking">Creative Cooking</NavLink>
              <NavLink to="/visual-search">Visual Search</NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 shadow transition"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/auth"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700 shadow transition"
              >
               Sign in
              </Link>
            </motion.div>
          )}
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-900 dark:text-white focus:outline-none"
          >
            <motion.svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 0 }}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </motion.svg>
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Panel --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/recipes" onClick={() => setIsMenuOpen(false)}>
                Recipes
              </NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
              <hr className="border-gray-300 dark:border-gray-600" />
              {user ? (
                <>
                  <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/creative-cooking"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Creative Cooking
                  </NavLink>
                  <NavLink
                    to="/visual-search"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Visual Search
                  </NavLink>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:text-red-800 py-1"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Login / Register
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
