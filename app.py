from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('userInfo.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/',methods=["get","post"])
def login_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
