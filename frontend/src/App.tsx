import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/Index";
import DocsPage from "@/pages/Docs";
import PricingPage from "@/pages/Pricing";
import BlogPage from "@/pages/Blog";
import AboutPage from "@/pages/About";
import Profile from "@/pages/Profile";
import GalleryPage from "@/pages/Gallery";
import CreatePostPage from "@/pages/CreatePost";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<GalleryPage />} path="/gallery" />
      <Route element={<CreatePostPage />} path="/post" />
    </Routes>
  );
}

export default App;
