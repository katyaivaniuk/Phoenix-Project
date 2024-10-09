import requests
import os
from dotenv import load_dotenv

# Load API key from environment variables
load_dotenv()
NEWS_API_KEY = os.getenv('NEWS_API_KEY')  # Store your API key in a .env file for security

def get_latest_articles():
    url = 'https://newsapi.org/v2/everything'
    params = {
        'q': '"Russia-Ukraine war" OR "Russian invasion" OR "War in Ukraine"',
        'language': 'en',        # Language of articles
        'sortBy': 'publishedAt', # Sort by most recent
        'pageSize': 3,           # Limit to 3 articles
        'apiKey': NEWS_API_KEY   
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        articles = response.json().get('articles')
        latest_articles = []

        for article in articles:
            latest_articles.append({
                'title': article['title'],
                'link': article['url'],
                'summary': article['description'] or "No description available.",
                'publishedAt': article['publishedAt'],  # Publication date
                'image': article['urlToImage'] or '/images/default-news.jpeg'  # Use a default image if none is provided
            })
        
        return latest_articles
    else:
        return []
