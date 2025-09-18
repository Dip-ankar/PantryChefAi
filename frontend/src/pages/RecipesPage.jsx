import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

// Helper functions
const randomDescriptions = [
  "A delightful traditional dish.",
  "Rich in spices and flavors for foodies.",
  "A perfect recipe to enjoy with family and friends.",
];

const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
const getRandomDescription = () =>
  randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];

const getType = (name) => {
  const nonVegKeywords = ["chicken", "mutton", "fish", "lamb", "prawn", "egg"];
  return nonVegKeywords.some((word) => name.toLowerCase().includes(word))
    ? "Non-Veg"
    : "Veg";
};

const RecipesPage = () => {
  const navigate = useNavigate();

  const [allRecipes, setAllRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      let allMeals = [];
      const usedLetters = new Set();

      while (allMeals.length < 500 && usedLetters.size < alphabet.length) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const letter = alphabet[randomIndex];
        if (usedLetters.has(letter)) continue;
        usedLetters.add(letter);

        try {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
          );
          const data = await res.json();
          if (data.meals) allMeals = [...allMeals, ...data.meals];
        } catch (err) {
          console.error(err);
        }
      }

      const enriched = allMeals.map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        description: getRandomDescription(),
        rating: getRandomRating(),
        type: getType(meal.strMeal),
      }));

      const shuffled = enriched.sort(() => 0.5 - Math.random());

      setAllRecipes(shuffled);
      setFilteredRecipes(shuffled);
      setVisibleRecipes(shuffled.slice(0, 12));
      setLoading(false);
    };

    fetchAllRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters(searchTerm, typeFilter);
  };

  const applyFilters = (search = "", type = "All") => {
    const lowerSearch = search.toLowerCase();
    let results = allRecipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(lowerSearch)
    );

    if (type !== "All") {
      results = results.filter((recipe) => recipe.type === type);
    }

    setFilteredRecipes(results);
    setVisibleRecipes(results.slice(0, 12));
    setVisibleCount(12);
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    applyFilters(searchTerm, type);
  };

  const loadMore = () => {
    const next = visibleCount + 12;
    setVisibleCount(next);
    setVisibleRecipes(filteredRecipes.slice(0, next));
  };

  const handleGenerateClick = (recipeName) => {
    navigate("/dashboard", { state: { recipeName } });
  };

  if (loading)
    return (
      <p className="text-center text-gray-400 text-lg mt-10 animate-pulse">
        Fetching 500+ recipes from multiple cuisines...
      </p>
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-extrabold text-teal-400 drop-shadow-md">
            Explore Recipes
          </h1>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
            Delicious meals from multiple cuisines.
          </p>
        </motion.div>

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        {/* Type Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {["All", "Veg", "Non-Veg"].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTypeFilter(type)}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md ${
                typeFilter === type
                  ? "bg-teal-400 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>

        {/* Recipes Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {visibleRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white h-14">
                  {recipe.strMeal}
                </h2>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                    recipe.type === "Veg"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {recipe.type}
                </span>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {recipe.description}
                </p>
                <div className="flex items-center mt-3 text-gray-700 dark:text-gray-200">
                  <span className="text-yellow-500 text-xl mr-1">★</span>
                  <span className="font-bold">{recipe.rating}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenerateClick(recipe.strMeal)}
                  className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                >
                  Generate
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {visibleCount < filteredRecipes.length && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700"
            >
              Load More Recipes
            </motion.button>
          </div>
        )}

        {/* No Results */}
        {filteredRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No recipes found. Try a different search!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
