from requests_html import HTMLSession
import hashlib
import newspaper
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

session = HTMLSession()

def summarize_article(url, summary_sentences=4):
    article = newspaper.Article(url)
    try:
        article.download()
        article.parse()
        article_text = article.text

        parser = PlaintextParser.from_string(article_text, Tokenizer("english"))
        stemmer = Stemmer("english")
        summarizer = LexRankSummarizer(stemmer)
        summarizer.stop_words = get_stop_words("english")

        summary = summarizer(parser.document, summary_sentences)
        summary_text = ' '.join(str(sentence) for sentence in summary)
        return summary_text
    except newspaper.article.ArticleException as e:
        return ""

def generate_article_id(url):
    url_core = url.split('?')[0]
    hash_object = hashlib.sha256(url_core.encode())
    return hash_object.hexdigest()

def scrape_articles(url, scroll_down=2):
    r = session.get(url)
    r.html.render(sleep=1, scrolldown=scroll_down, timeout=30)
    return r.html.find('article')

def get_latest_articles():
    articles1 = scrape_articles('https://news.google.com/search?q=ukraine&hl=en-GB&gl=GB&ceid=GB%3Aen', scroll_down=3)
    articles2 = scrape_articles('https://news.google.com/topics/CAAqLAgKIiZDQkFTRmdvTkwyY3ZNVEZ5Y0dSaWNXcDZjeElGWlc0dFIwSW9BQVAB?hl=en-GB&gl=GB&ceid=GB%3Aen', scroll_down=3)

    articles = articles1 + articles2
    latest_articles = []
    
    base_url = "https://news.google.com"
    for item in articles:
        try:
            newsitem = item.find('a.JtKRv', first=True)
            title = newsitem.text
            link = base_url + newsitem.attrs.get('href').translate({ord('.'): None})
            summary = summarize_article(link, summary_sentences=4)
            latest_articles.append({
                'title': title,
                'link': link,
                'summary': summary
            })
        except:
            pass
        
        if len(latest_articles) >= 3:
            break

    return latest_articles
