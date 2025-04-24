FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
# Set the working directory inside the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the Flask app’s port
EXPOSE 5000

# Command to run the Python application
CMD ["python", "app.py"]


# ###working
# FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
# WORKDIR /app
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Upgrade pip and install dependencies securely
# RUN pip install --no-cache-dir --upgrade pip
# COPY requirements.txt ./
# RUN pip install --no-cache-dir --upgrade -r requirements.txt

# # Copy the rest of the application
# COPY . .

# # Expose Flask's default port
# EXPOSE 5000

# # Default command to run the app, Use a Production Server for Flask
# CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
# ###


# # Use a lightweight and secure Python image
# FROM python:alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7

# # Set the working directory inside the container
# WORKDIR /app

# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Copy requirements and install dependencies
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code
# COPY . .

# # Expose the Flask app’s port
# EXPOSE 5000

# # Command to run the Python application
# CMD ["python", "app.py"]