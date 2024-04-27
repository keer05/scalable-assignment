from flask import Flask, request, jsonify
import jwt
import sqlite3
from functools import wraps
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from any origin

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Function to add user data
def add_user(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', (username, password))
    conn.commit()
    conn.close()

# Add sample user data
def add_sample_users():
    add_user('user1', 'pass1')
    add_user('user2', 'pass2')

# Initialize database and add sample users
init_db()
add_sample_users()

# JWT token required decorator
def token_required(f):
    @wraps(f)  
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, 'your_secret_key', algorithms=['HS256'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)

    return decorated

# Login route
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    token = jwt.encode({'username': username}, '8e561a07023b87d53c1da0eee24b20523f8e262e5109b7614aa93697ef5d39d5', algorithm='HS256')

    return jsonify({'token': token})

# Logout route
@app.route('/auth/logout', methods=['POST'])
@token_required
def logout():
    # In a real-world scenario, you might want to implement token invalidation logic
    return jsonify({'message': 'Logged out successfully'})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
