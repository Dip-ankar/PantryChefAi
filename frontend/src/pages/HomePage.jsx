import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import AboutPage from "./AboutPage";
import RecipesPage from "./RecipesPage";
import ContactPage from "./ContactPage";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=c`);
        const data = await res.json();
        if (data.meals) setRecipes(data.meals.slice(0, 3));
      } catch (error) { console.error("Failed to fetch recipes", error); }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="bg-slate-900 text-slate-100">
      {/* --- Hero Section with Blurred Background Image --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center text-white p-6">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874')]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Never Waste Food Again</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-400">Turn your leftover ingredients into delicious, AI-generated meals.</p>
          <Link to="/dashboard" className="inline-block mt-8 bg-teal-500 text-white font-bold py-4 px-10 rounded-full hover:bg-teal-600 transition duration-300 text-lg shadow-lg">
            Start Cooking for Free
          </Link>
        </motion.div>
      </section>

      {/* --- Features Section --- */}
      <AnimatedSection id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">Why You'll Love PantryChef AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div whileHover={{ y: -5 }} className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Smart Pantry</h3>
            <p className="text-slate-400">Easily track ingredients you have at home.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">AI-Powered Recipes</h3>
            <p className="text-slate-400">Our AI generates creative recipes tailored to you.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Effortless Meal Plans</h3>
            <p className="text-slate-400">Get weekly meal plans that save you time and money.</p>
          </motion.div>
        </div>
      </AnimatedSection>

      <RecipesPage/>

      {/* --- About Section --- */}
    <AboutPage/>

      {/* --- Contact Section --- */}
     <ContactPage/>
    </div>
  );
};

export default HomePage;