import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { analyzeImage } from "../api/recipeService";

const VisualSearchPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setIdeas([]);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError("");
    setIdeas([]);
    try {
      const { data } = await analyzeImage(selectedImage);
      setIdeas(data.ideas);
    } catch (err) {
      setError("Sorry, we couldn't analyze the image. Please try a clearer photo.");
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* --- Header --- */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        <h1 className="text-5xl font-extrabold text-teal-400">
          Visual Ingredient Scanner
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
          Take a photo of your ingredients, and let AI suggest what you can make!
        </p>
      </motion.div>

      {/* --- Upload Box --- */}
      <motion.div
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Preview */}
        <motion.div
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {preview ? (
            <motion.img
              src={preview}
              alt="Ingredients Preview"
              className="max-h-full max-w-full rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 80 }}
            />
          ) : (
            <p className="text-gray-500">Your photo will appear here</p>
          )}
        </motion.div>

        {/* File Input and Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <motion.button
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-400 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take / Upload Photo
          </motion.button>
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !selectedImage}
            className="w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-400 transition disabled:bg-gray-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Analyzing..." : "Suggest Dishes"}
          </motion.button>
        </div>
      </motion.div>

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
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-teal-400 mb-6">
              Based on your photo, you could make:
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {ideas.map((idea, index) => (
                <motion.span
                  key={index}
                  className="bg-purple-100 text-purple-800 text-lg font-semibold px-5 py-2 rounded-full"
                  whileHover={{ scale: 1.15, rotate: 2 }}
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

export default VisualSearchPage;
