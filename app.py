from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def serve_index():
    return send_from_directory('.', 'upai.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
