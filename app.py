from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/',methods=["get","post"])
def initial_page():
    return render_template('index.html')

@app.route('/register',methods=["get","post"])
def register_page():
    return render_template('register.html')

@app.route('/main',methods=["get","post"])
def main_page():
    return render_template('mainPage.html')

@app.route('/deposit',methods=["get"])
def deposit_page():
    return render_template('deposit.html')

@app.route('/withdraw',methods=["get"])
def withdraw_page():
    return render_template('withdraw.html')

@app.route('/check_user', methods=['GET'])
def check_user():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "Missing address parameter"}), 400
    
    print(address)
    conn = get_db_connection()
    
    cursor = conn.cursor()
    # 获取 users 表中的所有数据
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
    # 打印表头
    print("Table Columns:", [description[0] for description in cursor.description])
    # 遍历并打印所有行
    for row in rows:
        print(row["address"])
        
    print(type(address))
    
    user = conn.execute('SELECT * FROM users WHERE address = ?', (address,)).fetchone()
    # user = conn.execute('SELECT * FROM users WHERE id = ?', (1,)).fetchone()
    conn.close()
    print(user)
    if user:
        return jsonify({"registered": True})
    else:
        return jsonify({"registered": False})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
