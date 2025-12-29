import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import SmoothScrolling from './components/SmoothScrolling';
import './index.css';

// Scroll handling
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <Router>
      <SmoothScrolling>
        <ScrollHandler />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="py-8 text-center text-text-muted text-sm border-t border-white/5 bg-bg">
          <p>&copy; {new Date().getFullYear()} NeoFelis. All rights reserved.</p>
        </footer>
      </SmoothScrolling>
    </Router>
  );
};

export default App;
