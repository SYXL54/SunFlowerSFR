# SunFlowerSFR
欢迎来嗑瓜子儿~~~

# 项目框架
web3_bank_system/
├── backend/
│   ├── app.py              # Flask后端，处理API请求
│   ├── database.py         # SQLite数据库管理
│   ├── models.py           # 数据库表结构
│   ├── static/
│   │   └── styles.css      # 全局CSS样式
│   └── templates/
│       ├── index.html      # 起始界面
│       ├── register.html   # 注册界面
│       ├── login.html      # 登录界面
│       ├── dashboard.html  # 主界面（存款、取款）
│       └── transactions.html # 交易历史查询
├── smart_contracts/
│   └── Bank.sol            # Solidity智能合约
├── frontend/
│   └── web3.js             # Web3.js 交互代码
├── migrations/             # 数据库迁移文件
├── README.md               # 项目说明文档
└── requirements.txt        # Python依赖库

