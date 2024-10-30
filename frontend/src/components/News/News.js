import React, { useState, useEffect } from 'react';
import { fetchNews, fetchFallbackNews } from '../../services/apiService';

// Custom hook to fetch news data
const useFetchNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        let fetchedNews = await fetchNews();
        if (!fetchedNews || fetchedNews.length === 0) {
          fetchedNews = await fetchFallbackNews();
        }
        setNews(fetchedNews.slice(0, 3)); // Limit to 3 articles
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    loadNews();
  }, []);

  return news;
};

function News() {
  const news = useFetchNews();

  return (
    <div className="news-section">
      <h2>Latest News</h2>
      <div className="news-container">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-item">
              <img 
                src={article.image || '/images/News.jpeg'}  
                alt={`News ${index + 1}`} 
                className="news-image" 
              />
              <div className="news-content">
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
                <p><strong>Sentiment:</strong> {article.sentiment > 0 ? 'Positive' : article.sentiment < 0 ? 'Negative' : 'Neutral'}</p>
                <p><strong>Published on:</strong> {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            </div>
          ))
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export { useFetchNews };
export default News;
