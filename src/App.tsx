﻿import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PasswordModal from "@/components/PasswordModal/PasswordModal";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PortfolioPage from "@/pages/PortfolioPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";

function AppContent() {
  const location = useLocation();
  if (location.hash.startsWith('#!/')) {
    window.location.replace(location.hash.substring(2));
    return null;
  }
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="grain-overlay" />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <PasswordModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
