import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType, useLocation as useRRLocation, useNavigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import NotFoundPage from './components/NotFoundPage';
// Removed dropdown pages

const ScrollManager: React.FC = () => {
  const location = useLocation() as any;

  useEffect(() => {
    const targetId: string | undefined = location.state?.scrollTarget;
    if (targetId) {
      // Delay to ensure home is rendered
      setTimeout(() => {
        const el = document.getElementById(targetId.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Clear state by replacing history entry
        window.history.replaceState({}, '', window.location.pathname);
      }, 0);
      return;
    }

    // Default behavior: scroll to top on path change
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};


const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Router>
        <ScrollManager />
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <SpeedInsights />
      </Router>
    </div>
  );
};

export default App;