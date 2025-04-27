# Place dotenv in requirements.txt!
```requirements.txt
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
>Docker is installing for us!

Protecting sensitive information such as API keys, database credentials, and secret keys is crucial for maintaining the security of your application. Here are several best practices to help you protect these keys in your Flask application:

### 1. Use Environment Variables
Store sensitive keys in environment variables instead of hardcoding them in your source code. This way, they are not exposed in your codebase.

- **Using a `.env` File**: You can use a `.env` file to store your environment variables locally. Use a library like `python-dotenv` to load these variables into your application.

  **Example `.env` file**:
  ```plaintext
  SECRET_KEY=f0ea3269c96c83e88bde11862907f321c608857e3f2f103c,58bfc44f6042527bd6a3bf20de4a00dc4bab293669e3462e
  FLASK_ENV=development
  SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
  ```

  **Loading the `.env` file in your `app.py`**:
  ```python
  from dotenv import load_dotenv
  import os

  load_dotenv()  # Load environment variables from .env file

  app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
  ```

### 2. Use a Configuration Management Tool
For production environments, consider using a configuration management tool or service that securely manages your secrets. Some popular options include:

- **AWS Secrets Manager**: A service to store and manage sensitive information.
- **HashiCorp Vault**: A tool for securely accessing secrets.
- **Azure Key Vault**: A cloud service for securely storing and accessing secrets.

### 3. Use Docker Secrets
If you are deploying your application using Docker Swarm, you can use Docker Secrets to manage sensitive data. This allows you to store and manage sensitive information securely.

**Example**:
1. Create a secret:
   ```bash
   echo "f0ea3269c96c83e88bde11862907f321c608857e3f2f103c" | docker secret create secret_key -
   ```

2. Reference the secret in your `docker-compose.yml`:
   ```yaml
   services:
     backend:
       ...
       secrets:
         - secret_key

   secrets:
     secret_key:
       external: true
   ```

3. Access the secret in your application:
   ```python
   with open('/run/secrets/secret_key') as f:
       app.config['SECRET_KEY'] = f.read().strip()
   ```

### 4. Use Git Ignore
Ensure that any files containing sensitive information (like `.env` files) are included in your `.gitignore` file to prevent them from being committed to your version control system.

### 5. Limit Access
- **Restrict Access**: Limit access to the environment variables and secrets to only those who need it. Use role-based access control (RBAC) where possible.
- **Use IAM Roles**: If using cloud services, use IAM roles to control access to secrets.

### 6. Rotate Keys Regularly
Regularly rotate your keys and secrets to minimize the risk of exposure. Implement a process for updating your application with new keys without downtime.

### 7. Monitor and Audit
- **Logging**: Implement logging to monitor access to sensitive information.
- **Audit**: Regularly audit your application and infrastructure for security vulnerabilities.

### 8. Use HTTPS
Always use HTTPS to encrypt data in transit, including API keys and other sensitive information sent over the network.

### Summary
By following these best practices, you can significantly reduce the risk of exposing sensitive keys and credentials in your Flask application. Always prioritize security and stay informed about the latest security practices and tools.

# 2 Keys in .env!
If you want to use two keys in your `.env` file and manage them in your application, you can do so by defining both keys in the `.env` file and then accessing them in your code. Below is an example of how to set this up.

### Example of a `.env` File with Two Keys

```plaintext
# .env file
SECRET_KEY=my_first_secret_key
SECOND_SECRET_KEY=my_second_secret_key
```

### Accessing the Keys in Your Application

You can load these keys in your Flask application using the `python-dotenv` library. Here’s how you can do it:

```python
import os
from dotenv import load_dotenv
from flask import Flask

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Access the keys from the environment variables
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SECOND_SECRET_KEY'] = os.environ.get('SECOND_SECRET_KEY')

@app.route('/keys')
def show_keys():
    return {
        "first_key": app.config['SECRET_KEY'],
        "second_key": app.config['SECOND_SECRET_KEY']
    }

if __name__ == '__main__':
    app.run(debug=True)
```

### Explanation

1. **.env File**: 
   - You define two keys: `SECRET_KEY` and `SECOND_SECRET_KEY`. These can be used for different purposes in your application, such as session management, encryption, or other security-related tasks.

2. **Loading Environment Variables**:
   - The `load_dotenv()` function loads the variables from the `.env` file into the environment, making them accessible via `os.environ`.

3. **Accessing Keys**:
   - You access the keys using `os.environ.get('KEY_NAME')` and assign them to your Flask app's configuration.

4. **Route to Display Keys**:
   - The `/keys` route returns a JSON response containing both keys. This is just for demonstration purposes; in a real application, you would not expose secret keys like this.

### Security Considerations

- **Do Not Expose Keys**: In a production environment, avoid exposing sensitive keys through API endpoints. The example above is for demonstration only.
- **Use Strong Keys**: Ensure that your keys are strong and not easily guessable.
- **Environment-Specific Configurations**: You can have different `.env` files for different environments (development, testing, production) to manage configurations appropriately.

### Summary

Using two keys in your application is straightforward. You define them in your `.env` file, load them into your application, and access them as needed. This approach helps keep sensitive information out of your source code and allows for easier configuration management.

# err Issues App.py
It looks like you're trying to configure your Flask application to use two secret keys, but there are a few issues in your code snippet. Specifically, you have two definitions of the `/keys` route, and you're trying to access the second key in two different ways. Below, I'll provide a corrected version of your code and explain the changes.

### Corrected Code Snippet

```python
import os
from flask import Flask, jsonify
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configuration
secret_keys = os.environ.get('SECRET_KEY', 'b6970cceef32ab8f53a934157f4d3eff4879b08d05d3a776,6860f98b167c8300e7f3899c8e432b4d6c6752b0d2c4e13c').split(',')
app.config['SECRET_KEY'] = secret_keys[0]  # Use the first key for the Flask app's SECRET_KEY

# Example of using the second key for some other purpose
app.config['SECOND_SECRET_KEY'] = secret_keys[1] if len(secret_keys) > 1 else None  # Safely access the second key

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False  # Disable redirect interception
app.debug = True

@app.route('/')
def home():
    return "Creation Profile Cards App is Running!"

@app.route('/keys')
def show_keys():
    return jsonify({
        "first_key": app.config['SECRET_KEY'],
        "second_key": app.config['SECOND_SECRET_KEY']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Key Changes and Explanations

1. **Single Definition of `/keys` Route**:
   - Removed the duplicate definition of the `/keys` route. You only need one route to return the keys.

2. **Accessing the Second Key**:
   - The second key is now stored in `app.config['SECOND_SECRET_KEY']`, which is set based on the length of the `secret_keys` list. This makes it clear and consistent.

3. **Using `jsonify`**:
   - The response from the `/keys` route now uses `jsonify` to return a JSON response, which is the standard way to return JSON data in Flask.

4. **Environment Variable Loading**:
   - The `load_dotenv()` function is called at the beginning to ensure that environment variables are loaded before they are accessed.

### Summary

This corrected code snippet sets up a Flask application that uses two secret keys, with the first key being used as the `SECRET_KEY` for the application and the second key stored separately. The `/keys` route returns both keys in a JSON format. This approach keeps your configuration organized and allows for easy access to multiple secret keys.

# What will the .env and yml look like after that?
Based on the corrected Flask application code that uses two secret keys, here’s how your `.env` file and a corresponding `docker-compose.yml` file might look.

### Example of a `.env` File

The `.env` file will contain the two secret keys that your application will use. Here’s an example:

```plaintext
# .env file
SECRET_KEY=my_first_secret_key
SECOND_SECRET_KEY=my_second_secret_key
SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
DEBUG=True
```

### Explanation of the `.env` File

- **SECRET_KEY**: This is the primary secret key used by your Flask application for session management and other security features.
- **SECOND_SECRET_KEY**: This is a secondary key that you might use for other purposes in your application.
- **SQLALCHEMY_DATABASE_URI**: This specifies the database connection string. In this case, it points to a SQLite database file named `profiles.db`.
- **DEBUG**: This is a flag to enable or disable debug mode in your Flask application.

### Example of a `docker-compose.yml` File

If you are using Docker to run your Flask application, you might have a `docker-compose.yml` file that looks like this:

```yaml
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - SECRET_KEY=my_first_secret_key
      - SECOND_SECRET_KEY=my_second_secret_key
      - SQLALCHEMY_DATABASE_URI=sqlite:///profiles.db
      - DEBUG=True
    volumes:
      - .:/app
    depends_on:
      - db

  db:
    image: sqlite:latest  # Note: SQLite is file-based and doesn't require a separate service
    volumes:
      - ./profiles.db:/profiles.db  # Mount the database file

volumes:
  db_data:
```

### Explanation of the `docker-compose.yml` File

- **version**: Specifies the version of the Docker Compose file format.
- **services**: Defines the services that make up your application.
  - **web**: This service runs your Flask application.
    - **build**: Specifies the build context (the current directory).
    - **ports**: Maps port 5000 on the host to port 5000 in the container.
    - **environment**: Sets environment variables for the container, which will be available to your Flask application.
    - **volumes**: Mounts the current directory to `/app` in the container, allowing your code to be accessible.
    - **depends_on**: Specifies that the `web` service depends on the `db` service.
  - **db**: This service is defined for SQLite, but note that SQLite is file-based and does not require a separate service in the same way that other databases (like PostgreSQL or MySQL) do. You can simply mount the database file directly.
  
### Summary

- The `.env` file contains the necessary environment variables for your Flask application, including two secret keys and the database URI.
- The `docker-compose.yml` file defines how to run your Flask application in a Docker container, including setting the same environment variables and mapping ports and volumes.

This setup allows you to manage your application's configuration easily and securely, both in development and production environments.

# Revise yml 
Your `docker-compose.yml` file looks mostly correct, but there are a few points to clarify and improve. Here’s a revised version along with explanations for each section:

### Revised `docker-compose.yml`

```yaml
services:
  backend:
    build:
      context: ./creation-profile-cards
      dockerfile: Dockerfile  # Ensure the filename is capitalized if that's how it's named
    ports:
      - "5000:5000"  # Map the backend port
    volumes:
      - ./creation-profile-cards:/usr/src/app  # Optional: for live reloading
      - db_data:/usr/src/app/profiles.db  # Persist the SQLite database
    depends_on:
      - db 
    environment:
      - FLASK_ENV=development  # Set the Flask environment
      - SQLALCHEMY_DATABASE_URI=sqlite:////usr/src/app/profiles.db  # Use the correct path for SQLite
      - SECRET_KEY=b6970cceef32ab8f53a934157f4d3eff4879b08d05d3a776  # Set the secret key here
      - SECOND_SECRET_KEY=6860f98b167c8300e7f3899c8e432b4d6c6752b0d2c4e13c
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
    image: nouchka/sqlite3:latest  # Use a proper SQLite image or remove this service
    volumes:
      - db_data:/profiles.db  # Persist the SQLite database file

volumes:
  db_data:  # Define a named volume for the SQLite database

secrets:
  secret_key:
    external: true  # This assumes you have a Docker secret set up externally
```

### Key Changes and Explanations

1. **Dockerfile Naming**:
   - Ensure that the `dockerfile` is named `Dockerfile` (with a capital "D") if that’s how it is named in your project. Docker is case-sensitive.

2. **SQLite Database Path**:
   - The `SQLALCHEMY_DATABASE_URI` should point to the correct path where the SQLite database is mounted inside the container. Since you are mounting it to `/usr/src/app/profiles.db`, the URI should be `sqlite:////usr/src/app/profiles.db`.

3. **SQLite Service**:
   - SQLite is a file-based database and does not require a separate service. You can simply mount the database file directly in the `backend` service. If you want to keep the `db` service, you can use a different image or remove it altogether.

4. **Volume Definition**:
   - The `db_data` volume is defined at the bottom of the file. This allows you to persist the SQLite database file across container restarts.

5. **Secrets**:
   - The `secrets` section assumes you have a Docker secret set up externally. If you are not using Docker secrets, you can remove this section and manage your secrets through environment variables instead.

### Summary

This revised `docker-compose.yml` file sets up a backend service for your Flask application, a frontend service for your Vite app, and a volume for persisting the SQLite database. Make sure to adjust the paths and filenames according to your project structure. If you are not using Docker secrets, you can manage sensitive information through environment variables directly in the `environment` section.