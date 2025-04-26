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

# Expose the application port (change if your app uses a different port)
EXPOSE 5000

# Command to run the application (adjust as necessary)
CMD ["python", "app.py"]
