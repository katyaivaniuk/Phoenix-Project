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
    return jsonify(news)
