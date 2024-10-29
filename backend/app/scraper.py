import requests
import os
from dotenv import load_dotenv
import random
from textblob import TextBlob  # For sentiment analysis
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import json

# Load API key
load_dotenv()
NEWS_API_KEY = os.getenv('NEWS_API_KEY')

# Rotating keywords for diversity
keywords_list = [
    '"Russia-Ukraine war"', 
    '"Russian invasion"', 
    '"conflict in Ukraine"', 
    '"Eastern Europe crisis"'
]

def get_latest_articles():
    url = 'https://newsapi.org/v2/everything'
    keyword = random.choice(keywords_list)  # Randomly choose from keywords
    params = {
        'q': keyword,
        'language': 'en',
        'sortBy': 'publishedAt',
        'pageSize': 20,  # Request more articles for diversity
        'apiKey': NEWS_API_KEY
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return []
    
    articles = response.json().get('articles')
    return filter_and_diversify_articles(articles)

def filter_and_diversify_articles(articles):
    seen_urls = set()
    filtered_articles = []

    for article in articles:
        url = article['url']
        title = article['title']
        description = article['description']
        content = article['content'] or ''

        if url in seen_urls:
            continue

        # Sentiment Analysis to add weight based on sentiment
        sentiment = TextBlob(content).sentiment.polarity

        # Topic Modeling (to ensure diverse topics)
        topic = get_article_topic(content)

        # Apply weighted filtering logic
        weight = calculate_weight(sentiment, topic)
        
        # Convert all data to JSON-compatible types
        article_data = {
            'title': str(title),
            'link': str(url),
            'summary': str(description or "No description available."),
            'publishedAt': str(article['publishedAt']),
            'image': str(article.get('urlToImage', '/images/default-news.jpeg')),
            'weight': float(weight),          # Convert weight to float
            'sentiment': float(sentiment),    # Convert sentiment to float
            'topic': int(topic)               # Convert topic to int
        }
        seen_urls.add(url)
        filtered_articles.append(article_data)

    # Sort by weight to ensure diversity and limit to top articles
    filtered_articles.sort(key=lambda x: x['weight'], reverse=True)
    return filtered_articles[:3]


def calculate_weight(sentiment, topic):
    # Calculate weight based on sentiment and topic
    # For simplicity, neutral sentiment (close to 0) gets a higher weight
    sentiment_weight = 1 - abs(sentiment)
    topic_weight = 1 / (1 + topic)  # Lower topic index means more relevance
    return sentiment_weight * topic_weight

def get_article_topic(content):
    # Simplified topic modeling for small data sets
    vectorizer = CountVectorizer(max_features=10, stop_words='english')
    lda = LatentDirichletAllocation(n_components=5, random_state=42)
    
    content_matrix = vectorizer.fit_transform([content])
    lda.fit(content_matrix)
    
    topic = lda.transform(content_matrix)[0].argmax()  # Extract primary topic index
    return topic

# Example execution
if __name__ == "__main__":
    latest_articles = get_latest_articles()
    for article in latest_articles:
        print(json.dumps(article, indent=2))
