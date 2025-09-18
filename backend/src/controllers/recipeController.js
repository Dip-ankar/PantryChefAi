const { GoogleGenerativeAI } = require("@google/generative-ai");


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateRecipe = async (req, res) => {
  try {
    const { 
      diet, cuisine, recipeName, mealTime, spice, servings, 
      timeLimit, allergies, include, exclude 
    } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let prompt;

    if (recipeName) {
      prompt = `Generate a detailed recipe for "${recipeName}". Response must be a valid JSON object: { "title": "...", "description": "...", "ingredients": [...], "instructions": [...] }`;
    } else {
      const pantryItems = "chicken breast, rice, broccoli, soy sauce, ginger, garlic";
      let promptDetails = [
        `Pantry Items: ${pantryItems}`,
        `Dietary Preference: ${diet}`,
        `Cuisine Preference: ${cuisine || 'Any'}`,
        `Meal Time: ${mealTime || 'Any'}`,
        `Spice Level: ${spice || 'Medium'}`,
        `Number of Servings: ${servings || 1}`,
        `Maximum Cooking Time: ${timeLimit || 'No limit'}`,
        `Must Include Ingredients: ${include || 'None'}`,
        `Must Exclude Ingredients: ${exclude || 'None'}`,
        `Allergies to Avoid: ${allergies && allergies.length > 0 ? allergies.join(', ') : 'None'}`
      ];
      
      prompt = `
        You are an expert chef. Generate a single, creative recipe based on the user's detailed preferences.
        Your response MUST be a valid JSON object with the structure: { "title": "...", "description": "...", "ingredients": [...], "instructions": [...] }
        User Preferences:
        ${promptDetails.join('\n')}
      `;
    }


    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        const jsonMatch = responseText.match(/{[\s\S]*}/);

        if (!jsonMatch) {

          throw new Error("No valid JSON object found in the AI's response.");
        }
        

        const jsonString = jsonMatch[0];
        

        const recipeJson = JSON.parse(jsonString); 
        
        return res.json(recipeJson);

      } catch (error) {
        if (error.status === 503 && i < maxRetries - 1) {
          await delay((i + 1) * 1000);
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    return res.status(500).json({ message: "Failed to generate recipe." });
  }
};


exports.generateCookingIdeas = async (req, res) => {
  const { ingredients } = req.body; 

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: "Please select at least one ingredient." });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const prompt = `
    Based on the following list of ingredients: ${ingredients.join(', ')}.

    Suggest 5 to 7 different types of dishes or cooking styles that are possible.

    Your response should ONLY be a comma-separated list of these ideas.
    For example: Curry, Stir-fry, Tacos, Soup, Roast, Pasta Dish, Salad
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const ideasText = response.text();
 
    const ideasArray = ideasText.split(',').map(idea => idea.trim());
    
    res.json({ ideas: ideasArray });
  } catch (error) {
    console.error("Error generating cooking ideas:", error);
    res.status(500).json({ message: "Failed to generate ideas from AI." });
  }
};


function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType
    },
  };
}

exports.analyzeImageForDishes = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const imagePart = fileToGenerativePart(req.file.buffer, req.file.mimetype);

    const prompt = `
      Analyze the ingredients in this image. Based ONLY on the visible food items, what are 3 to 5 types of dishes that could be made?
      
      Your response should ONLY be a comma-separated list of these ideas.
      For example: Stir-fry, Curry, Salad, Soup, Tacos
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const ideasText = response.text();
    
    const ideasArray = ideasText.split(',').map(idea => idea.trim());

    res.json({ ideas: ideasArray });
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    res.status(500).json({ message: "Failed to analyze the image." });
  }
};
