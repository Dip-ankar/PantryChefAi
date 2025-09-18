require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');

const app = express();


connectDB();


app.use(cors({
  origin: "https://your-frontend.vercel.app",
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());
require('./src/config/passport')(passport); 


app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));