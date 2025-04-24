FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
WORKDIR /app
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# Upgrade pip and install dependencies securely
RUN pip install --no-cache-dir --upgrade pip
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose Flask's default port
EXPOSE 5000

# Default command to run the app, Use a Production Server for Flask
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--log-level", "debug", "app:app"]