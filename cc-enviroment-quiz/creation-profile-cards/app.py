from flask import Flask, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

# Configure Debug Toolbar correctly
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

@app.route('/')
def home():
    return jsonify({"message": "Profile Cards App is Running!"})

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)