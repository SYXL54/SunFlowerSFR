from flask import Flask, request, jsonify, render_template
import sqlite3
import os

app = Flask(__name__)

def get_users_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_transactions_db_connection():
    conn = sqlite3.connect('transactions.db')  
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/', methods=["GET", "POST"])
def initial_page():
    return render_template('index.html')

@app.route('/main', methods=["GET", "POST"])
def main_page():
    return render_template('mainPage.html')

@app.route('/deposit', methods=["GET"])
def deposit_page():
    return render_template('deposit.html')

@app.route('/withdraw', methods=["GET"])
def withdraw_page():
    return render_template('withdraw.html')

@app.route('/dashboard', methods=['GET'])
def dashboard_page():
    return render_template('dashboard.html')  # 确保 dashboard.html 文件存在于 templates 文件夹中

# 交易历史查询页面
@app.route('/transactions')
def transactions_page():
    return render_template('transactions.html')

# 注册页面路由
@app.route('/register', methods=['GET', 'POST'])
def register_page():
    if request.method == 'GET':
        return render_template('register.html')
    
    if request.method == 'POST':
        # 支持 JSON 和表单数据
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form

        wallet_address = data.get('wallet_address')
        passport = data.get('passport')
        singpass_id = data.get('singpass_id')
        address = data.get('address')

        print(f"接收到的钱包地址: {wallet_address}")  # 打印钱包地址调试

        if not wallet_address:
            return jsonify({"success": False, "message": "钱包地址不能为空！"}), 400

        conn = get_users_db_connection()
        cursor = conn.cursor()

        # 检查钱包地址是否已注册
        cursor.execute("SELECT * FROM users WHERE LOWER(wallet_address) = LOWER(?)", (wallet_address,))
        existing_user = cursor.fetchone()

        # if existing_user:
        #     conn.close()
        #     return jsonify({"success": False, "message": "该钱包地址已注册，请直接登录。"}), 400
        if existing_user:
            conn.close()
            return jsonify({"success": False, "message": "该钱包地址已注册，请直接登录。", "redirect": "/dashboard"}), 200


        
        # 插入用户信息
        cursor.execute("""
            INSERT INTO users (wallet_address, passport, singpass_id, address)
            VALUES (?, ?, ?, ?)
        """, (wallet_address, passport, singpass_id, address))

        conn.commit()
        conn.close()

        return jsonify({"success": True, "message": "注册成功！"})



@app.route('/check_user', methods=['GET'])
def check_user():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "Missing address parameter"}), 400

    print(f"接收到的钱包地址: '{address}'")

    conn = get_users_db_connection()
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


# 获取交易历史数据
@app.route('/get_transactions', methods=['GET'])
def get_transactions():
    wallet_address = request.args.get('wallet_address')

    if not wallet_address:
        return jsonify({"success": False, "message": "缺少钱包地址参数"}), 400

    conn = get_transactions_db_connection()
    cursor = conn.cursor()
    test = cursor.execute("""
            SELECT * FROM transactions
        """).fetchone()
    print(test)
    transactions = cursor.execute("""
            SELECT * FROM transactions 
            WHERE LOWER(TRIM(wallet_address)) = LOWER(TRIM(?))
        """, (wallet_address,)).fetchall()
    conn.close()
    print(transactions)

    transactions_list = [dict(tx) for tx in transactions]
    print(transactions_list)

    return jsonify({"success": True, "transactions": transactions_list})

# 校验页
@app.route('/check', methods=['GET'])
def check_page():
    return render_template('check.html') 


# 测试代码：插入测试钱包地址
def insert_test_address():
    conn = get_users_db_connection()
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
    conn = get_users_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT wallet_address FROM users")
    rows = cursor.fetchall()

    print("数据库中的钱包地址：")
    for row in rows:
        print(f"'{row['wallet_address']}'")

    conn.close()

@app.route("/register_user", methods=["POST"])
def register_user():
    data = request.json
    print("Received JSON data:", data)  # **打印收到的数据**

    wallet_address = data.get("wallet_address")
    passport = data.get("passport")
    singpass = data.get("singpass")
    address_info = data.get("address")

    if not wallet_address:
        return jsonify({"success": False, "error": "Wallet address is required"}), 400

    try:
        conn = get_users_db_connection()
        cursor = conn.cursor()

        # 检查用户是否已存在
        cursor.execute("SELECT * FROM users WHERE wallet_address = ?", (wallet_address,))
        existing_user = cursor.fetchone()

        if existing_user:
            # **如果用户已存在，更新信息**
            cursor.execute("""
                UPDATE users SET passport = ?, singpass_id = ?, address = ?
                WHERE wallet_address = ?
            """, (passport, singpass, address_info, wallet_address))
        else:
            # **如果用户不存在，插入新记录**
            cursor.execute("""
                INSERT INTO users (wallet_address,passport,singpass_id,address)
                VALUES (?, ?, ?, ?)
            """, (wallet_address, passport, singpass, address_info))

        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "User registered successfully"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/record_transaction", methods=["POST"])
def record_transaction():
    data = request.json
    wallet_address = data.get("wallet_address")
    transaction_type = data.get("transaction_type")
    amount = data.get("amount")

    if not wallet_address or not transaction_type or not amount:
        return jsonify({"success": False, "error": "Missing required fields"}), 400

    try:
        conn = get_transactions_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO transactions (wallet_address, transaction_type, amount)
            VALUES (?, ?, ?)
        """, (wallet_address, transaction_type, amount))
        print("transactions")

        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Transaction recorded successfully"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    # 启用测试函数进行调试
    insert_test_address()
    print_all_addresses()

    app.run(host='0.0.0.0', port=5000, debug=True)
