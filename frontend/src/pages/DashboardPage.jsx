import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { generateRecipe } from "../api/recipeService";
import RecipeDisplay from "../components/RecipeDisplay";
import RecipeSkeleton from "../components/RecipeSkeleton";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const recipeNameToGenerate = location.state?.recipeName;
    if (recipeNameToGenerate) {
      handleGenerateByName(recipeNameToGenerate);
    }
    window.history.replaceState({}, document.title);
  }, [location]);

  const handleGenerateByName = async (name) => {
    setIsLoading(true);
    setError("");
    setGeneratedRecipe(null);
    try {
      const { data } = await generateRecipe({ recipeName: name });
      setGeneratedRecipe(data);
    } catch (err) {
      setError("Sorry, we couldn't generate that specific recipe.");
    }
    setIsLoading(false);
  };

  const [preferences, setPreferences] = useState({
    diet: "None",
    cuisine: "",
    mealTime: "",
    spice: "",
    servings: 1,
    timeLimit: "",
    allergies: [],
    include: "",
    exclude: "",
  });

  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setGeneratedRecipe(null);

    try {
      const { data } = await generateRecipe(preferences);
      setGeneratedRecipe(data);
    } catch (err) {
      setError(
        "Sorry, we couldn't generate a recipe. The AI might be busy. Please try again."
      );
      console.error(err);
    }

    setIsLoading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br  p-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-teal-400">
          Welcome back, {user.name || "Chef"}! 👩‍🍳
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Let’s cook up something delicious today.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Image Section --- */}
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1712262749805-aa88580166ec?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Cooking Inspiration"
            className="w-full h-full object-fit rounded-2xl shadow-lg"
          />
        </div>

        {/* --- Create a New Meal Section --- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">
            🍽️ Create a New Meal
          </h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Diet */}
            <div>
              <label
                htmlFor="diet"
                className="block text-sm font-medium text-gray-700"
              >
                Dietary Needs / Meal Type
              </label>
              <select
                id="diet"
                name="diet"
                value={preferences.diet}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="High-Protein">High-Protein</option>
              </select>
            </div>

            {/* Recipe Name */}
            <div>
              <label
                htmlFor="recipeName"
                className="block text-sm font-medium text-gray-700"
              >
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={preferences.recipeName || ""}
                onChange={handleChange}
                placeholder="e.g., Spicy Paneer Curry"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Cuisine */}
            <div>
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-gray-700"
              >
                Cuisine Preference
              </label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={preferences.cuisine}
                onChange={handleChange}
                placeholder="e.g., Indian, Italian, Chinese"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Meal Time */}
            <div>
              <label
                htmlFor="mealTime"
                className="block text-sm font-medium text-gray-700"
              >
                Meal Time
              </label>
              <select
                id="mealTime"
                name="mealTime"
                value={preferences.mealTime}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select...</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            {/* Spice Level */}
            <div>
              <label
                htmlFor="spice"
                className="block text-sm font-medium text-gray-700"
              >
                Spice Level
              </label>
              <select
                id="spice"
                name="spice"
                value={preferences.spice}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select...</option>
                <option value="Mild">Mild 🌱</option>
                <option value="Medium">Medium 🌶️</option>
                <option value="Spicy">Spicy 🔥</option>
              </select>
            </div>

            {/* Servings */}
            <div>
              <label
                htmlFor="servings"
                className="block text-sm font-medium text-gray-700"
              >
                Servings
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                min="1"
                max="10"
                value={preferences.servings}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Time Limit */}
            <div>
              <label
                htmlFor="timeLimit"
                className="block text-sm font-medium text-gray-700"
              >
                Time Limit
              </label>
              <select
                id="timeLimit"
                name="timeLimit"
                value={preferences.timeLimit}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="">No Preference</option>
                <option value="15min">≤ 15 minutes</option>
                <option value="30min">≤ 30 minutes</option>
                <option value="1hr">≤ 1 hour</option>
              </select>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allergies (Exclude)
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {["Nuts", "Dairy", "Gluten", "Eggs", "Soy"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="allergies"
                      value={item}
                      checked={preferences.allergies.includes(item)}
                      onChange={(e) => {
                        let allergies = [...preferences.allergies];
                        if (e.target.checked) {
                          allergies.push(item);
                        } else {
                          allergies = allergies.filter((a) => a !== item);
                        }
                        setPreferences({ ...preferences, allergies });
                      }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Include Ingredients */}
            <div>
              <label
                htmlFor="include"
                className="block text-sm font-medium text-gray-700"
              >
                Must Include Ingredients
              </label>
              <input
                type="text"
                id="include"
                name="include"
                value={preferences.include}
                onChange={handleChange}
                placeholder="e.g., Chicken, Tomato, Cheese"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Exclude Ingredients */}
            <div>
              <label
                htmlFor="exclude"
                className="block text-sm font-medium text-gray-700"
              >
                Exclude Ingredients
              </label>
              <input
                type="text"
                id="exclude"
                name="exclude"
                value={preferences.exclude}
                onChange={handleChange}
                placeholder="e.g., Onion, Garlic"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-teal-400 text-white font-semibold rounded-lg shadow hover:bg-teal-500 transition duration-300 disabled:bg-gray-400"
            >
              {isLoading ? "Creating Your Masterpiece..." : "Generate Recipe"}
            </button>
          </form>
        </div>
      </div>

      {/* Generated Recipe */}
      <div className="mt-12">
        {isLoading && <RecipeSkeleton />}
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </p>
        )}
        {generatedRecipe && <RecipeDisplay recipe={generatedRecipe} />}
      </div>
    </div>
  );
};

export default DashboardPage;
