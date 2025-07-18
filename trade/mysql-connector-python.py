import random
from datetime import datetime, timedelta
import uuid
import mysql.connector

status_list = ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']
method_list = ['DIRECT', 'DELIVERY']
locations = ['서울역', '강남역', '신촌역', '건대입구', '홍대입구']

conn = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="trade_user",
    password="trade_pw",
    database="trade_db"
)
cur = conn.cursor()

for i in range(1, 101):
    id = uuid.uuid4().bytes
    buyer = uuid.uuid4().bytes
    seller = uuid.uuid4().bytes
    post = uuid.uuid4().bytes
    status = random.choice(status_list)
    method = random.choice(method_list)
    location = random.choice(locations)
    cancel_reason = '구매자 변심' if status == 'CANCELED' else None
    completed_at = (datetime.now() - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d %H:%M:%S') if status == 'COMPLETED' else None
    cur.execute(
        "INSERT INTO p_trade (id, buyer_id, seller_id, post_id, status, method, meet_up_location, cancel_reason, completed_at, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,NOW(),NOW())",
        (id, buyer, seller, post, status, method, location, cancel_reason, completed_at)
    )

conn.commit()
cur.close()
conn.close()