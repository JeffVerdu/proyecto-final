import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/Index";
import DocsPage from "@/pages/Docs";
import PricingPage from "@/pages/Pricing";
import BlogPage from "@/pages/Blog";
import AboutPage from "@/pages/About";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route path="/producto/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
