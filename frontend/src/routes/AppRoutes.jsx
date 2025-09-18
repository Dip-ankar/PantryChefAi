import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "./ProtectedRoute";
import RecipesPage from "../pages/RecipesPage";
import CreativeCookingPage from "../pages/CreativeCookingPage";

import VisualSearchPage from "../pages/VisualSearchPage.jsx";

const AppRoutes = () => {
  const navigate = useNavigate();


  useEffect(() => {

    navigate("/");
  }, []); 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* --- Protected Route --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creative-cooking"
            element={
              <ProtectedRoute>
                <CreativeCookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visual-search"
            element={
              <ProtectedRoute>
                <VisualSearchPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes;
