// frontend/src/App.js
import './components/Home/Home.css';  // Adjust the path based on where you placed the CSS file
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home'; // Component that will replicate the main content

function App() {
  return (
    <Router>
      <header>
        <div className="top-bar">
          <div className="logo-container">
            <img src="/images/Logo.png" alt="Phoenix Ukraine Logo" className="logo" /> {/* Add the correct path to your image */}
            <h1 className="site-title">Phoenix Ukraine</h1>
          </div>
        </div>
        <div className="menu-bar">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes if needed */}
        </Routes>
      </main>

      <footer>
        {/* Add footer content if needed */}
      </footer>
    </Router>
  );
}

export default App;
