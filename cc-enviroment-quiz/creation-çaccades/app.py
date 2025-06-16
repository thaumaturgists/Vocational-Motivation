# creation-çaccades/app.py
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_debugtoolbar import DebugToolbarExtension
from models import db, Profile
from dotenv import load_dotenv
# Configuration
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

secret_keys = os.environ.get('SECRET_KEY', '0aa1eae0f95a9ac1df80ddb23b5f8d419c577efa328500d9,35f5a5b5b79102103b9d2f51b0c063b40df6a11efc9c5840').split(',')
app.config['SECRET_KEY'] = secret_keys[0]  # Use the first key for the Flask app's SECRET_KEY

# Example of using the second key for some other purpose
app.config['SECOND_SECRET_KEY'] = secret_keys[1] if len(secret_keys) > 1 else None  # Safely access the second key



# Choose database based on environment variable
if os.environ.get('USE_POSTGRES', 'false').lower() == 'true':
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://username:password@localhost:5432/mydatabase')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True

# Example of using the second key for some other purpose
@app.route('/keys')
def show_keys():
    return jsonify({
        "first_key": app.config['SECRET_KEY'],
        "second_key": app.config['SECOND_SECRET_KEY']
    })

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
toolbar = DebugToolbarExtension(app)

# Enable logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
@app.route('/')
def home():
    return "Creation Profile Cards App is Running!"

@app.route('/api/profile', methods=['POST'])
def create_profile():
    try:
        data = request.json
        if data is None or 'name' not in data or 'email' not in data:
            app.logger.error("Invalid JSON data provided")
            return jsonify({"error": "Invalid JSON data provided"}), 400
        
        # Create a new profile
        new_profile = Profile(name=data.get('name'), email=data.get('email'))
        db.session.add(new_profile)
        db.session.commit()
        
        app.logger.info(f"Profile created: {new_profile}")
        return jsonify({"message": "Profile created", "data": {"name": new_profile.name, "email": new_profile.email}}), 201
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad Request"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Ensured compatibility with Docker networking
