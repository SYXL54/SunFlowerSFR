# SQLite数据库管理
import sqlite3

# 数据库文件路径
DATABASE_NAME = 'web3_bank.db'

def init_db():
    """初始化数据库并创建表"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    # 创建用户信息表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wallet_address TEXT UNIQUE NOT NULL,
        passport TEXT,
        singpass_id TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # 创建交易历史表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wallet_address TEXT NOT NULL,
        transaction_type TEXT,
        amount REAL,
        transaction_hash TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ''')

    conn.commit()
    conn.close()
    print("数据库初始化完成！")

if __name__ == '__main__':
    init_db()
