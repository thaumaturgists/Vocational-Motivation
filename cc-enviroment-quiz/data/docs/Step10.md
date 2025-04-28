# Flask-SQLAlchemy
Flask-SQLAlchemy is an extension for Flask that adds support for SQLAlchemy, a powerful SQL toolkit and Object-Relational Mapping (ORM) system for Python. It simplifies the integration of SQLAlchemy with Flask applications, making it easier to work with databases.

### Key Features

1. **ORM Support**: Allows you to define your database models as Python classes, making it easier to interact with the database using Python objects.

2. **Session Management**: Provides a session management system that handles transactions and connections to the database.

3. **Querying**: Offers a simple and intuitive way to query the database using Python syntax.

4. **Migrations**: Can be integrated with Flask-Migrate for handling database migrations.

5. **Configuration**: Easy to configure with Flask's configuration system.

### Basic Usage

Here’s a simple example to get you started with Flask-SQLAlchemy:

1. **Install Flask-SQLAlchemy**:
   ```bash
   pip install Flask-SQLAlchemy
   ```

2. **Create a Flask Application**:
   ```python
   from flask import Flask
   from flask_sqlalchemy import SQLAlchemy

   app = Flask(__name__)
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
   db = SQLAlchemy(app)

   class User(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       username = db.Column(db.String(80), unique=True, nullable=False)
       email = db.Column(db.String(120), unique=True, nullable=False)

       def __repr__(self):
           return f'<User {self.username}>'

   @app.route('/')
   def index():
       return "Hello, Flask-SQLAlchemy!"

   if __name__ == '__main__':
       db.create_all()  # Create database tables
       app.run(debug=True)
   ```

### Explanation

- **Configuration**: The database URI is set in the app's configuration. In this example, we are using SQLite.
- **Model Definition**: The `User` class is defined as a model with three fields: `id`, `username`, and `email`.
- **Creating Tables**: `db.create_all()` creates the tables in the database based on the defined models.
- **Running the App**: The Flask app runs in debug mode, allowing you to see changes without restarting the server.

### Querying the Database

You can perform various operations like adding, querying, updating, and deleting records:

```python
# Adding a new user
new_user = User(username='john_doe', email='john@example.com')
db.session.add(new_user)
db.session.commit()

# Querying users
users = User.query.all()  # Get all users
user = User.query.filter_by(username='john_doe').first()  # Get a specific user
```

### Conclusion

Flask-SQLAlchemy is a powerful tool for managing databases in Flask applications. It abstracts much of the complexity of SQLAlchemy while providing a simple interface for common database operations. For more advanced features and configurations, you can refer to the [Flask-SQLAlchemy documentation](https://flask-sqlalchemy.palletsprojects.com/).

# Replacing SQLite with PostgreSQL and setting up Flask-SQLAlchemy
To replace SQLite with PostgreSQL in your Flask application using Flask-SQLAlchemy, you'll need to make several changes to your project. Below are the steps to set up PostgreSQL, including the necessary code modifications and configurations.

### Step 1: Install PostgreSQL

Make sure you have PostgreSQL installed on your machine or use a PostgreSQL service (like AWS RDS, Heroku, etc.). If you're using Docker, you can also run PostgreSQL in a container.

### Step 2: Update `requirements.txt`

You need to add the `psycopg2` package, which is the PostgreSQL adapter for Python. Update your `requirements.txt` as follows:

```plaintext
pytest
Flask
Flask-Cors
Flask-SQLAlchemy
Flask-Migrate
Flask-RESTful
Flask-DebugToolbar
requests
python-dotenv
psycopg2-binary  # Add this line
```

### Step 3: Update `app.py`

Modify the database URI in your `app.py` to connect to PostgreSQL. Replace the SQLite URI with the PostgreSQL connection string. Here’s how you can do it:

```python
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

# Update the SQLALCHEMY_DATABASE_URI for PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://username:password@localhost:5432/mydatabase')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True

# Rest of your code...
```

### Step 4: Update `docker-compose.yml`

If you're using Docker, update your `docker-compose.yml` to include a PostgreSQL service. Here’s an example configuration:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./creation-çaccades
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./creation-çaccades:/usr/src/app
    depends_on:
      - db 
    environment:
      - FLASK_ENV=development
      - DATABASE_URL=postgresql://username:password@db:5432/mydatabase  # Update this line
      - SECRET_KEY=default-secret-key1
      - SECOND_SECRET_KEY=default-secret-key2
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: username  # Set your PostgreSQL username
      POSTGRES_PASSWORD: password  # Set your PostgreSQL password
      POSTGRES_DB: mydatabase  # Set your PostgreSQL database name
    volumes:
      - db_data:/var/lib/postgresql/data  # Persist data

volumes:
  db_data:
```

### Step 5: Create the Database

If you haven't already created the database, you can do so using the following command in your PostgreSQL shell:

```sql
CREATE DATABASE mydatabase;
```

Make sure to replace `mydatabase` with the name you specified in your `docker-compose.yml`.

### Step 6: Run Migrations

After setting up your database, you need to run the migrations to create the necessary tables. You can do this by running the following commands:

1. Start your Docker containers:

   ```bash
   docker-compose up -d
   ```

2. Open a terminal in the backend container:

   ```bash
   docker-compose exec backend bash
   ```

3. Run the migrations:

   ```bash
   flask db init  # Run this only if you haven't initialized migrations yet
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

### Step 7: Test Your Application

Now that everything is set up, you can test your application by sending requests to the `/api/profile` endpoint to create profiles and

# Error: ISSUE
<div style="color: red; font-weight: bold;">
docker-compose exec backend bash
OCI runtime exec failed: exec failed: unable to start container process: exec: "bash": executable file not found in $PATH: unknown
</div>

> If you tried to enter the Docker backend terminal when there is no `bash`, you can use `sh` instead:
```sh
docker-compose exec backend sh
```
#### Error: Another ISSUE:
<div style="color: red; font-weight: bold;">
flask db init
* Tip: There are .env files present. Install python-dotenv to use them.
Error: Could not locate a Flask application. Use the 'flask --app' option, 'FLASK_APP' environment variable, or a 'wsgi.py' or 'app.py' file in the current directory.

Usage: flask [OPTIONS] COMMAND [ARGS]...
Try 'flask --help' for help.

Error: No such command 'db'.
</div>

> If you tried to `flask db init` outside the running Docker container, make sure you are in the Docker terminal:
```sh
/usr/src/app # 
this-is-your-sh-terminal
```
```bash
your-docker-id:/usr/src/app#
this-is-your-bash-terminal
```
# Creating Bash in Docker
The error message you're encountering indicates that the `bash` shell is not available in the Docker container for your `backend` service. This is common when using lightweight base images, such as `python:alpine`, which may not include `bash` by default. Instead, they often include `sh` (the Bourne shell).

### Solution: Use `sh` Instead of `bash`

To access the shell in your Docker container, you can use `sh` instead of `bash`. Here’s how you can do it:

```bash
docker-compose exec backend sh
```

### Example Commands

1. **Start your Docker containers** (if they are not already running):

   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

2. **Access the backend container**:

   ```bash
   docker-compose exec backend sh
   ```

### Additional Notes

- If you prefer to use `bash` and want to have it available in your container, you can modify your `Dockerfile` to install `bash`. Here’s how you can do that if you are using an Alpine-based image:

```dockerfile
# creation-çaccades/Dockerfile
FROM python:alpine

# Install bash
RUN apk add --no-cache bash

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

After modifying the `Dockerfile`, you will need to rebuild your Docker image:

```bash
docker-compose -f docker-compose.yml build
```

Then, you can start your containers again and use `bash`:

```bash
docker-compose -f docker-compose.yml up -d
docker-compose exec backend bash
```

### Conclusion

Using `sh` is the simplest solution if you just need to access the shell. If you need `bash` for specific scripts or commands, consider installing it in your Docker image as shown above. If you have any further questions or need additional assistance, feel free to ask!

# Flash db migrations handled by Docker?
## Using Dockerfile
You can modify your Dockerfile to run the migration commands when the container starts. Here’s how you can do it:

1. **Modify Your Dockerfile**: Add the migration commands to your Dockerfile. You can use an entrypoint script to handle migrations and then start your Flask application.

```dockerfile
# creation-çaccades/Dockerfile
FROM python:alpine

# Install bash (if needed)
RUN apk add --no-cache bash

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Run migrations and then start the app
CMD ["sh", "-c", "flask db upgrade && python app.py"]
```

### Approach 2: Using an Entrypoint Script

You can create an entrypoint script that handles migrations and then starts your application. This is a cleaner approach and allows for more complex logic if needed.

1. **Create an Entrypoint Script**: Create a file named `entrypoint.sh` in your project directory.

```bash
#!/bin/sh

# Run database migrations
flask db upgrade

# Start the Flask application
exec python app.py
```

2. **Make the Script Executable**:

```bash
chmod +x entrypoint.sh
```

3. **Modify Your Dockerfile**: Update your Dockerfile to copy the entrypoint script and set it as the entrypoint.

```dockerfile
# creation-çaccades/Dockerfile
FROM python:alpine

# Install bash (if needed)
RUN apk add --no-cache bash

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]
```

### Approach 3: Using Docker Compose

You can also run migrations as part of your Docker Compose setup. This can be done by using the `command` option in your `docker-compose.yml` file.

1. **Modify Your `docker-compose.yml`**:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./creation-çaccades
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./creation-çaccades:/usr/src/app
    environment:
      - FLASK_ENV=development
      - DATABASE_URL=sqlite:///usr/src/app/profiles.db  # or your PostgreSQL URL
      - USE_POSTGRES=false  # or true if using PostgreSQL
      - SECRET_KEY=your_secret_key_here
      - SECOND_SECRET_KEY=your_second_secret_key_here
    command: sh -c "flask db upgrade && python app.py"  # Run migrations and start the app
```

### Summary

- **Dockerfile**: You can run migration commands directly in the Dockerfile using the `CMD` instruction.
- **Entrypoint Script**: A more flexible approach is to create an entrypoint script that handles migrations and starts the application.
- **Docker Compose**: You can specify the migration command directly in your `docker-compose.yml` file using the `command` option.

### Running Your Application

After setting up any of the above approaches, you can start your application with:

```bash
docker-compose -f docker-compose-quiz.yml up --build
```

This will build your images, run the migrations, and start your Flask application.

> I recomend using the dockerfile

######################### this last part needs to be verified that migrations are being handled inside the docker.