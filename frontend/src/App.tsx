import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/Index";
import DocsPage from "@/pages/Docs";
import PricingPage from "@/pages/Pricing";
import BlogPage from "@/pages/Blog";
import AboutPage from "@/pages/About";
import ProductPage from "./pages/ProductPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import GalleryPage from "@/pages/Gallery";
import CreatePostPage from "@/pages/CreatePost";
import CategoryPage from "./pages/CategoryPage";

import ProtectedRoute from "@/config/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route path="/producto/:id" element={<ProductPage />} />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route
        element={<CategoryPage key={location.pathname} />}
        path="/categories/:category"
      />

      {/* Protegidas */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <GalleryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
