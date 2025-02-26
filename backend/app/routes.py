from flask import jsonify
from . import app
from app.ahp import prioritize_bridges
from app.ahp import convert_to_serializable

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
    return jsonify(news)



@app.route("/api/bridges")
def get_all_bridges():
    with open("app/data/bridges.json", "r") as file:
        data = json.load(file)
    return jsonify(data)


@app.route("/api/regions/<region_id>")
def get_region_data(region_id):
    try:
        with open("app/data/bridges.json", "r") as f:
            data = json.load(f)

        region_bridges = [bridge for bridge in data if bridge["Region"].lower() == region_id.lower()]
        if not region_bridges:
            return jsonify({"error": "Region not found"}), 404

        # Apply AHP prioritization
        region_bridges = prioritize_bridges(region_bridges)
        region_bridges = convert_to_serializable(region_bridges)
        return jsonify(region_bridges)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
