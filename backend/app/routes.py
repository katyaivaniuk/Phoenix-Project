from flask import jsonify
from app import app
import json

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
    # for idx, article in enumerate(news, start=1):
    #     print(f"Article {idx}:")
    #     print(f"Title       : {article['title']}")
    #     print(f"Summary     : {article['summary']}")
    #     print(f"Link        : {article['link']}")
    #     print(f"Published At: {article['publishedAt']}")
    #     print(f"Sentiment   : {'Positive' if article['sentiment'] > 0 else 'Negative' if article['sentiment'] < 0 else 'Neutral'}")
    #     print(f"Weight      : {article['weight']:.2f}")
    #     print("-" * 50)
    
    return jsonify(news)


@app.route("/api/bridges")
def get_all_bridges():
    with open("app/data/bridges.json", "r") as file:
        data = json.load(file)
    return jsonify(data)


@app.route("/api/regions/<region_id>")
def get_region_data(region_id):
    # Load bridge data
    with open("app/data/bridges.json", "r") as f:
        data = json.load(f)
    
    bridges = [bridge for bridge in data if bridge["Region"].lower() == region_id.lower()]
    
    if not bridges:
        return jsonify({"error": "Region not found"}), 404
    
    region_data = {
        "region_id": region_id,
        "bridges": bridges
    }
    return jsonify(region_data)
