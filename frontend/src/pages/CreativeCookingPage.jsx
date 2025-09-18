import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateIdeas } from "../api/recipeService";

const vegetablesAndSpices = [
  "Tomato",
  "Onion",
  "Garlic",
  "Ginger",
  "Potato",
  "Carrot",
  "Bell Pepper",
  "Spinach",
  "Broccoli",
  "Chili",
  "Coriander",
  "Turmeric",
];
const proteins = [
  "Chicken",
  "Mutton",
  "Fish",
  "Prawns",
  "Paneer",
  "Tofu",
  "Lentils (Dal)",
  "Chickpeas",
  "Kidney Beans",
  "Egg",
];

const CreativeCookingPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIngredients.length < 2) {
      setError("Please select at least two ingredients.");
      return;
    }
    setIsLoading(true);
    setError("");
    setIdeas([]);
    try {
      const { data } = await generateIdeas(selectedIngredients);
      setIdeas(data.ideas);
    } catch (err) {
      setError("Sorry, we couldn't generate ideas. Please try again.");
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* --- Header Section --- */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        <h1 className="text-5xl font-extrabold text-teal-400">
          Creative Cooking Assistant
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          Select the ingredients you have, and let our AI brainstorm cooking
          styles for you!
        </p>
      </motion.div>

      {/* --- Form Section --- */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Vegetables & Spices Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">
              Vegetables & Spices
            </h2>
            <div className="space-y-3">
              {vegetablesAndSpices.map((item) => (
                <motion.label
                  key={item}
                  className="flex items-center text-lg text-gray-600 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleIngredientChange(item)}
                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-3"
                  />
                  {item}
                </motion.label>
              ))}
            </div>
          </div>

          {/* Proteins Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">
              Proteins & Legumes
            </h2>
            <div className="space-y-3">
              {proteins.map((item) => (
                <motion.label
                  key={item}
                  className="flex items-center text-lg text-gray-600 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleIngredientChange(item)}
                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-3"
                  />
                  {item}
                </motion.label>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <motion.button
            type="submit"
            disabled={isLoading}
            className="bg-teal-500 text-white font-bold py-3 px-12 rounded-full hover:bg-teal-600 transition duration-300 text-lg disabled:bg-gray-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Brainstorming..." : "Generate Ideas"}
          </motion.button>
        </div>
      </motion.form>

      {/* --- Results Section --- */}
      <div className="mt-12">
        {error && (
          <motion.p
            className="text-center text-red-500 bg-red-100 p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        {ideas.length > 0 && (
          <motion.div
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-teal-400 mb-6">
              Cooking Ideas for You:
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {ideas.map((idea, index) => (
                <motion.span
                  key={index}
                  className="bg-purple-100 text-purple-800 text-lg font-semibold px-5 py-2 rounded-full"
                  whileHover={{ scale: 1.15, rotate: 3 }}
                >
                  {idea}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreativeCookingPage;
