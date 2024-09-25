import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import News from './components/News/News';
import Projects from './components/Projects/Projects';
import About from './components/About/About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="news" element={<News />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
