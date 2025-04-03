// News.js
import React from 'react';

function News({ news }) {
  return (
    <div className="news-section">
      <h2>Latest News</h2>
      <div className="news-container">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-item">
            <img
              src={article.image}
              alt={`News ${index + 1}`}
              className="news-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/News.jpeg';
              }}
            />

              <div className="news-content">
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
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

export default News;
