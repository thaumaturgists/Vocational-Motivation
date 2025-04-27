`Flask-SQLAlchemy` is an extension for Flask that adds support for SQLAlchemy, a powerful ORM (Object Relational Mapper) for Python. It simplifies database interactions in Flask applications. Below, I'll guide you through setting up `Flask-SQLAlchemy`, creating a simple model, and writing tests for it using `pytest`.

### Step 1: Install Flask-SQLAlchemy

First, ensure you have `Flask-SQLAlchemy` installed. You can install it using pip:

```bash
pip install Flask-SQLAlchemy
```

### Step 2: Set Up Your Flask Application

Here’s an example of how to set up a simple Flask application with `Flask-SQLAlchemy`:

```python
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the SQLAlchemy database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Use SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications

# Initialize the SQLAlchemy object
db = SQLAlchemy(app)

# Define a simple model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])

if __name__ == '__main__':
    db.create_all()  # Create the database tables
    app.run(debug=True)
```

### Step 3: Create a Test File

Create a new file for your tests, for example, `test_app.py`. In this file, you will write your test cases.

### Step 4: Write Tests

Here’s an example of how to write tests for your Flask application with `Flask-SQLAlchemy`:

```python
import pytest
from your_flask_app import app, db, User  # Replace with the actual name of your Flask app module

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Use in-memory database for tests
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  # Create the database tables
        yield client
        with app.app_context():
            db.drop_all()  # Clean up the database after tests

def test_get_users(client):
    # Add a user to the database
    new_user = User(username='testuser')
    db.session.add(new_user)
    db.session.commit()

    # Test the /users endpoint
    response = client.get('/users')
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['username'] == 'testuser'
```

### Explanation:

1. **Importing Required Modules**: You import `pytest`, your Flask app, the database instance, and the `User` model.

2. **Creating a Test Client**: The `client` fixture sets up a test client for your Flask app. It uses an in-memory SQLite database for testing, which is fast and does not require file I/O.

3. **Creating and Dropping Tables**: The `db.create_all()` method creates the database tables before each test, and `db.drop_all()` cleans up afterward.

4. **Writing a Test Case**: The `test_get_users` function adds a user to the database and tests the `/users` endpoint to ensure it returns the correct data.

### Step 5: Run Your Tests

To run your tests, navigate to the directory containing your test file and run:

```bash
pytest
```

### Additional Tips:

- **Database Migrations**: For more complex applications, consider using `Flask-Migrate` for handling database migrations.

- **More Models and Tests**: You can create additional models and write more tests to cover different functionalities of your application.

By following these steps, you can effectively set up and test a Flask application using `Flask-SQLAlchemy` and `pytest`.