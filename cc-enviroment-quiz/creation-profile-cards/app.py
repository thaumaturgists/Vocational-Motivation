import logging
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        app.logger.info(f"Received data: {data}")
        return jsonify({"message": "Profile created", "data": data}), 201
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500
    
@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad Request"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Ensured compatibility with Docker networking