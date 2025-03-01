from flask import jsonify
from app import my_server
from app.ahp import prioritize_bridges
from app.ahp import convert_to_serializable
import json
from app.scraper import get_latest_articles  


@my_server.route("/api/data")
def get_data():
    data = {
        "title": "Rebuild Ukraine with Us",
        "description": "Make a Difference today",
        "links": ["Explore More"]
    }
    return jsonify(data)

@my_server.route("/api/news")
def get_news():
# This API is expensive, so I store the news once a week or so
# Uncomment the code below to fetch news from the API
    # news = get_latest_articles()
    # print(news)

    # try:
    #     with open("app/data/news.json", "w", encoding="utf-8") as news_file:
    #         json.dump(news, news_file, ensure_ascii=False, indent=4)
    #     print("✅ News saved to news.json")
    # except Exception as e:
    #     print("❌ Error writing to news.json:", e)
    # news_json = jsonify(news)
    # return news_json

#Cached News
    with open("app/data/news.json", "r") as news_file:
        data = json.load(news_file)
    return data



@my_server.route("/api/bridges")
def get_all_bridges():
    with open("app/data/bridges.json", "r") as file:
        data = json.load(file)
    return jsonify(data)


@my_server.route("/api/regions/<region_id>")
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

