from flask import Flask
from flask_cors import CORS


my_server = Flask(__name__)
CORS(my_server)

