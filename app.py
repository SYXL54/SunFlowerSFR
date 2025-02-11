from flask import Flask, request, jsonify, render_template
import sqlite3
import os

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/', methods=["GET", "POST"])
def initial_page():
    return render_template('index.html')

@app.route('/register', methods=["GET", "POST"])
def register_page():
    return render_template('register.html')

@app.route('/main', methods=["GET", "POST"])
def main_page():
    return render_template('mainPage.html')

@app.route('/deposit', methods=["GET"])
def deposit_page():
    return render_template('deposit.html')

@app.route('/withdraw', methods=["GET"])
def withdraw_page():
    return render_template('withdraw.html')

@app.route('/check_user', methods=['GET'])
def check_user():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "Missing address parameter"}), 400

    print(f"接收到的钱包地址: '{address}'")

    conn = get_db_connection()
    cursor = conn.cursor()

    # 使用统一的字段名 wallet_address
    cursor.execute("""
        SELECT * FROM users 
        WHERE LOWER(TRIM(wallet_address)) = LOWER(TRIM(?))
    """, (address,))
    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({"registered": True})
    else:
        return jsonify({"registered": False})

# 测试代码：插入测试钱包地址
def insert_test_address():
    conn = get_db_connection()
    cursor = conn.cursor()

    test_address = '0x3424b0dd4567b4eaccbaf792701ea73aaa56f1e8'
    
    cursor.execute("SELECT * FROM users WHERE LOWER(wallet_address) = LOWER(?)", (test_address,))
    existing_user = cursor.fetchone()

    if existing_user:
        print(f"测试钱包地址已存在：{test_address}")
    else:
        cursor.execute("INSERT INTO users (wallet_address) VALUES (?)", (test_address,))
        conn.commit()
        print(f"测试钱包地址已成功插入：{test_address}")

    conn.close()

# 打印数据库中的所有钱包地址
def print_all_addresses():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT wallet_address FROM users")
    rows = cursor.fetchall()

    print("数据库中的钱包地址：")
    for row in rows:
        print(f"'{row['wallet_address']}'")

    conn.close()

if __name__ == '__main__':
    # 启用测试函数进行调试
    insert_test_address()
    print_all_addresses()

    app.run(host='0.0.0.0', port=5000, debug=True)
