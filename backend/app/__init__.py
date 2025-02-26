from flask import Flask
from flask_cors import CORS
from . import app

app = Flask(__name__)
CORS(app)

import app.routes
