from flask import jsonify
from app import app
from app.scraper import get_latest_articles  

@app.route("/api/data")
def get_data():
    data = {
        "title": "Rebuild Ukraine with Us",
        "description": "Make a Difference today",
        "links": ["Explore More"]
    }
    return jsonify(data)

@app.route("/api/news")
def get_news():
    news = get_latest_articles()
    
    # Print each article in the terminal
    for idx, article in enumerate(news, start=1):
        print(f"Article {idx}:")
        print(f"Title       : {article['title']}")
        print(f"Summary     : {article['summary']}")
        print(f"Link        : {article['link']}")
        print(f"Published At: {article['publishedAt']}")
        print(f"Sentiment   : {'Positive' if article['sentiment'] > 0 else 'Negative' if article['sentiment'] < 0 else 'Neutral'}")
        print(f"Weight      : {article['weight']:.2f}")
        print("-" * 50)
    
    return jsonify(news)
