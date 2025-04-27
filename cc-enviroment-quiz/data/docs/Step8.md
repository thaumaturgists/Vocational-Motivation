Here's a simple example of a Flask application that incorporates the `flask_debugtoolbar`, `flask_sqlalchemy`, `flask_migrate`, and `flask_restful` libraries, along with error handling. This example will also include a basic setup for SQLAlchemy and a migration setup using Flask-Migrate.

### Directory Structure
```
/your_project
    ├── app.py
    ├── models.py
    ├── requirements.txt
    └── migrations/
```

### `requirements.txt`
Make sure to include the necessary packages in your `requirements.txt` file:
```
Flask
Flask-Cors
Flask-SQLAlchemy
Flask-Migrate
Flask-RESTful
Flask-DebugToolbar
requests
```

### `models.py`
Create a simple model for demonstration purposes:
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Profile {self.name}>'
```

### `app.py`
Here’s the main application code:
```python
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_debugtoolbar import DebugToolbarExtension
from models import db, Profile

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False  # Disable redirect interception
app.debug = True

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
        if data is None:
            app.logger.error("No JSON data provided")
            return jsonify({"error": "No JSON data provided"}), 400
        
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
```

### Running the Application
1. **Install Dependencies**: Run `pip install -r requirements.txt` to install the necessary packages.
2. **Initialize the Database**: Run the following commands in your terminal:
   ```bash
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```
3. **Start the Application**: Run `python app.py` to start the Flask application.

### Testing the API
You can test the `/api/profile` endpoint using a tool like Postman or curl. Here’s an example of a curl command to create a profile:
```bash
curl -X POST http://localhost:5000/api/profile -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Error Handling
The application includes error handling for bad requests (HTTP 400) and general exceptions. If a request is made without JSON data, it will return a 400 error with a relevant message. If any other error occurs during profile creation, it will return a 500 error.

This setup provides a simple yet functional Flask application with debugging, database integration, and error handling.

# Docker Database Migrations
To modify your Dockerfile to handle database migrations using Flask-Migrate, you can create an entrypoint script that will run the necessary Flask commands before starting the application. This way, you ensure that the database is initialized and migrated every time the container starts.

Here’s how you can do it:

### Updated Dockerfile
```dockerfile
# Base image for Python
FROM python:alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7

# Set the working directory
WORKDIR /usr/src/app

# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# Copy requirements.txt and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt || { echo "Failed to install Python dependencies"; exit 1; }

# Copy the rest of the application code
COPY . .

# Create an entrypoint script to handle migrations
RUN echo '#!/bin/sh\nflask db init || true\nflask db migrate -m "Initial migration." || true\nflask db upgrade' > /usr/src/app/entrypoint.sh && \
    chmod +x /usr/src/app/entrypoint.sh

# Expose the application port (change if your app uses a different port)
EXPOSE 5000

# Command to run the entrypoint script and then the application
CMD ["sh", "/usr/src/app/entrypoint.sh", "&&", "python", "app.py"]
```

### Explanation of Changes
1. **Entrypoint Script**: 
   - An entrypoint script (`entrypoint.sh`) is created that runs the necessary Flask commands to initialize the database and apply migrations.
   - The `|| true` part allows the script to continue even if the `flask db init` command fails (for example, if the database has already been initialized).

2. **CMD Instruction**: 
   - The `CMD` instruction is modified to run the entrypoint script first and then start the Flask application. Note that the `&&` operator is used to ensure that the application only starts if the entrypoint script runs successfully.

### Building and Running the Docker Container
1. **Build the Docker Image**:
   ```bash
   docker build -t your_image_name .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 5000:5000 your_image_name
   ```

### Note
- Make sure that your Flask application is configured to connect to the database correctly. If you're using SQLite, the database file will be created in the working directory. If you're using another database (like PostgreSQL or MySQL), ensure that the connection string in your Flask app is set up correctly.
- If you want to persist the database across container restarts, consider using Docker volumes. You can add a volume to your `docker run` command like this:
  ```bash
  docker run -p 5000:5000 -v your_volume_name:/usr/src/app/profiles.db your_image_name
  ```
- Replace `your_volume_name` with a name for your Docker volume.

Your `docker-compose.yml` file looks mostly fine, but there are a few considerations and potential updates you might want to make, especially regarding the backend service to ensure it works seamlessly with the updated Dockerfile and entrypoint script. Here’s an updated version with some comments:

### Updated `docker-compose.yml`
```yaml
services:
  backend:
    build:
      context: ./creation-profile-cards
      dockerfile: Dockerfile  # Ensure the filename is correct (case-sensitive)
    ports:
      - "5000:5000"  # Map the backend port
    volumes:
      - ./creation-profile-cards:/usr/src/app  # Optional: for live reloading
    environment:
      - FLASK_ENV=development  # Set the Flask environment to development
      - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db  # Ensure the database URI is set correctly
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  frontend:
    build:
      context: ./quiz-app
      dockerfile: Dockerfile  # Ensure the filename is correct (case-sensitive)
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
```

### Key Considerations
1. **Dockerfile Name**: Ensure that the Dockerfile name is correctly specified. Docker is case-sensitive, so if your Dockerfile is named `Dockerfile`, make sure it is referenced as such.

2. **Database URI**: If you are using SQLite, you may want to set the `SQLALCHEMY_DATABASE_URI` environment variable in the `backend` service to ensure that your Flask application knows where to find the database. Adjust the URI according to your database setup.

3. **Volumes**: The volume mapping for the backend service allows for live reloading during development. This means that changes made to your local files will be reflected in the container without needing to rebuild it. If you want to persist the database file across container restarts, consider using a named volume instead of a bind mount for the database file.

4. **Environment Variables**: Ensure that any other necessary environment variables for your application are included in the `environment` section.

### Running the Docker Compose
To build and run your services using Docker Compose, you can use the following command:
```bash
docker-compose up --build
```
This command will build the images and start the containers. The `--build` flag ensures that any changes in the Dockerfile or application code are reflected in the new build.

### Stopping the Services
To stop the services, you can use:
```bash
docker-compose down
```

This will stop and remove the containers, but the volumes will persist unless you specify the `-v` flag to remove them as well.

# What if I have no sqlite set up yet?
If you haven't set up SQLite or any other database yet, you can still run your Flask application using SQLite as a lightweight, file-based database. SQLite is included with Python, so you don't need to install any additional database server. Here’s how to set it up in your Flask application and Docker environment:

### Step 1: Update Your Flask Application
Make sure your Flask application is configured to use SQLite. In your `app.py`, you should have a line that sets the SQLAlchemy database URI. If you haven't done this yet, you can add it as follows:

```python
# app.py
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
```

This line tells SQLAlchemy to use a SQLite database stored in a file named `profiles.db` in the current working directory.

### Step 2: Update Your Dockerfile
Your Dockerfile should already be set up to create the database file when the application runs. The entrypoint script will handle the database initialization and migration commands.

### Step 3: Update Your `docker-compose.yml`
In your `docker-compose.yml`, you can specify the database URI as an environment variable, but since you're using SQLite, it's not strictly necessary. However, for clarity and to ensure that your application knows where to find the database, you can add it:

```yaml
services:
  backend:
    build:
      context: ./creation-profile-cards
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./creation-profile-cards:/usr/src/app  # For live reloading
      - db_data:/usr/src/app/profiles.db  # Persist the SQLite database
    environment:
      - FLASK_ENV=development
      - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db  # Optional for clarity
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  frontend:
    build:
      context: ./quiz-app
      dockerfile: Dockerfile
    ports:
      - "80:80"
    volumes:
      - ./quiz-app:/usr/src/app
    environment:
      - NODE_ENV=development
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

volumes:
  db_data:  # Define a named volume for the SQLite database
```

### Step 4: Build and Run Your Application
1. **Build the Docker Images**:
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**:
   After the containers are up and running, you can access your Flask application at `http://localhost:5000`.

### Step 5: Verify Database Creation
When you run the application for the first time, the entrypoint script will execute the `flask db init`, `flask db migrate`, and `flask db upgrade` commands. This will create the `profiles.db` file in the specified directory.

### Step 6: Check the Database
You can check if the database file was created successfully by looking in the `creation-profile-cards` directory. You can also use a SQLite browser tool or command-line tool to inspect the contents of the `profiles.db` file.

### Summary
Using SQLite is a great way to get started with a database in your Flask application without needing to set up a separate database server. The above steps will help you set up your application to use SQLite effectively within a Docker environment. If you later decide to switch to a more robust database system (like PostgreSQL or MySQL), you can update the database URI and install the necessary database drivers in your `requirements.txt`.

## err ISSUE:
  <div style="color: red; font-weight: bold;"> backend-1   | RuntimeError: The Flask-DebugToolbar requires the 'SECRET_KEY' config var to be set</div>
The error message you're encountering indicates that the Flask-DebugToolbar requires a `SECRET_KEY` to be set in your Flask application configuration. The `SECRET_KEY` is used by Flask for various cryptographic operations, including session management and CSRF protection.

### Step 1: Set the `SECRET_KEY`
You can set the `SECRET_KEY` in your Flask application configuration. Here’s how to do it:

1. **Update your `app.py`**:
   Add a line to set the `SECRET_KEY` in your Flask app configuration. You can use a hardcoded string for development purposes, but for production, you should generate a random key and keep it secret.

```python
# app.py
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Replace with a strong random key
```

### Example of a Strong Random Key
You can generate a strong random key using Python:

```python
import os
print(os.urandom(24).hex())
```

This will give you a random string that you can use as your `SECRET_KEY`.

### Step 2: Update Your `docker-compose.yml`
If you want to set the `SECRET_KEY` as an environment variable in your `docker-compose.yml`, you can do so like this:

```yaml
services:
  backend:
    build:
      context: ./creation-profile-cards
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./creation-profile-cards:/usr/src/app  # For live reloading
      - db_data:/usr/src/app/profiles.db  # Persist the SQLite database
    environment:
      - FLASK_ENV=development
      - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db  # Optional for clarity
      - SECRET_KEY=your_secret_key_here  # Set the secret key here
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  frontend:
    build:
      context: ./quiz-app
      dockerfile: Dockerfile
    ports:
      - "80:80"
    volumes:
      - ./quiz-app:/usr/src/app
    environment:
      - NODE_ENV=development
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

volumes:
  db_data:  # Define a named volume for the SQLite database
```

To set the `SECRET_KEY` as an environment variable in your `docker-compose.yml`, you need to generate the key first and then use its value in the `environment` section. You cannot directly use `os` in the `docker-compose.yml` file; instead, you should generate the key in Python, copy the generated value, and then paste it into your `docker-compose.yml`.

### Step-by-Step Instructions

1. **Generate the Secret Key**:
   Run the following Python code in a Python shell or script to generate a random secret key:

   ```python
   import os
   print(os.urandom(24).hex())
   ```

   This will output a random hexadecimal string, which you can use as your secret key.

2. **Update Your `docker-compose.yml`**:
   Once you have the generated secret key, you can set it in your `docker-compose.yml` like this:

   ```yaml
   services:
     backend:
       build:
         context: ./creation-profile-cards
         dockerfile: Dockerfile
       ports:
         - "5000:5000"
       volumes:
         - ./creation-profile-cards:/usr/src/app  # For live reloading
         - db_data:/usr/src/app/profiles.db  # Persist the SQLite database
       environment:
         - FLASK_ENV=development
         - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db  # Optional for clarity
         - SECRET_KEY=your_generated_secret_key_here  # Replace with the generated key
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "5"

     frontend:
       build:
         context: ./quiz-app
         dockerfile: Dockerfile
       ports:
         - "80:80"
       volumes:
         - ./quiz-app:/usr/src/app
       environment:
         - NODE_ENV=development
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "5"

   volumes:
     db_data:  # Define a named volume for the SQLite database
   ```

   Replace `your_generated_secret_key_here` with the actual key you generated.

3. **Access the Environment Variable in Your Flask Application**:
   In your Flask application, you can access the `SECRET_KEY` environment variable like this:

   ```python
   import os
   from flask import Flask

   app = Flask(__name__)

   # Set the secret key from the environment variable
   app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'default_secret_key')  # Fallback to a default key if not set

   @app.route('/')
   def home():
       return "Hello, World!"

   if __name__ == '__main__':
       app.run(debug=True)
   ```

### Summary
- Generate the secret key using Python and copy the output.
- Set the `SECRET_KEY` in your `docker-compose.yml` using the generated value.
- Access the `SECRET_KEY` in your Flask application using `os.environ.get()`. 

This approach ensures that your application has a secure and consistent secret key for session management and other cryptographic operations.

# How do I use this in the yml?
You cannot directly execute Python code like `print(os.urandom(24).hex())` within a `docker-compose.yml` file. Instead, you need to generate the secret key using Python in a separate script or interactive session, then copy the generated key and paste it into your `docker-compose.yml`.

### Step-by-Step Instructions to Generate and Use the Secret Key

1. **Generate the Secret Key**:
   Open a Python shell or create a small Python script to generate the secret key. You can do this in your terminal or command prompt:

   ```python
   import os
   print(os.urandom(24).hex())
   ```

   When you run this code, it will output a random hexadecimal string that you can use as your secret key. For example, it might output something like:

   ```
   3f5b8e1c4e1f4c3b8e1c4e1f4c3b8e1c
   ```

2. **Copy the Generated Key**:
   Copy the output from the previous step. This is your secret key.

3. **Update Your `docker-compose.yml`**:
   Open your `docker-compose.yml` file and set the `SECRET_KEY` environment variable using the generated key. Here’s how you can do it:

   ```yaml
   services:
     backend:
       build:
         context: ./creation-profile-cards
         dockerfile: Dockerfile
       ports:
         - "5000:5000"
       volumes:
         - ./creation-profile-cards:/usr/src/app  # For live reloading
         - db_data:/usr/src/app/profiles.db  # Persist the SQLite database
       environment:
         - FLASK_ENV=development
         - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db  # Optional for clarity
         - SECRET_KEY=3f5b8e1c4e1f4c3b8e1c4e1f4c3b8e1c  # Replace with your generated key
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "5"

     frontend:
       build:
         context: ./quiz-app
         dockerfile: Dockerfile
       ports:
         - "80:80"
       volumes:
         - ./quiz-app:/usr/src/app
       environment:
         - NODE_ENV=development
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "5"

   volumes:
     db_data:  # Define a named volume for the SQLite database
   ```

   Replace `3f5b8e1c4e1f4c3b8e1c4e1f4c3b8e1c` with the actual key you generated.

4. **Access the Environment Variable in Your Flask Application**:
   In your Flask application, you can access the `SECRET_KEY` environment variable like this:

   ```python
   import os
   from flask import Flask

   app = Flask(__name__)

   # Set the secret key from the environment variable
   app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'default_secret_key')  # Fallback to a default key if not set

   @app.route('/')
   def home():
       return "Hello, World!"

   if __name__ == '__main__':
       app.run(debug=True)
   ```

### Summary
- **Generate the secret key** using Python and copy the output.
- **Paste the generated key** into your `docker-compose.yml` under the `environment` section for the `backend` service.
- **Access the key** in your Flask application using `os.environ.get()`.

This method ensures that your application has a secure and consistent secret key for session management and other cryptographic operations.

## Key Fun
It looks like you're trying to set the `SECRET_KEY` environment variable in your `docker-compose.yml` file, but the syntax you used is incorrect. The `SECRET_KEY` should be a single string, not a tuple or a list. If you want to use multiple keys, you should choose one or concatenate them into a single string.

### Correcting the `docker-compose.yml`

Here’s how you can properly set the `SECRET_KEY` in your `docker-compose.yml`:

1. **Single Key**: If you want to use just one key, it should look like this:

```yaml
environment:
  - FLASK_ENV=development
  - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
  - SECRET_KEY=f0ea3269c96c83e88bde11862907f321c608857e3f2f103c  # Use a single key
```

2. **Multiple Keys**: If you want to use multiple keys, you can concatenate them into a single string, separated by a character (like a comma or a space), but you will need to handle this in your Flask application. For example:

```yaml
environment:
  - FLASK_ENV=development
  - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
  - SECRET_KEY='f0ea3269c96c83e88bde11862907f321c608857e3f2f103c,58bfc44f6042527bd6a3bf20de4a00dc4bab293669e3462e'  # Concatenated keys
```

### Accessing the Secret Key in Your Flask Application

If you choose to concatenate the keys, you will need to split them in your Flask application. Here’s how you can do that:

```python
import os
from flask import Flask

app = Flask(__name__)

# Get the secret key from the environment variable
secret_keys = os.environ.get('SECRET_KEY', 'default_secret_key').split(',')
app.config['SECRET_KEY'] = secret_keys[0]  # Use the first key or handle as needed

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
```

### Summary
- **Use a single key** for the `SECRET_KEY` in your `docker-compose.yml` for simplicity.
- If you want to use multiple keys, concatenate them into a single string and handle them appropriately in your Flask application.
- Make sure to remove any quotes around the key in the `docker-compose.yml` unless you are using special characters that require them. 

Here’s the final version of the relevant section in your `docker-compose.yml`:

```yaml
environment:
  - FLASK_ENV=development
  - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
  - SECRET_KEY=f0ea3269c96c83e88bde11862907f321c608857e3f2f103c  # Use a single key
```

Or, if you want to use multiple keys:

```yaml
environment:
  - FLASK_ENV=development
  - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
  - SECRET_KEY='f0ea3269c96c83e88bde11862907f321c608857e3f2f103c,58bfc44f6042527bd6a3bf20de4a00dc4bab293669e3462e'  # Concatenated keys
```

# 2 Keys!
If you want to use two keys from the `SECRET_KEY` environment variable in your Flask application, you can retrieve both keys, split them, and then use them as needed. Below is an example of how to do this in your `app.py`.

### Example `app.py` Using Two Keys

```python
import os
from flask import Flask

app = Flask(__name__)

# Get the secret keys from the environment variable
# Split the keys by comma
secret_keys = os.environ.get('SECRET_KEY', 'default_key1,default_key2').split(',')

# Use the first key for the Flask app's SECRET_KEY
app.config['SECRET_KEY'] = secret_keys[0]  # You can choose to use the first key or implement your logic

# Example of using the second key for some other purpose
second_key = secret_keys[1] if len(secret_keys) > 1 else None  # Safely access the second key

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/keys')
def show_keys():
    return {
        "first_key": app.config['SECRET_KEY'],
        "second_key": second_key
    }

if __name__ == '__main__':
    app.run(debug=True)
```

### Explanation
1. **Retrieving the Keys**:
   - The `SECRET_KEY` environment variable is retrieved and split into a list of keys using `split(',')`.
   - The first key is assigned to `app.config['SECRET_KEY']`, which is used by Flask for session management and other cryptographic operations.
   - The second key is accessed safely, checking if it exists in the list.

2. **Routes**:
   - The `/` route returns a simple greeting.
   - The `/keys` route returns a JSON response showing both the first and second keys. This is just for demonstration purposes; you can modify this as needed.

### Setting Up Your `docker-compose.yml`

Make sure your `docker-compose.yml` is set up to provide the `SECRET_KEY` environment variable with both keys:

```yaml
services:
  backend:
    build:
      context: ./creation-profile-cards
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./creation-profile-cards:/usr/src/app  # For live reloading
      - db_data:/usr/src/app/profiles.db  # Persist the SQLite database
    environment:
      - FLASK_ENV=development
      - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
      #- SECRET_KEY='default_key1,default_key2'  # Concatenated keys
      - SECRET_KEY='f0ea3269c96c83e88bde11862907f321c608857e3f2f103c,58bfc44f6042527bd6a3bf20de4a00dc4bab293669e3462e'  # Concatenated keys
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  frontend:
    build:
      context: ./quiz-app
      dockerfile: Dockerfile
    ports:
      - "80:80"
    volumes:
      - ./quiz-app:/usr/src/app
    environment:
      - NODE_ENV=development
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

volumes:
  db_data:  # Define a named volume for the SQLite database
```

### Summary
- The `app.py` file retrieves two keys from the `SECRET_KEY` environment variable and uses the first key for the Flask application.
- The second key can be used for other purposes as needed.
- Ensure that your `docker-compose.yml` correctly sets the `SECRET_KEY` environment variable with both keys concatenated. 

This setup allows you to manage multiple keys effectively within your Flask application.