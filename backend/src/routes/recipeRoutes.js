const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const { generateRecipe, generateCookingIdeas, analyzeImageForDishes } = require('../controllers/recipeController');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/generate", generateRecipe);


router.post(
  '/ideas',
  passport.authenticate('jwt', { session: false }),
  generateCookingIdeas
);

router.post(
  '/analyze-image',
  passport.authenticate('jwt', { session: false }),
  upload.single('ingredientImage'), 
  analyzeImageForDishes
);
module.exports = router;