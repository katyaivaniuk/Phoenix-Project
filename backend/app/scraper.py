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
        'language': 'en',
        'sortBy': 'publishedAt',
        'pageSize': 10,  # Request more articles to filter duplicates
        'apiKey': NEWS_API_KEY
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        articles = response.json().get('articles')

        # Log the API response for debugging
        print("API Response: ", articles)  # Log the raw response to inspect

        latest_articles = []
        seen_urls = set()
        seen_titles = set()  
        seen_descriptions = set() 

        for article in articles:
            url = article['url']
            title = article['title']
            summary = article['description']

            # Avoid duplicates by checking both URL and title
            if url not in seen_urls and title not in seen_titles and summary not in seen_descriptions:
                latest_articles.append({
                    'title': title,
                    'link': url,
                    'summary': article['description'] or "No description available.",
                    'publishedAt': article['publishedAt'],
                    'image': article['urlToImage'] or '/images/default-news.jpeg'
                })
                seen_urls.add(url)
                seen_titles.add(title)  # Add title to the set of seen titles
                seen_descriptions.add(summary)
        
        return latest_articles[:3]  # Limit to 3 unique articles
    else:
        return []
