# 测试数据库功能
from models import add_user, get_user_by_wallet, list_all_users

# 添加用户信息
add_user(
    wallet_address='0xAbC123456789abcdef123456789ABCDEF1234567',
    passport='E1234567',
    singpass_id='S1234567A',
    address='123 Blockchain Ave, Singapore'
)

# 查询单个用户信息
user = get_user_by_wallet('0xAbC123456789abcdef123456789ABCDEF1234567')
if user:
    print("用户信息：")
    print(dict(user))
else:
    print("未找到该用户。")

# 列出所有用户
print("\n所有用户信息：")
all_users = list_all_users()
for u in all_users:
    print(dict(u))
