import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProjectsPage from './components/ProjectsPage';
import NodeDeveloperPage from './components/NodeDeveloperPage';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};


const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="pt-20"> {/* Fix: Added padding-top to prevent content from being hidden by the fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/node-developer-for-hire" element={<NodeDeveloperPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;