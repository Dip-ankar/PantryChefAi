import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeDisplay = ({ recipe }) => {
  const handleSave = () => {
    toast.success(`Recipe "${recipe.title}" saved!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
      <p className="text-gray-600 mb-6">{recipe.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients Checklist */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Ingredients</h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-center">
                <input type="checkbox" id={`ing-${index}`} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                <label htmlFor={`ing-${index}`} className="text-gray-700">
                  <span className="font-medium">{ing.quantity}</span> {ing.item}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-3">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-gray-700 leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="bg-teal-400 text-white font-bold py-2 px-6 rounded-md hover:bg-teal-600 transition duration-300"
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeDisplay;