# 数据库表结构 用户数据模型
import sqlite3

DATABASE_NAME = 'web3_bank.db'

def get_db_connection():
    """建立数据库连接"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# 添加用户信息
def add_user(wallet_address, passport, singpass_id, address):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO users (wallet_address, passport, singpass_id, address)
            VALUES (?, ?, ?, ?)
        ''', (wallet_address, passport, singpass_id, address))
        conn.commit()
        print("用户添加成功！")
    except sqlite3.IntegrityError:
        print("该钱包地址已注册。")
    finally:
        conn.close()

# 查询用户信息
def get_user_by_wallet(wallet_address):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users WHERE wallet_address = ?', (wallet_address,))
    user = cursor.fetchone()
    
    conn.close()
    return user

# 列出所有用户
def list_all_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    
    conn.close()
    return users
