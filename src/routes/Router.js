import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecipePage from "../pages/CreateRecipePage/CreateRecipePage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignupPage from "../pages/SignupPage/SignupPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="recipe/:recipeId" element={<DetailsPage />} />
        <Route path="/recipe/new" element={<CreateRecipePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
