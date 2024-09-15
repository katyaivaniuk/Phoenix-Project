from flask import jsonify
from app import app

@app.route("/api/data")
def get_data():
    data = {
        "title": "Rebuild Ukraine with Us",
        "description": "Make a Difference Today",
        "links": ["Home", "News", "Projects", "About"]
    }
    return jsonify(data)
