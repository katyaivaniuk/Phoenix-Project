// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchNews, fetchFallbackNews } from './services/apiService';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import News from './components/News/News';
import Projects from './components/Projects/Projects';
import About from './components/About/About';

function App() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const loadNews = async () => {
            try {
                let fetchedNews = await fetchNews();
                if (!fetchedNews || fetchedNews.length === 0) {
                    fetchedNews = await fetchFallbackNews();
                }
                setNews(fetchedNews.slice(0, 3)); // Limit to top 3 articles
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        loadNews();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home news={news} />} /> {/* Pass news as props */}
                    <Route path="news" element={<News news={news} />} /> {/* Pass news as props */}
                    <Route path="projects" element={<Projects />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
