from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Enable cross-origin requests for frontend to call backend
import os

# Initialize Flask app with static folder configuration
app = Flask(__name__, static_folder='.', static_url_path='')

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from frontend
CORS(app)

# Route for serving the main HTML page
@app.route('/')
def home():
    """Serve the index.html file when user visits root URL"""
    return send_from_directory('.', 'index.html')

# Route to serve static files (CSS, JavaScript, images)
@app.route('/<path:path>')
def serve_static(path):
    """Serve any static file (CSS, JS, images) from current directory"""
    return send_from_directory('.', path)

# Sign-in API endpoint
@app.route('/signin', methods=['POST'])
def signin():
    """Handle user sign-in requests from frontend"""
    try:
        # Get JSON data from request body
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        # Validate that both username and password are provided
        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400
        
        # Log the sign-in attempt (for debugging/monitoring)
        print(f"Sign-in request: {username}")
        
        # Return success response to frontend
        return jsonify({'message': 'Sign-in successful!', 'status': 'success'})
    except Exception as e:
        # Handle any unexpected errors
        return jsonify({'error': str(e)}), 500

# Contact form API endpoint
@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submissions from frontend"""
    try:
        # Extract form data from JSON request
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validate all required fields are present
        if not name or not email or not message:
            return jsonify({'error': 'All fields are required'}), 400
        
        # Log the contact message (in real app, would send email here)
        print(f"Contact from {name} ({email}): {message}")
        
        # Return success response to frontend
        return jsonify({'message': 'Message sent successfully!', 'status': 'success'})
    except Exception as e:
        # Handle any unexpected errors during form processing
        return jsonify({'error': str(e)}), 500

# Run the Flask development server when script is executed directly
if __name__ == '__main__':
    app.run(debug=True)  # debug=True enables auto-reload and better error messages
