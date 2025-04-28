 <!-- project_structure.project
```
cc-enviroment-quiz/
└── creation-çaccades/
│    ├── instance/
│    ├── migrations/
│    ├── profile.db/
│    ├── app.py
│    ├── dockerfile
│    ├── models.py
│    ├── package.json
│    ├── questions.json
│    └── requirements.txt (dockerfile uses this)
├── data/
│   └──docs/
├──quiz-app/
│   ├── node_modules (For testing before docker build)
│   ├── public/
│   │   └── index.html (If not here, then in this root)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── main.tsx
│   ├── dockerfile
│   ├── index.html      (Used here for stability)
│   ├── package-lock.json (builds after npm install, Used for testing)
│   ├── package.json
│   ├── requirements.txt       (Here if needed)
│  	│	└── vite, jsx, tsx
│   ├── tsconfig.json
│   └── vite.config.ts (or vite.config.js)
├── venv/
│       └── (Python dev environment)
├── .env
├── .gitignore
├── docker-compose.yml
├── dockerfile (If not here, then not yet)
├── package.json (If not here yet, then not needed)
├── requirements.txt (Here if needed)
└── desktop (Placeholder, reminder to make desktop)

Collaboration File simple Creation
• Effective collaboration without commits.
• Aim: Create Python environment for Node.js operation.
• Prioritize debugging.
``` -->
```py
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
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

secret_keys = os.environ.get('SECRET_KEY', 'afab12c326a35f9344181655aaa51feb04f97a77c8619f75,fee7ec42c62e706c8488c98f00c72d3dd771ae6ff569331c').split(',')
app.config['SECRET_KEY'] = secret_keys[0]
app.config['SECOND_SECRET_KEY'] = secret_keys[1] if len(secret_keys) > 1 else None
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True

@app.route('/keys')
def show_keys():
    return jsonify({
        "first_key": app.config['SECRET_KEY'],
        "second_key": app.config['SECOND_SECRET_KEY']
    })

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
toolbar = DebugToolbarExtension(app)

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
    app.run(host='0.0.0.0', port=5000)
```
```dockerfile
# creation-çaccades/dockerfile
FROM python:alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
WORKDIR /usr/src/app
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt || { echo "Failed to install Python dependencies"; exit 1; }
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```
```py
# creation-çaccades/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f'<Profile {self.name}>'
```
```plaintext
# creation-çaccades/requirements.txt
pytest
Flask
Flask-Cors
Flask-SQLAlchemy
Flask-Migrate
Flask-RESTful
Flask-DebugToolbar
requests
dotenv
```
```yml
# creation-çaccades/docker-compose-quiz.yml
services:
  backend:
    build:
      context: ./creation-çaccades
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./creation-çaccades:/usr/src/app
      - db_data:/usr/src/app/profiles.db
    depends_on:
      - db 
    environment:
      - FLASK_ENV=development
      - SQLALCHEMY_DATABASE_URI=sqlite:////usr/src/app/profiles.db
      - SECRET_KEY=default-secret-key1
      - SECOND_SECRET_KEY=default-secret-key2
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  frontend:
    build:
      context: ./quiz-app
      dockerfile: Dockerfile  # Ensure the filename is capitalized if that's how it's named
    ports:
      - "80:80"  # Map the Vite development server port
    volumes:
      - ./quiz-app:/usr/src/app
    environment:
      - NODE_ENV=development
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  db:
    image: nouchka/sqlite3:latest
    volumes:
      - db_data:/profiles.db

volumes:
  db_data:

secrets:
  secret_key:
    external: true
```